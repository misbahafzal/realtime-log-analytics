import { IsISO8601, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateLogDto {
  @IsISO8601()
  timestamp: string;

  @IsIn(['info', 'warn', 'error'])
  level: 'info' | 'warn' | 'error';

  @IsString()
  @IsNotEmpty()
  service: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  traceId: string;
}
