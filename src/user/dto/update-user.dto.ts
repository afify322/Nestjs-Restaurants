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
  IsOptional,
} from 'class-validator';
export enum RoleEnum {
  admin = 'admin',
  normal = 'normal',
}
export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @MinLength(8)
  name: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @MaxLength(12)
  @MinLength(8)
  @ApiProperty({ required: false })
  password: string;
  @ApiProperty({ required: false, enum: RoleEnum })
  @IsOptional()
  @IsEnum(RoleEnum)
  public role: RoleEnum;
}
