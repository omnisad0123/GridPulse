import { Body, Controller, Get, Post } from '@nestjs/common';
import { TariffsService } from './tariffs.service';

@Controller('v1/tariffs')
export class TariffsController {
  constructor(private readonly tariffs: TariffsService) {}

  @Post('windows')
  createWindow(@Body() body: any) {
    return this.tariffs.createWindow(body);
  }

  @Get('windows')
  listWindows() {
    return this.tariffs.listWindows();
  }

  @Post('estimate')
  estimate(@Body() body: any) {
    return this.tariffs.estimate(body);
  }
}
