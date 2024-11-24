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

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAccessGuard } from '../auth/guard/jwt-access.guard';
import { IUserData } from '../auth/interface/user-data.interface';
import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';
import { UserListReqDto } from './dto/req/user-list.req.dto';
import { UserBaseResDto } from './dto/res/user.base.res.dto';
import { UsersService } from './modules/users.service';

@ApiTags('Users')
@ApiConflictResponse({ description: 'Conflict' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(
    @Body() createUserDto: CreateUserReqDto,
  ): Promise<UserBaseResDto> {
    return await this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @Get('me')
  findMe(@CurrentUser() userData: IUserData) {
    return this.usersService.findMe(userData);
  }

  // @Get(':id')
  // findOne(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserReqDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
