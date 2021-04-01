import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsNotEmpty } from 'class-validator';
class location {
  @ApiProperty()
  lat: number;
  @ApiProperty()
  long: number;
}

export class CreateRestaurantDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  city: string;
  @ApiProperty({ type: 'file' })
  image: string;
  @IsNotEmpty()
  @ApiProperty({ type: location })
  public location: {
    lat: number;
    long: number;
  };
}
