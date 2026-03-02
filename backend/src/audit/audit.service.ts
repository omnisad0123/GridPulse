import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuditService {
  constructor(private readonly database: DatabaseService) {}

  async record(action: string, targetType: string, targetId: string, metadata: Record<string, unknown> = {}) {
    return this.database.createAuditLog({ action, targetType, targetId, metadata });
  }

  async list() {
    return this.database.listAuditLogs();
  }
}
