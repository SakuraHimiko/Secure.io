import { ImATeapotException, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CryptoService } from 'src/helpers/aes.helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtValidator implements NestMiddleware {
  constructor(
    private AesHelper: CryptoService,
    private jwtService: JwtService,
  ) {}
  use(req: any, res: Response, next: NextFunction) {
    if (!req.cookies.token) {
      throw new ImATeapotException();
    }
    const cookie = req.cookies.token;
    const token = cookie.split(' ')[1];
    const decryptedToken = this.AesHelper.decrypt(token);
    const verify = this.jwtService.verify(decryptedToken);
    verify.iat < Date.now() ? next() : new ImATeapotException();
    verify ? next() : new ImATeapotException();
  }
}
