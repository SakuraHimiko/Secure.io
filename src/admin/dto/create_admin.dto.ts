import { IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { AdminEntity } from '../entities/admin.entity';

export class CreateAdminDto {
  @IsNotEmpty()
  @Matches(/^(?!.*<\/[a-z]>)(?!.*[%$])/, {
    message:
      'Humm.So You are the one I am waiting.I am The Security assistant of this Beautiful web Go on!Test my website.My Senpai Would not like this.But i will take your record.',
  })
  @Matches(/^(?!.*0[bB][xX])[a-zA-Z0-9 ]+$/, {
    message:
      'FuuuFuuuFuuu.Hashing will not work here.Just like others pentesters',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Matches(/^(?!.*<\/[a-z]>)(?!.*[%$])/, {
    message:
      'Humm.So You are the one I am waiting.I am The Security assistant of this Beautiful web Go on!Test my website.My Senpai Would not like this.But i will take your record.',
  })
  @Matches(/^(?!.*0[bB][xX])[a-zA-Z0-9 ]+$/, {
    message:
      'FuuuFuuuFuuu.Hashing will not work here.Just like others pentesters',
  })
  @IsEnum(AdminEntity)
  role: AdminEntity;
}
