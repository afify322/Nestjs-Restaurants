import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Schema } from 'mongoose';

export class SearchReastaurant {
  @ApiProperty({ required: false })
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  limit: number;
  @ApiProperty({ required: false })
  @IsOptional()
  page: number;
}
