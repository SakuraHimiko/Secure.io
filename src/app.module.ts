import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './models/movie.schema';
import { IoUserModule } from './io_user/io_user_auth.module';
import { JwtValidator } from './Middlewares/JWT_TOKEN.middleware';
import { CryptoService } from './helpers/aes.helpers';
import { NewsFeeedModule } from './news_feeed/news_feeed.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http_exception.handler';
import { MongoExceptionFilter } from './exceptions/mongo_exception.handler';
import { GlobalExceptionFilter } from './exceptions/typeerror_exception.handler';
import { NotFoundExceptionHandler } from './exceptions/notfound_exception.handler';
import { BadRequestExceptionHandler } from './exceptions/badrequest.exception';
import { JwtModule } from '@nestjs/jwt';
import { BowlFishSecret } from './secret/unknown.secret';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [
    IoUserModule,
    MongooseModule.forRoot(
      `mongodb+srv://Rize:367317792root404@cluster0.alqc92x.mongodb.net/movie_io_db?retryWrites=true&w=majority`,
      { connectionName: 'movie_io' },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://Rize:367317792root404@cluster0.alqc92x.mongodb.net/movie_io_admin?retryWrites=true&w=majority',
      {
        connectionName: 'movie_io_admin',
      },
    ),
    MongooseModule.forFeature(
      [{ name: Movie.name, schema: MovieSchema }],
      'movie_io',
    ),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    JwtModule.register({
      secret: BowlFishSecret.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    // MailerModule.forRoot({
    //   transport: `stmps://${BowlFishSecret.MAIL_USERNAME}`,
    // }),
    NewsFeeedModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },

    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionHandler,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionHandler,
    },
    AppService,
    CryptoService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtValidator)
      .exclude({
        path: 'admin',
        method: RequestMethod.POST,
      })
      .forRoutes(AdminController);
  }
}
