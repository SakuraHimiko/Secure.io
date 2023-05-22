import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NewsFeeedService } from './news_feeed.service';
import { NewsFeeedController } from './news_feeed.controller';
import { Movie } from 'src/models/movie.schema';
import { JwtValidator } from 'src/Middlewares/JWT_TOKEN.middleware';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/helpers/aes.helpers';

@Module({
  controllers: [NewsFeeedController],
  providers: [NewsFeeedService, JwtValidator, JwtService, CryptoService],
})
export class NewsFeeedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtValidator).forRoutes(NewsFeeedController);
  }
}
