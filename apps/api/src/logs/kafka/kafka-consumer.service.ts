import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { CreateLogDto } from '../dto/create-log.dto';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { LogsGateway } from '../logs.gateway';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly logsGateway: LogsGateway,
  ) {}
  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'log-consumer',
      brokers: ['localhost:9092'],
    });
    const consumer = kafka.consumer({ groupId: 'log-consumers' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'logs', fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ message }) => {
        const value = message.value?.toString();
        if (!value) return Promise.resolve();
        const log = JSON.parse(value) as CreateLogDto;
        await this.elasticsearchService.indexLog(log);
        this.logsGateway.emitLog(log);
      },
    });
  }
}
