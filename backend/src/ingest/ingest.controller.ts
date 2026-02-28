import { Body, Controller, Post } from '@nestjs/common';
import { IngestService } from './ingest.service';

@Controller('v1/ingest')
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}

  @Post()
  ingest(@Body() body: any) {
    return this.ingestService.ingest(body);
  }

  @Post('batch')
  ingestBatch(@Body() body: any) {
    return this.ingestService.ingestBatch(body);
  }
}
