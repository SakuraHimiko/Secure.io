import { IsNotEmpty, Matches } from 'class-validator';

export class MovieDTO {
  @IsNotEmpty()
  @Matches(/^(?!.*<\/[a-z]>)(?!.*[%$])/, {
    message:
      'Humm.So You are the one I am waiting.I am The Security assistant of this Beautiful web Go on!Test my website.My Senpai Would not like this.But i will take your record.',
  })
  @Matches(/^(?!.*0[bB])[a-zA-Z0-9 ]+$/, {
    message:
      'FuuuFuuuFuuu.Hashing will not work here.Just like others pentesters',
  })
  name: string;
  @IsNotEmpty()
  imdb: number;

  @IsNotEmpty()
  @Matches(/^(?!.*<\/[a-z]>)(?!.*[%$])/, {
    message:
      'Humm.So You are the one I am waiting.I am The Security assistant of this Beautiful web Go on!Test my website.My Senpai Would not like this.But i will take your record.',
  })
  @Matches(/^(?!.*0[bB])[a-zA-Z0-9 ]+$/, {
    message:
      'FuuuFuuuFuuu.Hashing will not work here.Just like others pentesters',
  })
  date: string;

  @IsNotEmpty()
  sposter: string;

  @IsNotEmpty()
  bposter: string;

  @IsNotEmpty()
  @Matches(/^(?!.*<\/[a-z]>)(?!.*[%$])/, {
    message:
      'Humm.So You are the one I am waiting.I am The Security assistant of this Beautiful web Go on!Test my website.My Senpai Would not like this.But i will take your record.',
  })
  @Matches(/^(?!.*0[bB])[a-zA-Z0-9 ]+$/, {
    message:
      'FuuuFuuuFuuu.Hashing will not work here.Just like others pentesters',
  })
  genre: string;

  @IsNotEmpty()
  @Matches(/^(?!.*<\/[a-z]>)(?!.*[%$])/, {
    message:
      'Humm.So You are the one I am waiting.I am The Security assistant of this Beautiful web Go on!Test my website.My Senpai Would not like this.But i will take your record.',
  })
  @Matches(/^(?!.*0[bB])[a-zA-Z0-9 ]+$/, {
    message:
      'FuuuFuuuFuuu.Hashing will not work here.Just like others pentesters',
  })
  type: string;

  @IsNotEmpty()
  @Matches(/^(?!.*<\/[a-z]>)(?!.*[%$])/, {
    message:
      'Humm.So You are the one I am waiting.I am The Security assistant of this Beautiful web Go on!Test my website.My Senpai Would not like this.But i will take your record.',
  })
  @Matches(/^(?!.*0[bB])[a-zA-Z0-9 ]+$/, {
    message:
      'FuuuFuuuFuuu.Hashing will not work here.Just like others pentesters',
  })
  url: string;

  @IsNotEmpty()
  trailer: string;
}
