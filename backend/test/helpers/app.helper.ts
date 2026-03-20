import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { DatabaseService } from '../../src/database/database.service';
import { HttpExceptionFilter } from '../../src/common/filters/http-exception.filter';
import { ResponseInterceptor } from '../../src/common/interceptors/response.interceptor';
import { GridPulseValidationPipe } from '../../src/common/pipes/validation.pipe';
import { RateLimitService } from '../../src/ingest/rate-limit.service';

export async function createTestApp(): Promise<{ app: INestApplication; database: DatabaseService }> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = moduleFixture.createNestApplication();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new GridPulseValidationPipe());
  await app.init();
  const database = app.get(DatabaseService);
  database.reset();
  app.get(RateLimitService).reset();
  return { app, database };
}
