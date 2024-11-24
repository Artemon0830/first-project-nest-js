import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsNumber, IsString, Length, Min } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { IAddress } from '../../interface/IAddress';

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
  @IsString()
  house_number: string;
}
