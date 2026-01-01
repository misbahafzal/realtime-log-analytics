import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { KafkaModule } from './kafka/kafka.module';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { LogsService } from './logs.service';
import { ElasticsearchIndexService } from './elasticsearch/elasticsearch-index.service';

@Module({
  controllers: [LogsController],
  imports: [KafkaModule, ElasticsearchModule],
  providers: [LogsService, ElasticsearchIndexService],
})
export class LogsModule {
  constructor(private readonly indexService: ElasticsearchIndexService) {}

  async onModuleInit() {
    await this.indexService.ensureLogsIndex();
  }
}
