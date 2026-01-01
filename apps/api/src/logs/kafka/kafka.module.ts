import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaConsumerService } from './kafka-consumer.service';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';
import { LogsGateway } from '../logs.gateway';

@Module({
  imports: [ElasticsearchModule],
  providers: [KafkaService, KafkaConsumerService, LogsGateway],
  exports: [KafkaService],
})
export class KafkaModule {}
