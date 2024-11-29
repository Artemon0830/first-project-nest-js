import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CarsMapper } from '../cars/modules/cars.mapper';
import { FollowPremiumRepository } from '../repository/services/follow-premium.repository';
import { FollowPremiumReq } from './dto/req/follow-premium.req';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';
import { UserBaseResDto } from './dto/res/user.base.res.dto';
import { UsersMapper } from './modules/users.mapper';
import { UsersService } from './modules/users.service';

@ApiTags('Users')
@ApiConflictResponse({ description: 'Conflict' })
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    followPremiumRepository: FollowPremiumRepository,
  ) {}

  @ApiBearerAuth()
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData) {
    const result = await this.usersService.findMe(userData);
    return UsersMapper.toUserResDto(result);
  }
  @ApiBearerAuth()
  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() updateUserDto: UpdateUserReqDto,
  ) {
    const result = await this.usersService.updateMe(userData, updateUserDto);
    return UsersMapper.toUserResDto(result);
  }

  @ApiBearerAuth()
  @Delete('delete-me')
  public async removeMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.removeMe(userData);
  }

  @SkipAuth()
  @Get(':userId')
  public async findOne(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<UserBaseResDto> {
    const result = await this.usersService.findOne(userId);
    return UsersMapper.toUserResDto(result);
  }

  @ApiBearerAuth()
  @Patch('follow-premium')
  public async follow(
    @Body()
    dto: FollowPremiumReq,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.follow(userData, dto);
  }
}
