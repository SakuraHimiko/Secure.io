import { Global, Module } from '@nestjs/common';
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
    MongooseModule.forFeatureAsync(
      [
        {
          name: IO_Users.name,
          useFactory: () => {
            const schema = IO_UsersSchema;
            schema.pre(/^find/, function () {
            
            });
            return schema;
          },
        },
      ],
      'movie_io',
    ),
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
