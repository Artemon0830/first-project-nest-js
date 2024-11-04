import { Injectable } from '@nestjs/common';

import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';
import { UserBaseResDto } from './dto/res/user.base.res.dto';

@Injectable()
export class UsersService {
  public async create(
    createUserDto: CreateUserReqDto,
  ): Promise<UserBaseResDto> {
    return {} as UserBaseResDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserReqDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  public async checkAbilityToArticles(userId: string, articleId: string) {
    //check ability to articles
  }
}
