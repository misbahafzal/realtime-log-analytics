import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  controllers: [LogsController],
  imports: [KafkaModule],
})
export class LogsModule {}
