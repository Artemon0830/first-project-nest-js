import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse } from '@nestjs/swagger';

import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';
import { UserListReqDto } from './dto/req/user-list.req.dto';
import { UserBaseResDto } from './dto/res/user.base.res.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
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

  @Get()
  findAll(@Query() query: UserListReqDto) {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserReqDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
