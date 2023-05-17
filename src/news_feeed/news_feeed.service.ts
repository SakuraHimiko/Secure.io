import { Injectable } from '@nestjs/common';
import { CreateNewsFeeedDto } from './dto/create-news_feeed.dto';
import { UpdateNewsFeeedDto } from './dto/update-news_feeed.dto';

@Injectable()
export class NewsFeeedService {
  create(createNewsFeeedDto: CreateNewsFeeedDto) {
    return 'This action adds a new newsFeeed';
  }

  findAll() {
    return `This action returns all newsFeeed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} newsFeeed`;
  }

  update(id: number, updateNewsFeeedDto: UpdateNewsFeeedDto) {
    return `This action updates a #${id} newsFeeed`;
  }

  remove(id: number) {
    return `This action removes a #${id} newsFeeed`;
  }
}
