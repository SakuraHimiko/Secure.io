import { Test, TestingModule } from '@nestjs/testing';
import { NewsFeeedController } from './news_feeed.controller';
import { NewsFeeedService } from './news_feeed.service';

describe('NewsFeeedController', () => {
  let controller: NewsFeeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsFeeedController],
      providers: [NewsFeeedService],
    }).compile();

    controller = module.get<NewsFeeedController>(NewsFeeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
