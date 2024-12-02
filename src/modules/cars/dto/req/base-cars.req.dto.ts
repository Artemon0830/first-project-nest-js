import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min, Validate,
} from 'class-validator';

import { CarBrand, carModels } from '../../brand/car.brand';
import { CurrencyEnum } from '../../enum/currency.enum';
import { CarModels } from '../../interface/CarModels';
import { IsValidModel } from '../../decorators/validationbrandofmodel';

export class BaseCarsReqDto {
  @IsString()
  id: string;
  @IsEnum(CarBrand)
  producer: CarBrand;

  @IsEnum(CarBrand)
  brand: CarBrand;
  @Validate(IsValidModel)
  model: string;
  @ApiProperty({ example: 2005 })
  @IsNumber()
  @Min(1900)
  @Max(2024)
  year: number;
  @ApiProperty({ example: 102000 })
  @IsNumber()
  @Min(1000)
  @Max(1000000)
  price: number;
  @ApiProperty({ example: 'USD' })
  @IsString()
  @Length(3, 3)
  currency: CurrencyEnum;
  @ApiProperty({ example: 230000 })
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsString()
  @Length(3, 100)
  @IsOptional()
  photoCar?: string;

  @IsString()
  @Length(3, 100)
  description: string;
}
