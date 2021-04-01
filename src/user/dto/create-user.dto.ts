import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Allow,
  IsEnum,
  IsEmail,
  Min,
  Max,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
export enum RoleEnum {
  normal = 'normal',
  admin = 'admin',
}
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(8)
  name: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(8)
  @ApiProperty()
  password: string;
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  @ApiProperty({ enum: RoleEnum })
  public role: RoleEnum;
}
