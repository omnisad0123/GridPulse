import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('v1/health')
export class HealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  async health() {
    const database = await this.database.healthCheck();
    const memory = process.memoryUsage();
    return {
      status: database.ok ? 'ok' : 'degraded',
      service: 'gridpulse',
      components: {
        database,
        memory: {
          ok: memory.heapUsed < 512 * 1024 * 1024,
          heapUsedMb: Math.round(memory.heapUsed / 1024 / 1024),
          rssMb: Math.round(memory.rss / 1024 / 1024),
        },
      },
    };
  }
}
