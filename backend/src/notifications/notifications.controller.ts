import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('v1/notifications')
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}

  @Post('routes')
  createRoute(@Body() body: any) {
    return this.notifications.createRoute(body);
  }

  @Get('routes')
  listRoutes() {
    return this.notifications.listRoutes();
  }

  @Post('preview')
  preview(@Body() body: any) {
    return this.notifications.preview(body);
  }
}
