import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateRestaurantDto } from './create-restaurant.dto';
class location {
  @ApiProperty()
  lat: number;
  @ApiProperty()
  long: number;
}
export class UpdateRestaurantDto {
  @ApiProperty()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsOptional()
  email: string;
  @ApiProperty()
  @IsOptional()
  city: string;
  @ApiProperty({ type: 'file' })
  @IsOptional()
  image: string;
  @IsOptional()
  @ApiProperty({ type: location })
  public location: {
    lat: number;
    long: number;
  };
}
