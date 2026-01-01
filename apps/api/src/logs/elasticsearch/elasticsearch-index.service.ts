import { Client } from '@elastic/elasticsearch';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ElasticsearchIndexService {
  private readonly loggger = new Logger(ElasticsearchIndexService.name);

  constructor(private readonly esClient: Client) {}

  async ensureLogsIndex(): Promise<void> {
    const indexName = 'logs';
    const exists = await this.esClient.indices.exists({
      index: indexName,
    });
    if (exists) {
      this.loggger.log(`Index ${indexName} already exists`);
      return;
    }
    this.loggger.log(`Creating index ${indexName}`);
    await this.esClient.indices.create({
      index: indexName,
      mappings: {
        properties: {
          timestamp: { type: 'date' },
          service: { type: 'keyword' },
          level: { type: 'keyword' },
          message: { type: 'text' },
          traceId: { type: 'keyword' },
        },
      },
    });
    this.loggger.log(`Index ${indexName} created`);
  }
}
