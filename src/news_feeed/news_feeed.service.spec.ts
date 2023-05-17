import { Test, TestingModule } from '@nestjs/testing';
import { NewsFeeedService } from './news_feeed.service';

describe('NewsFeeedService', () => {
  let service: NewsFeeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsFeeedService],
    }).compile();

    service = module.get<NewsFeeedService>(NewsFeeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
