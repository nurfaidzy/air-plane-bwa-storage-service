import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { detailData } from './interfaces/location.interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  async getHello(): Promise<detailData[]> {
    return await this.appService.getListData();
  }

  @Get('/:id')
  async getDetail(@Param('id') id: number): Promise<detailData> {
    return await this.appService.getDetailData(parseInt(id.toString()));
  }
}
