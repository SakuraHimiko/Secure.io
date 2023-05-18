import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
  Res,
} from '@nestjs/common';
import { NewsFeeedService } from './news_feeed.service';
import { CreateNewsFeeedDto } from './dto/create-news_feeed.dto';
import { UpdateNewsFeeedDto } from './dto/update-news_feeed.dto';

@Controller('feed')
export class NewsFeeedController {
  constructor(private readonly newsFeeedService: NewsFeeedService) {}
  @Get()
  getData() {
    return this.newsFeeedService.findAll();
  }
  @Post()
  create(@Body() createNewsFeeedDto: CreateNewsFeeedDto) {
    return this.newsFeeedService.create(createNewsFeeedDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsFeeedService.findOne(+id);
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
