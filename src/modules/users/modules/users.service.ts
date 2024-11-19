import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig, ConfigType } from '../../../configs/config.type';
import { CreateUserReqDto } from '../dto/req/create-user.req.dto';
import { UpdateUserReqDto } from '../dto/req/update-user.req.dto';
import { UserBaseResDto } from '../dto/res/user.base.res.dto';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService<ConfigType>) {}
  public async create(
    createUserDto: CreateUserReqDto,
  ): Promise<UserBaseResDto> {
    const appConfig = this.configService.get<AppConfig>('app');
    console.log(appConfig);
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
