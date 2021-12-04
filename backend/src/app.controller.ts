import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRandomTip(): { tip: string } {
    return { tip: this.appService.getRandomTip() };
  }
}
