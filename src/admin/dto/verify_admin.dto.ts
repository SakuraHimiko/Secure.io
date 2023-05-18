import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class VerifyAdminDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
