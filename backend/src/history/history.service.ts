import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class HistoryService {
  constructor(private readonly database: DatabaseService) {}

  listMeterHistory(meterId: string, query: any) {
    return this.database.listMeterHistory(meterId, Number(query.page ?? 1), Number(query.limit ?? 25));
  }

  listVehicleHistory(vehicleId: string, query: any) {
    return this.database.listVehicleHistory(vehicleId, Number(query.page ?? 1), Number(query.limit ?? 25));
  }

  summarizeMeter(meterId: string) {
    return this.database.summarizeMeterHistory(meterId);
  }

  summarizeVehicle(vehicleId: string) {
    return this.database.summarizeVehicleHistory(vehicleId);
  }
}
