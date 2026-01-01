import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch/elasticsearch.service';
import { QueryLogsDto } from './dto/query-logs.dto';

@Injectable()
export class LogsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async queryLogs(query: QueryLogsDto) {
    const page = query.page || 1;
    const limit = query.limit || 20;

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
