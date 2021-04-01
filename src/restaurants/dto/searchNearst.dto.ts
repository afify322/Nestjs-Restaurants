import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
class location {
  @ApiProperty()
  lat: number;
  @ApiProperty()
  long: number;
}
export class SearchNearst {
  @IsNotEmpty()
  @ApiProperty({ type: location })
  location: {
    lat: number;
    long: number;
  };
  @ApiProperty()
  @IsNotEmpty()
  radius: number;
}
