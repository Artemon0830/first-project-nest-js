import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CarID } from '../../../common/types/entity-ids.type';
import { CarEntity } from '../../../database/entities/car.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ContentType } from '../../file-storage/enums/content-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { CarRepository } from '../../repository/services/car.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CreateCarDto } from '../dto/req/create-car.dto';
import { UpdateCarDto } from '../dto/req/update-car.dto';
import { ICarData } from '../interface/ICarData';

@Injectable()
export class CarsService {
  constructor(
    private readonly carsRepository: CarRepository,
    private readonly userRepository: UserRepository,
    private readonly fileStorageService: FileStorageService,
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
    if(dto.brand !== dto.producer) {
      throw new BadRequestException('Brand and producer must be different');
    }
    return await this.carsRepository.save(
      this.carsRepository.create({ ...dto, user }),
    );
  }
  public async updatePhotoCar(
    carData: ICarData,
    file: Express.Multer.File,
    carId: CarID,
  ): Promise<void> {
    const car = await this.carsRepository.findOneBy({ id: carData.carId });
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    const pathCar = await this.fileStorageService.uploadFile(
      file,
      ContentType.PHOTO_CAR,
      carData.carId,
    );

    if (car.photoCar) {
      await this.fileStorageService.deleteFile(car.photoCar);
    }

    await this.carsRepository.save({ ...car, photoCar: pathCar });
  }

  public async findOne(carId: CarID): Promise<CarEntity> {
    return {} as any;
  }

  public async update(
    userData: IUserData,
    carId: CarID,
    updateUserDto: UpdateCarDto,
  ): Promise<CarEntity> {
    return {} as any;
  }

  public async findAll(): Promise<CarEntity[]> {
    return await this.carsRepository.find();
  }

  private validateCarBrandAndProducer(user: UserEntity) {
    for (const car of user.cars) {
      if (car.brand !== car.producer) {
        throw new BadRequestException('Brand and producer must be different');
      }
    }
  }
}
