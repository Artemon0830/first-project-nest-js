import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../common/decorators/api-file.decorator';
import { CarID } from '../../common/types/entity-ids.type';
import { CarEntity } from '../../database/entities/car.entity';
import {
  CurrentCar,
  CurrentUser,
} from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { RoleEnum } from '../users/dto/enums/role.enum';
import { CarBrand, carModels } from './brand/car.brand';
import { CreateCarDto } from './dto/req/create-car.dto';
import { UpdateCarDto } from './dto/req/update-car.dto';
import { CarResDto } from './dto/res/car.res.dto';
import { ICarData } from './interface/ICarData';
import { CarsMapper } from './modules/cars.mapper';
import { CarsService } from './modules/cars.service';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @SkipAuth()
  @Get()
  public async findAll(): Promise<CarEntity[]> {
    return await this.carsService.findAll();
  }
  @ApiBearerAuth()
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateCarDto,
  ): Promise<CarResDto> {
    const result = await this.carsService.create(userData, dto,);
    return CarsMapper.toResDto(result);
  }
  // @SkipAuth()
  // @ApiParam({ name: 'brand', enum: CarBrand ,required: true})
  // @Get(':brand/models')
  // public async getModels(@Param('brand') brand: CarBrand): Promise<string[]> {
  //   return carModels[brand] || [];
  // }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiFile('photoCar', false, true)
  @UseInterceptors(FileInterceptor('photoCar'))
  @Post('car/photo')
  public async updateAvatar(
    @CurrentCar() carData: ICarData,
    @UploadedFile() file: Express.Multer.File,
    @Param('carId') carId: CarID,
  ): Promise<void> {
    await this.carsService.updatePhotoCar(carData, file, carId);
  }

  @ApiBearerAuth()
  @Get(':listId')
  public async findOne(@Param('listId') carId: CarID): Promise<CarResDto> {
    const result = await this.carsService.findOne(carId);
    return CarsMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Patch(':carId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('carId') carId: CarID,
    @Body() dto: UpdateCarDto,
  ): Promise<CarResDto> {
    const result = await this.carsService.update(userData, carId, dto);
    return CarsMapper.toResDto(result);
  }
}
