import { Test, TestingModule } from '@nestjs/testing';
import { ElasticsearchIndexService } from './elasticsearch-index.service';

describe('ElasticsearchIndexService', () => {
  let service: ElasticsearchIndexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElasticsearchIndexService],
    }).compile();

    service = module.get<ElasticsearchIndexService>(ElasticsearchIndexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
