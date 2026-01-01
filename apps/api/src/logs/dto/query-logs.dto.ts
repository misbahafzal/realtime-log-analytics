import {
  IsISO8601,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class QueryLogsDto {
  @IsOptional()
  @IsString()
  service?: string;

  @IsOptional()
  @IsIn(['info', 'warn', 'error'])
  level?: 'info' | 'warn' | 'error';

  @IsOptional()
  @IsISO8601()
  from?: string;

  @IsOptional()
  @IsISO8601()
  to?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
