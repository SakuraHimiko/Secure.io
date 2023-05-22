import { Injectable } from '@nestjs/common';
import { CreateNewsFeeedDto } from './dto/create-news_feeed.dto';
import { UpdateNewsFeeedDto } from './dto/update-news_feeed.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from 'src/models/movie.schema';
import { Model } from 'mongoose';

@Injectable()
export class NewsFeeedService {
  constructor() // @InjectModel(Movie.name, 'movie_io') private movieModel: Model<Movie>,
  {}
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
