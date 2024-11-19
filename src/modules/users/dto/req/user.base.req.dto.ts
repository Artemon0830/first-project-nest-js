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
import { GenderEnum } from '../enums/gender.enum';

export class CarBaseReqDto {
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @Length(1, 50)
  producer: string;
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @Length(1, 50)
  model: string;
  @ApiProperty({ example: 2021 })
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  year: number;
}
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
  @IsEnum(GenderEnum)
  gender: GenderEnum;
  @Transform(TransformHelper.trim)
  @IsNotIn(['password', '12345678', 'admin', 'qwerty', 'password123'])
  @ApiProperty({ example: '123qweWE' })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter and one number',
  })
  password: string;

  @IsBoolean()
  @IsOptional()
  isStudent: boolean = false;
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CarBaseReqDto)
  cars: CarBaseReqDto[];
}
