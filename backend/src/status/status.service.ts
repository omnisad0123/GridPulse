import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class StatusService {
  constructor(private readonly database: DatabaseService) {}

  async getMeter(meterId: string) {
    const status = await this.database.getMeterStatus(meterId);
    if (!status) throw new NotFoundException('Meter status not found');
    return status;
  }

  async getVehicle(vehicleId: string) {
    const status = await this.database.getVehicleStatus(vehicleId);
    if (!status) throw new NotFoundException('Vehicle status not found');
    return status;
  }

  listMeters(query: any) {
    return this.database.listMeterStatuses(Number(query.page ?? 1), Number(query.limit ?? 25));
  }

  listVehicles(query: any) {
    return this.database.listVehicleStatuses(Number(query.page ?? 1), Number(query.limit ?? 25));
  }
}
