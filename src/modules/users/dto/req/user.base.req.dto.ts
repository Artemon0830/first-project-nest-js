import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
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

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { RoleEnum } from '../enums/role.enum';
import { StatusEnum } from '../enums/status.enum';
import { AddressBaseReqDto } from './address.base.req.dto';

export class UserBaseReqDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({ example: 'string@test.com' })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsEmail()
  @ValidateIf((obj) => !obj.phone)
  email: string;
  @Transform(TransformHelper.trim)
  @ValidateIf((obj) => !obj.email)
  @IsString()
  phone: string;
  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(120)
  @IsOptional()
  age?: number;

  @IsOptional()
  @IsEnum(RoleEnum)
  role: RoleEnum;
  @Transform(TransformHelper.trim)
  @IsNotIn(['password', '12345678', 'admin', 'qwerty', 'password123'])
  @ApiProperty({ example: '123qweWE' })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;

  @ApiProperty({
    example: [
      'region: Kyiv',
      'city: Kyiv',
      'street:Vyshwanogo',
      'house_number: 1-A',
    ],
  })
  @IsArray()
  @Type(() => AddressBaseReqDto)
  address: AddressBaseReqDto[];

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
