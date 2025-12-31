import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch/elasticsearch.service';

@Injectable()
export class LogsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async queryLogs(query: {
    service?: string;
    level?: string;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    return this.elasticsearchService.searchLogs({
      service: query.service,
      level: query.level,
      from: query.from,
      to: query.to,
      page,
      limit,
    });
  }
}
