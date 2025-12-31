import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

interface SearchParams {
  service?: string;
  level?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class ElasticsearchService implements OnModuleInit {
  private client!: Client;

  onModuleInit() {
    this.client = new Client({ node: 'http://localhost:9200' });
  }

  async indexLog(log: unknown) {
    await this.client.index({
      index: 'logs',
      document: log,
    });
  }

  async searchLogs(params: SearchParams) {
    const { service, level, from, to, page = 1, limit = 10 } = params;
    const must: any[] = [];
    if (service) {
      must.push({ term: { service } });
    }
    if (level) must.push({ term: { level } });
    if (from || to) {
      must.push({
        range: {
          timestamp: {
            gte: from,
            lte: to,
          },
        },
      });
    }

    const result = await this.client.search({
      index: 'logs',
      from: (page - 1) * limit,
      size: limit,
      sort: [{ timestamp: 'desc' }],
      query: {
        bool: { must },
      },
    });

    return {
      total: result.hits.total,
      logs: result.hits.hits.map((h) => h._source),
    };
  }
}
