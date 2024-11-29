import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ListID } from '../../../common/types/entity-ids.type';
import { CarEntity } from '../../../database/entities/car.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { CarRepository } from '../../repository/services/car.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CreateCarDto } from '../dto/req/create-car.dto';
import { UpdateCarDto } from '../dto/req/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    private readonly carsRepository: CarRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async create(
    userData: IUserData,
    dto: CreateCarDto,
  ): Promise<CarEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
      relations: ['cars'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.isPremium === false && user.cars.length >= 1) {
      throw new BadRequestException(
        'Basic account users can list only one car for sale',
      );
    }
    return await this.carsRepository.save(
      this.carsRepository.create({ ...dto, user }),
    );
  }

  public async findOne(listId: ListID): Promise<CarEntity> {
    return {} as any;
  }

  public async update(
    userData: IUserData,
    articleId: ListID,
    updateUserDto: UpdateCarDto,
  ): Promise<CarEntity> {
    return {} as any;
  }
}
