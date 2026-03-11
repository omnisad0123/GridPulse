import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Controller('v1/alerts')
export class AlertsController {
  constructor(private readonly alerts: AlertsService) {}

  @Post('rules')
  createRule(@Body() body: any) {
    return this.alerts.createRule(body);
  }

  @Get('rules')
  listRules() {
    return this.alerts.listRules();
  }

  @Patch('rules/:ruleId')
  updateRule(@Param('ruleId') ruleId: string, @Body() body: any) {
    return this.alerts.updateRule(ruleId, body);
  }

  @Delete('rules/:ruleId')
  deleteRule(@Param('ruleId') ruleId: string) {
    return this.alerts.deleteRule(ruleId);
  }

  @Get('events')
  listEvents(@Query() query: any) {
    return this.alerts.listEvents(query);
  }

  @Get('events/:eventId')
  getEvent(@Param('eventId') eventId: string) {
    return this.alerts.getEvent(eventId);
  }
}
