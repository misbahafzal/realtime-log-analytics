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
    const { service, level, from, to, page = 1, limit = 20 } = params;
    const must: any[] = [];

    // Filter by service
    if (service) {
      must.push({ term: { 'service.keyword': service } });
    }

    // Filter by level
    if (level) {
      must.push({ term: { level } });
    }

    // Filter by time range
    if (from || to) {
      const rangeQuery: { gte?: string; lte?: string } = {};
      if (from) rangeQuery.gte = from;
      if (to) rangeQuery.lte = to;

      must.push({
        range: {
          timestamp: rangeQuery,
        },
      });
    }

    // If no filters, match all
    const query = must.length > 0 ? { bool: { must } } : { match_all: {} };

    const result = await this.client.search({
      index: 'logs',
      from: (page - 1) * limit,
      size: limit,
      sort: [{ timestamp: { order: 'desc' } }],
      query,
    });

    const total =
      typeof result.hits.total === 'number'
        ? result.hits.total
        : result.hits.total?.value || 0;

    return {
      logs: result.hits.hits.map((h) => h._source),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    };
  }
}
