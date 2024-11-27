import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { detailData } from './interfaces/location.interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  async getHello(): Promise<detailData[]> {
    return await this.appService.getListData();
  }
}
