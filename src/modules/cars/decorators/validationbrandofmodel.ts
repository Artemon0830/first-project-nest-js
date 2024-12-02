import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { carModels } from '../brand/car.brand';

@ValidatorConstraint({ name: 'isValidModel', async: false })
export class IsValidModel implements ValidatorConstraintInterface {
  validate(model: string, args: ValidationArguments) {
    const { brand } = args.object as { brand: string };
    return brand in carModels && carModels[brand]?.includes(model);
  }

  defaultMessage(args: ValidationArguments) {
    const { brand } = args.object as { brand: string };
    return `The model must be one of the following for the selected brand (${brand}): ${carModels[brand]?.join(', ') || 'No models available'}`;
  }
}
