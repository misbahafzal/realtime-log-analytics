import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { KafkaModule } from './kafka/kafka.module';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { LogsService } from './logs.service';

@Module({
  controllers: [LogsController],
  imports: [KafkaModule, ElasticsearchModule],
  providers: [LogsService],
})
export class LogsModule {}
