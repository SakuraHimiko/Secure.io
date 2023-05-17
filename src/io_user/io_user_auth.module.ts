import { Module } from '@nestjs/common';
import { IoUserController } from './io_user_auth.controller';
import { IoUserService } from './io_user_auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IO_Users, IO_UsersSchema } from 'src/models/user.schema';
import { Argon2Interface } from 'src/helpers/argon.helper';
import { LocalStrategy } from 'src/auth/passport.strategy';
import { PassportModule } from '@nestjs/passport';
import { CryptoService } from 'src/helpers/aes.helpers';
import { JwtModule } from '@nestjs/jwt';
import { BowlFishSecret } from 'src/secret/unknown.secret';
import { ResponseSender } from 'src/helpers/response.helper';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Rize:367317792Root@cluster0.alqc92x.mongodb.net/movie_io_db?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: IO_Users.name, schema: IO_UsersSchema },
    ]),
    PassportModule.register({
      session: true,
    }),
    JwtModule.register({
      global: true,
      secret: BowlFishSecret.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [IoUserController],
  providers: [
    IoUserService,
    Argon2Interface,
    LocalStrategy,
    CryptoService,
    ResponseSender,
  ],
})
export class IoUserModule {}
