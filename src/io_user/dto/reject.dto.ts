import { IsOptional } from 'class-validator';

export class RejectDTO {
  @IsOptional()
  failed_true: string;

  @IsOptional()
  login_message: string;
}
