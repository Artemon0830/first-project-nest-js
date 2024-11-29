import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class BaseCarsReqDto {
  @IsString()
  id: string;
  @ApiProperty({ example: 'BMW' })
  @IsString()
  @Length(3, 10)
  producer: string;
  @IsString()
  @Length(3, 10)
  brand: string;
  @IsString()
  @Length(3, 10)
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
  @ApiProperty({ example: 230000 })
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsString()
  @Length(3, 100)
  @IsOptional()
  image?: string;

  @IsString()
  @Length(3, 100)
  description: string;
}
