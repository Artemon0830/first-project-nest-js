import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ListID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CreateCarDto } from './dto/req/create-car.dto';
import { UpdateCarDto } from './dto/req/update-car.dto';
import { CarResDto } from './dto/res/car.res.dto';
import { CarsMapper } from './modules/cars.mapper';
import { CarsService } from './modules/cars.service';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly listsService: CarsService) {}
  @ApiBearerAuth()
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateCarDto,
  ): Promise<CarResDto> {
    const result = await this.listsService.create(userData, dto);
    return CarsMapper.toResDto(result);
  }
  @ApiBearerAuth()
  @Get(':listId')
  public async findOne(@Param('listId') listId: ListID): Promise<CarResDto> {
    const result = await this.listsService.findOne(listId);
    return CarsMapper.toResDto(result);
  }
  @ApiBearerAuth()
  @Patch(':listId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('listId') listId: ListID,
    @Body() dto: UpdateCarDto,
  ): Promise<CarResDto> {
    const result = await this.listsService.update(userData, listId, dto);
    return CarsMapper.toResDto(result);
  }
}
