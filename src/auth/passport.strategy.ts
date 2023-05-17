import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Argon2Interface } from 'src/helpers/argon.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private ArgonHasher: Argon2Interface) {
    super();
  }
  async validate(passwords: any) {
    const user = await this.ArgonHasher.comparePassword(
      passwords.hashedpassword,
      passwords.plainpassword,
    );
    if (!user) {
      return false;
    }
    return true;
  }
}
