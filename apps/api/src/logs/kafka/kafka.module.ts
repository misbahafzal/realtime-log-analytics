import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaConsumerService } from './kafka-consumer.service';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';

@Module({
  imports: [ElasticsearchModule],
  providers: [KafkaService, KafkaConsumerService],
  exports: [KafkaService],
})
export class KafkaModule {}
