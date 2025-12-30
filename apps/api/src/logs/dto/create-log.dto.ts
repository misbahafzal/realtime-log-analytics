import {
  IsISO8601,
  IsIn,
  IsOptional,
  IsString,
  IsObject,
} from 'class-validator';

export class CreateLogDto {
  @IsISO8601()
  timestamp!: string;

  @IsIn(['debug', 'info', 'warn', 'error'])
  level!: 'debug' | 'info' | 'warn' | 'error';

  @IsString()
  service!: string;

  @IsString()
  message!: string;

  @IsOptional()
  @IsString()
  traceId?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
