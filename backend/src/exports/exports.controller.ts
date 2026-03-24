import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { ExportsService } from './exports.service';

@Controller('v1/exports')
export class ExportsController {
  constructor(private readonly exportsService: ExportsService) {}

  @Post()
  create(@Body() body: any) {
    return this.exportsService.create(body);
  }

  @Get()
  list() {
    return this.exportsService.list();
  }

  @Get(':jobId')
  get(@Param('jobId') jobId: string) {
    return this.exportsService.get(jobId);
  }

  @Get(':jobId/download')
  @Header('content-type', 'text/csv')
  download(@Param('jobId') jobId: string) {
    return this.exportsService.download(jobId);
  }
}
