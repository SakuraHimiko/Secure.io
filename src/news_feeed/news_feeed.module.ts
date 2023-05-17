import { Module } from '@nestjs/common';
import { NewsFeeedService } from './news_feeed.service';
import { NewsFeeedController } from './news_feeed.controller';

@Module({
  controllers: [NewsFeeedController],
  providers: [NewsFeeedService]
})
export class NewsFeeedModule {}
