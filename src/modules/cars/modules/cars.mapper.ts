import { Injectable } from '@nestjs/common';

import { CarEntity } from '../../../database/entities/car.entity';
import { CarResDto } from '../dto/res/car.res.dto';

@Injectable()
export class CarsMapper {
  public static toResDto(data: CarEntity): CarResDto {
    return {
      id: data.id,
      producer: data.producer,
      model: data.model,
      brand: data.brand,
      year: data.year,
      price: data.price,
      mileage: data.mileage,
      image: data.image,
      description: data.description,
    };
  }
}
