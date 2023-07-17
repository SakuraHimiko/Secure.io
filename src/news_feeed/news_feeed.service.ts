import { Injectable } from '@nestjs/common';
import { CreateNewsFeeedDto } from './dto/create-news_feeed.dto';
import { UpdateNewsFeeedDto } from './dto/update-news_feeed.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from 'src/models/movie.schema';
import { Model } from 'mongoose';
import { IO_Users } from 'src/models/user.schema';
import { CryptoService } from 'src/helpers/aes.helpers';
import { IoUserService } from 'src/io_user/io_user_auth.service';

@Injectable()
export class NewsFeeedService {
  constructor(
    @InjectModel(IO_Users.name, 'movie_io')
    private Io_UserSchema: Model<IO_Users>,
    private readonly AesHelper: CryptoService, 
    private readonly UserService: IoUserService,
  ) {}
  findUsers(createNewsFeeedDto: CreateNewsFeeedDto) {
    return 'This action adds a new newsFeeed';
  }

  async findAll():Promise<IO_Users[]> {
    const data = await this.Io_UserSchema.find();
    return data;
  }

  async getUserProfile(uname: string) {
    const returnedUser = await this.UserService.findUserProfile(uname);
    return returnedUser;
  }

  update(id: number, updateNewsFeeedDto: UpdateNewsFeeedDto) {
    return `This action updates a #${id} newsFeeed`;
  }

  remove(id: number) {
    return `This action removes a #${id} newsFeeed`;
  }
}
