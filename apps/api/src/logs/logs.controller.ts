import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { QueryLogsDto } from './dto/query-logs.dto';
import { KafkaService } from './kafka/kafka.service';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly logsService: LogsService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async createLog(@Body() createLogDto: CreateLogDto) {
    await this.kafkaService.publishLog(createLogDto);
    return {
      status: 'accepted',
    };
  }

  @Get()
  async getLogs(@Query() query: QueryLogsDto) {
    return this.logsService.queryLogs(query);
  }
}
