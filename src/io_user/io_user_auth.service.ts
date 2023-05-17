import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from 'src/auth/passport.strategy';
import { Argon2Interface } from 'src/helpers/argon.helper';
import { IO_Users } from 'src/models/user.schema';
import { CryptoService } from 'src/helpers/aes.helpers';
import { ResponseSender } from 'src/helpers/response.helper';

@Injectable()
export class IoUserService {
  constructor(
    @InjectModel(IO_Users.name) private Io_UserSchema: Model<IO_Users>,
    private AesHasher: CryptoService,
    private ArgonHasher: Argon2Interface,
    private PassportAuthenticator: LocalStrategy,
    private jwtService: JwtService,
    private responseSender: ResponseSender,
  ) {}
  async saveUserToDatabase(userinfo: object | any) {
    if (!userinfo) {
      return {
        failed_true: true,
        message: 'Login failed senpai.Your account is not exist in Database',
      };
    }
    Object.values(userinfo).forEach((el) => {
      if (!el)
        return {
          failed_true: true,
          message: "Please don't use empty values",
        };
    });
    console.log(userinfo.user_name);

    const user_f_name = userinfo.user_f_name;
    const user_l_name = userinfo.user_l_name;
    const user_name = userinfo.user_name;
    const user_password = await this.ArgonHasher.hashPassword(
      userinfo.user_password,
    );
    await this.Io_UserSchema.create({
      user_f_name,
      user_l_name,
      user_name,
      user_password,
    });
    const token = await this.jwtService.signAsync({
      name: this.AesHasher.encrypt(user_name),
    });
    const encryptedToken = this.AesHasher.encrypt(token);
    return {
      login_true: true,
      token: 'Bearer ' + encryptedToken,
      message: `Goodjob ${user_f_name} Senpai,Thank you for join with us!UwU`,
    };
  }

  async verifyLoginUser(userinfo) {
    const user = await this.Io_UserSchema.findOne({
      user_name: userinfo.userName,
    });
    if (!user)
      return {
        failed_true: true,
        message: 'Login failed senpai.Your account is not exist in Database',
      };
    const isValidate = await this.ArgonHasher.comparePassword(
      user.user_password,
      userinfo.userPassword,
    );

    if (!isValidate) {
      return {
        failed_true: true,
        login_message:
          'Login failed senpai.Try to remember the password or reset it',
      };
    }

    const token = await this.jwtService.signAsync({
      name: this.AesHasher.encrypt(user.user_name),
    });
    const encryptedToken = this.AesHasher.encrypt(token);
    return {
      token: 'Bearer ' + encryptedToken,
      login_true: true,
      login_message:
        'Wow Senpai.You did it!Authenication is success!I will redirect you to the main page.Sayonara!',
    };
  }
}
