import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'log-ingestion-api',
      brokers: ['localhost:9092'],
    });
    this.producer = kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async publishLog(message: unknown) {
    await this.producer.send({
      topic: 'logs',
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
