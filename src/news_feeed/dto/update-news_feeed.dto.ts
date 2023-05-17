import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsFeeedDto } from './create-news_feeed.dto';

export class UpdateNewsFeeedDto extends PartialType(CreateNewsFeeedDto) {}
