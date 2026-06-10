import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('v1/devices')
export class DevicesController {
  constructor(private readonly devices: DevicesService) {}

  @Post()
  register(@Body() body: any) {
    return this.devices.register(body);
  }

  @Get()
  list(@Query() query: any) {
    return this.devices.list(query);
  }

  @Get('health')
  health(@Query() query: any) {
    return this.devices.health(query);
  }

  @Get(':deviceId')
  get(@Param('deviceId') deviceId: string) {
    return this.devices.get(deviceId);
  }

  @Patch(':deviceId')
  update(@Param('deviceId') deviceId: string, @Body() body: any) {
    return this.devices.update(deviceId, body);
  }
}
