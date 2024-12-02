import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

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
  @IsString()
  house_number: string;
}
