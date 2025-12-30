import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { CreateLogDto } from '../dto/create-log.dto';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
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
        if (value) {
          const log = JSON.parse(value) as CreateLogDto;
          console.log(`Consumed log:`, log);
        }
        return Promise.resolve();
      },
    });
  }
}
