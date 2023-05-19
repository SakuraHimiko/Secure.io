import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModel, AdminSchema } from 'src/models/admin.schema';
import { CryptoService } from 'src/helpers/aes.helpers';
import { Argon2Interface } from 'src/helpers/argon.helper';
import { IO_Users, IO_UsersSchema } from 'src/models/user.schema';
import { Movie, MovieSchema } from 'src/models/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: AdminModel.name, schema: AdminSchema }],
      'movie_io_admin',
    ),
    MongooseModule.forFeature(
      [
        {
          name: IO_Users.name,
          schema: IO_UsersSchema,
        },
      ],
      'movie_io',
    ),
    MongooseModule.forFeature(
      [
        {
          name: Movie.name,
          schema: MovieSchema,
        },
      ],
      'movie_io',
    ),
  ],
  controllers: [AdminController],
  providers: [AdminService, CryptoService, Argon2Interface],
})
export class AdminModule {}
