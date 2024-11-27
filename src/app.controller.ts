import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseUtil } from './utils/responses';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  async getHello(): Promise<object> {
    try {
      return ResponseUtil.success(await this.appService.getListData());
    } catch (error) {
      return ResponseUtil.error(error.message);
    }
  }

  @Get('/:id')
  async getDetail(@Param('id') id: number): Promise<object> {
    try {
      return ResponseUtil.success(
        await this.appService.getDetailData(parseInt(id.toString())),
      );
    } catch (error) {
      return ResponseUtil.error(error.message);
    }
  }
}
