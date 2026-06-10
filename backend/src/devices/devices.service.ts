import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EntityNotFoundException, InvalidPayloadException } from '../common/exceptions/gridpulse.exception';
import { parseTimestamp } from '../common/utils/date-window.util';
import { paginate } from '../common/utils/pagination.util';
import { DeviceHealthRecord, DeviceKind, DeviceRecord, DeviceState, RegisterDeviceDto, UpdateDeviceDto } from './dto/device.dto';

const DEVICE_KINDS: DeviceKind[] = ['meter', 'vehicle'];
const DEVICE_STATES: DeviceState[] = ['active', 'maintenance', 'retired'];

@Injectable()
export class DevicesService {
  private readonly devices = new Map<string, DeviceRecord>();

  constructor(private readonly database: DatabaseService) {}

  register(body: RegisterDeviceDto): DeviceRecord {
    const kind = body?.kind as DeviceKind;
    const commissionedAt = parseTimestamp(body?.commissionedAt);
    if (!body?.deviceId || !DEVICE_KINDS.includes(kind) || !body.siteId || !body.displayName || !commissionedAt) {
      throw new InvalidPayloadException('Device registration requires deviceId, kind, siteId, displayName, and commissionedAt');
    }
    if (this.devices.has(body.deviceId)) {
      throw new InvalidPayloadException('Device already exists', { deviceId: body.deviceId });
    }
    const now = new Date();
    const record: DeviceRecord = {
      deviceId: String(body.deviceId),
      kind,
      siteId: String(body.siteId),
      displayName: String(body.displayName),
      model: String(body.model ?? 'unknown'),
      firmwareVersion: String(body.firmwareVersion ?? 'unknown'),
      commissionedAt,
      state: 'active',
      metadata: body.metadata ?? {},
      createdAt: now,
      updatedAt: now,
    };
    this.devices.set(record.deviceId, record);
    return record;
  }

  list(query: any = {}) {
    const kind = query.kind as DeviceKind | undefined;
    const siteId = query.siteId ? String(query.siteId) : undefined;
    const state = query.state as DeviceState | undefined;
    const rows = [...this.devices.values()]
      .filter((device) => !kind || device.kind === kind)
      .filter((device) => !siteId || device.siteId === siteId)
      .filter((device) => !state || device.state === state)
      .sort((a, b) => a.deviceId.localeCompare(b.deviceId));
    return paginate(rows, { page: Number(query.page ?? 1), limit: Number(query.limit ?? 25) });
  }

  get(deviceId: string): DeviceRecord {
    const record = this.devices.get(deviceId);
    if (!record) throw new EntityNotFoundException('Device', deviceId);
    return record;
  }

  update(deviceId: string, body: UpdateDeviceDto): DeviceRecord {
    const record = this.get(deviceId);
    if (body.state && !DEVICE_STATES.includes(body.state)) {
      throw new InvalidPayloadException('Unsupported device state', { state: body.state });
    }
    const updated: DeviceRecord = {
      ...record,
      siteId: body.siteId === undefined ? record.siteId : String(body.siteId),
      displayName: body.displayName === undefined ? record.displayName : String(body.displayName),
      model: body.model === undefined ? record.model : String(body.model),
      firmwareVersion: body.firmwareVersion === undefined ? record.firmwareVersion : String(body.firmwareVersion),
      state: body.state ?? record.state,
      metadata: body.metadata ?? record.metadata,
      updatedAt: new Date(),
    };
    this.devices.set(deviceId, updated);
    return updated;
  }

  async health(query: any = {}) {
    const rows = this.list({ ...query, limit: 500 }).data as DeviceRecord[];
    const healthRows = await Promise.all(rows.map((device) => this.healthFor(device)));
    return paginate(healthRows, { page: Number(query.page ?? 1), limit: Number(query.limit ?? 25) });
  }

  private async healthFor(device: DeviceRecord): Promise<DeviceHealthRecord> {
    if (device.state === 'retired') {
      return {
        deviceId: device.deviceId,
        kind: device.kind,
        state: device.state,
        lastTelemetryAt: null,
        minutesSinceTelemetry: null,
        health: 'retired',
        notes: ['Retired devices are excluded from freshness alarms.'],
      };
    }

    const status = device.kind === 'meter'
      ? await this.database.getMeterStatus(device.deviceId)
      : await this.database.getVehicleStatus(device.deviceId);
    const lastTelemetryAt = status?.lastUpdated ? new Date(status.lastUpdated) : null;
    if (!lastTelemetryAt) {
      return {
        deviceId: device.deviceId,
        kind: device.kind,
        state: device.state,
        lastTelemetryAt,
        minutesSinceTelemetry: null,
        health: 'offline',
        notes: ['No telemetry has been received for this registered device.'],
      };
    }
    const minutes = Math.max(Math.round((Date.now() - lastTelemetryAt.getTime()) / 60_000), 0);
    const health = minutes <= 30 ? 'online' : minutes <= 120 ? 'delayed' : 'offline';
    const notes = health === 'online'
      ? ['Telemetry is fresh.']
      : health === 'delayed'
        ? ['Telemetry is delayed; verify network and publisher cadence.']
        : ['Telemetry is stale; inspect device connectivity and ingestion queues.'];
    return {
      deviceId: device.deviceId,
      kind: device.kind,
      state: device.state,
      lastTelemetryAt,
      minutesSinceTelemetry: minutes,
      health,
      notes,
    };
  }
}
