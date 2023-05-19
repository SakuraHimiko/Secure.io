import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { CryptoService } from 'src/helpers/aes.helpers';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(
    private AesHelper: CryptoService,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const cookie = request.cookies.zzUvB33_admin;
    const token = cookie.split(' ')[1];
    const decryptedToken = this.AesHelper.decrypt(token);
    const verify = await this.jwtService.verify(decryptedToken);
    const role = verify.role;
    console.log(role);

    if (role !== 'admin') {
      return false;
    }
    return true;
  }
}
