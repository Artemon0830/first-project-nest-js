import { CarBrand } from '../../brand/car.brand';

export class CarResDto {
  id: string;
  producer: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image: string;
  description: string;
}
