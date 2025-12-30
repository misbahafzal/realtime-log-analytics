import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [LogsModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
