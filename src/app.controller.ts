import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { detailData } from './interfaces/location.interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  getHello(): detailData[] {
    return this.appService.getListData();
  }
}
