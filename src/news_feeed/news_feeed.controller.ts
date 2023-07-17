import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Render,
} from '@nestjs/common';
import { NewsFeeedService } from './news_feeed.service';
import { CreateNewsFeeedDto } from './dto/create-news_feeed.dto';
import { UpdateNewsFeeedDto } from './dto/update-news_feeed.dto';

@Controller('feed')
export class NewsFeeedController {
  constructor(private readonly newsFeeedService: NewsFeeedService) {}
  @Get()
  @Render('newsfeed')
  getData() {
    const data = this.newsFeeedService.findAll();
    return {flag: 'yellow'};
  }
  @Post()
  findUsers(@Body() createNewsFeeedDto: CreateNewsFeeedDto) {
    return this.newsFeeedService.findUsers(createNewsFeeedDto);
  }

  @Get('me')
  @Render('profile')
  async getUserProfile(@Request() req:any) {
    const userInfo =  await this.newsFeeedService.getUserProfile(req.user.name);
    return userInfo;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsFeeedDto: UpdateNewsFeeedDto,
  ) {
    return this.newsFeeedService.update(+id, updateNewsFeeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsFeeedService.remove(+id);
  }
}
