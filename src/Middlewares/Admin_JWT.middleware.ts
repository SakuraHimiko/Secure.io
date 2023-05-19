import {
  HttpException,
  ImATeapotException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CryptoService } from 'src/helpers/aes.helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminJwtValidator implements NestMiddleware {
  constructor(
    private AesHelper: CryptoService,
    private jwtService: JwtService,
  ) {}
  use(req: any, res: Response, next: NextFunction) {
    if (!req.cookies.zzUvB33_admin) {
      throw new HttpException('Dear Admin Please Login.', 401);
    }

    const cookie = req.cookies.zzUvB33_admin;
    const token = cookie.split(' ')[1];
    const decryptedToken = this.AesHelper.decrypt(token);
    const verify = this.jwtService.verify(decryptedToken);
    if (!verify || !(verify.iat < Date.now())) {
      throw new HttpException('Dear Admin Please Login.', 401);
    }
    next();
  }
}
