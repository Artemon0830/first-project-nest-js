import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiTags } from '@nestjs/swagger';

import { AuthManagerResDto, AuthResDto } from '../auth/models/dto/res/auth.res.dto';
import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { UserResDto } from './dto/res/user.res.dto';
import { UsersAdminService } from './modules/admin-service/users-admin.service';
import { CreateManagerDto } from './modules/admin-service/dto/req/create.manager.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';
import { UsersMapper } from './modules/users.mapper';
import { CarID, UserID } from '../../common/types/entity-ids.type';
import { UpdateCarDto } from '../cars/dto/req/update-car.dto';
import { CarResDto } from '../cars/dto/res/car.res.dto';
import { CarsMapper } from '../cars/modules/cars.mapper';

@ApiTags('users-admin')
@ApiConflictResponse({ description: 'Conflict' })
@Controller('users-admin')
export class UsersAdminController {
  constructor(private readonly usersAdminService: UsersAdminService) {}

  @ApiBearerAuth()
  @Patch(':userId/ban')
  public async update(
    @Param('userId') userId: UserID,
  ) {
     await this.usersAdminService.unbanUser(userId);

  }

  @ApiBearerAuth()
  @Post('create-manager')
  createManager(@Body() dto: CreateManagerDto): Promise<AuthManagerResDto> {
    return this.usersAdminService.createManager(dto);
  }
}
