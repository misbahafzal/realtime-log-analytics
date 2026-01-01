import { Module } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { ElasticsearchIndexService } from './elasticsearch-index.service';
import { Client } from '@elastic/elasticsearch';

@Module({
  providers: [
    {
      provide: Client,
      useFactory: () => {
        return new Client({
          node: 'http://localhost:9200',
        });
      },
    },
    ElasticsearchIndexService,
    ElasticsearchService,
  ],
  exports: [Client, ElasticsearchService],
})
export class ElasticsearchModule {}
