import { Controller, Get, Param, Post, Render, Res, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map } from 'rxjs';
import { EventEmitter } from 'stream';

interface MessageEvent {
  data: string | object;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  showChad() {
    return { success: false };
  }

  @Post()
  getHello(): any {
    return this.appService.showData();
  }
  @Get('/stream/')
  getMusic() {
    return this.appService.getMusic();
  }
  @Get('stream/:id')
  streamAudio(@Param('id') id: any, @Res() res: Response): any {
    return this.appService.streamAudio(id, res);
  }
  @Get('/movie/:id')
  getMovieInfo(@Param('id') id: string) {
    return this.appService.getInfoId(id);
  }
  @Get('errors')
  @Render('error')
  showErrors() {
    return { err_message: 'Lol you got rickrolled' };
  }
  @Sse('/sse')
  sse(eventEmitter: EventEmitter): void {
    eventEmitter.on('login_failed', () => {
      return 'hello';
    });
  }
}
