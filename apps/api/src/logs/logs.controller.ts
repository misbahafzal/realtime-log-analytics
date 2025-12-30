import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';

@Controller('logs')
export class LogsController {
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  createLog(@Body() createLogDto: CreateLogDto) {
    return {
      status: 'accepted',
    };
  }
}
