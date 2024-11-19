import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class BaseListsReqDto {
  @IsString()
  @Length(3, 10)
  model: string;
  @IsString()
  @Length(3, 10)
  make: string;

  @IsNumber()
  @Min(1900)
  @Max(2024)
  year: number;

  @IsNumber()
  @Min(1000)
  @Max(1000000)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsString()
  @Length(3, 100)
  @IsOptional()
  photo?: string;

  @IsString()
  @Length(3, 100)
  description: string;
}
