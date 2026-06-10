export type DeviceKind = 'meter' | 'vehicle';
export type DeviceState = 'active' | 'maintenance' | 'retired';

export interface RegisterDeviceDto {
  deviceId: string;
  kind: DeviceKind;
  siteId: string;
  displayName: string;
  model: string;
  firmwareVersion: string;
  commissionedAt: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateDeviceDto {
  siteId?: string;
  displayName?: string;
  model?: string;
  firmwareVersion?: string;
  state?: DeviceState;
  metadata?: Record<string, unknown>;
}

export interface DeviceRecord {
  deviceId: string;
  kind: DeviceKind;
  siteId: string;
  displayName: string;
  model: string;
  firmwareVersion: string;
  commissionedAt: Date;
  state: DeviceState;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeviceHealthRecord {
  deviceId: string;
  kind: DeviceKind;
  state: DeviceState;
  lastTelemetryAt: Date | null;
  minutesSinceTelemetry: number | null;
  health: 'online' | 'delayed' | 'offline' | 'retired';
  notes: string[];
}
