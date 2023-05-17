import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, Matches } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @Matches(/^(?!.*<\/[a-z]>)(?!.*[%$])/, {
    message:
      'Humm.So You are the one I am waiting.I am The Security assistant of this Beautiful web Go on!Test my website.My Senpai Would not like this.But i will take your record.',
  })
  @Matches(/^(?!.*0[bB][xX])[a-zA-Z0-9 ]+$/, {
    message:
      'FuuuFuuuFuuu.Hashing will not work here.Just like others pentesters',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  userName: string;

  @IsNotEmpty()
  @Matches(/^(?!.*<\/[a-z]>)(?!.*[%$])/, {
    message:
      'Humm.So You are the one I am waiting.I am The Security assistant of this Beautiful web Go on!Test my website.My Senpai Would not like this.But i will take your record.',
  })
  @Matches(/^(?!.*0[bB][xX])[a-zA-Z0-9 ]+$/, {
    message:
      'FuuuFuuuFuuu.Hashing will not work here.Just like others pentesters',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  userPassword: string;
}
