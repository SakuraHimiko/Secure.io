import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NewsFeeedService } from './news_feeed.service';
import { NewsFeeedController } from './news_feeed.controller';
import { JwtValidator } from 'src/Middlewares/JWT_TOKEN.middleware';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/helpers/aes.helpers';
import { MongooseModule } from '@nestjs/mongoose';
import {  IO_Users, IO_UsersSchema } from 'src/models/user.schema';
import { IoUserService } from 'src/io_user/io_user_auth.service';
import { IoUserModule } from 'src/io_user/io_user_auth.module';
import { Argon2Interface } from 'src/helpers/argon.helper';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: IO_Users.name , schema: IO_UsersSchema}],'movie_io'), IoUserModule],
  controllers: [NewsFeeedController],
  providers: [NewsFeeedService, JwtValidator, JwtService, CryptoService, IoUserService, Argon2Interface],
})
export class NewsFeeedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtValidator).forRoutes(NewsFeeedController);
  }
}
