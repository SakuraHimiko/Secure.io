import { IsNotEmpty, IsOptional } from 'class-validator';

export class FulfilledDTO {
  @IsNotEmpty()
  token: string;

  @IsOptional()
  login_true: boolean;

  @IsOptional()
  login_message: string;
}
