import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2Interface {
  async hashPassword(password: string): Promise<string> {
    const hashedpassword = await argon2.hash(password);
    return hashedpassword;
  }
  async comparePassword(hashedpassword: string, password: string) {
    const decryptedPassword = await argon2.verify(hashedpassword, password);
    return decryptedPassword;
  }
}
