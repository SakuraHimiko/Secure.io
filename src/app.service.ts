import {
  ImATeapotException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { google } from 'googleapis';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as ytdl from 'ytdl-core';
import { Movie } from './models/movie.schema';
@Injectable()
export class AppService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}
  getHello(): string {
    return 'Hello World!';
  }
  async getMusic() {
    const youtube = google.youtube({
      version: 'v3',
      auth: 'AIzaSyCHcTbM0mvsqKpDd01Jhbi08z8Cgf5fQhA',
    });

    const searchResult = await youtube.search.list({
      part: ['id', 'snippet'],
      q: 'Nandemonaiya - Kamishiraishi Mone (Maxone Remix) ♪',
      maxResults: 15,
    });

    return searchResult.data;
  }
  showData() {
    const data = this.movieModel.find();
    return data;
  }
  streamAudio(id: string, res: any) {
    if (!ytdl.validateID(id)) {
      throw new ImATeapotException();
    }
    // res.set('Transfer-Encoding', 'chunked');
    // res.set('Content-Type', 'video/mp4');
    const stream = ytdl(`http://www.youtube.com/watch?v=${id}`, {
      quality: 'highestaudio',
    });
    res.writeHead(200, {
      'Content-Type': 'audio/mp3',
      'Transfer-Encoding': 'chunked',
    });
    stream.pipe(res);
    stream.on('end', () => {
      res.end();
    });
  }
  async getInfoId(id) {
    return await this.movieModel.findById(id);
  }
}
