import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotIn,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Index } from 'typeorm';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { RoleEnum } from '../enums/role.enum';
import { StatusEnum } from '../enums/status.enum';
import { AddressBaseReqDto } from './address.base.req.dto';

@Index(['email'], { unique: true })
export class UserBaseReqDto {
  @ApiProperty({ description: 'User name', example: 'Artem Maksymuk' })
  @IsString({ message: 'This name is already in use' })
  @Length(3, 50)
  name: string;

  @ApiProperty({ example: 'string@test.com' })
  @Transform(TransformHelper.trim)
  @IsString({ message: 'This email is already in use' })
  @IsEmail()
  @ValidateIf((obj) => !obj.phone) // Conditional validation
  email: string;

  @ApiProperty({ example: '+38034567890' })
  @Transform(TransformHelper.trim)
  @ValidateIf((obj) => !obj.email) // Conditional validation
  @IsString({ message: 'This phone is already in use' })
  phone: string;

  @ApiProperty({ example: 25 })
  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(120)
  @IsOptional()
  age?: number;

  @ApiProperty({ default: RoleEnum.USER, enum: RoleEnum })
  @IsOptional({ message: 'Role admin is not allowed' })
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @ApiProperty({ description: 'User password', example: '123qweWE' })
  @Transform(TransformHelper.trim)
  @IsNotIn(['password', '12345678', 'admin', 'qwerty', 'password123'], {
    message: 'Password is too weak',
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @IsString()
  deviceId: string;

  @ApiProperty({
    type: () => [AddressBaseReqDto],
    example: [
      {
        region: 'Kyiv',
        city: 'Kyiv',
        street: 'Vyshwanogo',
        house_number: '1-A',
      },
    ],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => AddressBaseReqDto)
  address: AddressBaseReqDto[];

  @ApiProperty({ enum: StatusEnum, example: StatusEnum.BASE })
  @IsOptional({ message: 'Status premium is paid only ' })
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
