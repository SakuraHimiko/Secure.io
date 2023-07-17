import {
  BadRequestException,
  ImATeapotException,
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CryptoService } from 'src/helpers/aes.helpers';
import { JwtService } from '@nestjs/jwt';
import { BowlFishSecret } from 'src/secret/unknown.secret';

@Injectable()
export class JwtValidator implements NestMiddleware {
  constructor(
    private AesHelper: CryptoService,
    private jwtService: JwtService,
  ) {}
  async use(req: any, res: Response, next: NextFunction) {
    if (!req.cookies.token) {
      console.log('hello');
      throw new BadRequestException({
        message: 'You need to signup or signin to read feed route',
      });
    }

    const cookie = req.cookies.token;
    const token = cookie.split(' ')[1];
    const decryptedToken = this.AesHelper.decrypt(token);
    const verify = await this.jwtService.verify(decryptedToken,{ secret: BowlFishSecret.JWT_SECRET});

    if (!verify || verify.iat > Date.now()) {
      throw new BadRequestException({
        message: 'Session Expired Please Login',
      });
    }
    const name = this.AesHelper.decrypt(verify?.name);
    req.user = {
      name
    };
    next();
  }
}
