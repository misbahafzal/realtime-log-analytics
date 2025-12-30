import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { KafkaService } from './kafka/kafka.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly kafkaService: KafkaService) {}
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async createLog(@Body() createLogDto: CreateLogDto) {
    await this.kafkaService.publishLog(createLogDto);
    return {
      status: 'accepted',
    };
  }
}
