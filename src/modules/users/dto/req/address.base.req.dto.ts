import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsString, Length, Min } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class AddressBaseReqDto {
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @Length(1, 50)
  region: string;
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @Length(1, 50)
  city: string;
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @Length(1, 50)
  street: string;
  @ApiProperty({ example: 2021 })
  @Type(() => Number)
  @IsInt()
  house_number: number;
}
