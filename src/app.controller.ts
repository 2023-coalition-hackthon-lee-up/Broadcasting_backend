import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/playlist')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  getPlayList(@Param('id') id: string) {
    return this.appService.getPlayList(id);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
