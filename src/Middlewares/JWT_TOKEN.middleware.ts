import {
  ImATeapotException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CryptoService } from 'src/helpers/aes.helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtValidator implements NestMiddleware {
  constructor(
    private AesHelper: CryptoService,
    private jwtService: JwtService,
  ) {}
  async use(req: any, res: Response, next: NextFunction) {
    if (!req.cookies.token) {
      throw new ImATeapotException();
    }

    const cookie = req.cookies.token;
    console.log(cookie);
    const token = cookie.split(' ')[1];
    const decryptedToken = this.AesHelper.decrypt(token);
    const verify = await this.jwtService.verify(decryptedToken);


    if (!verify || verify.iat < Date.now()) {
      throw new ImATeapotException();
    }
    next();
  }
}
