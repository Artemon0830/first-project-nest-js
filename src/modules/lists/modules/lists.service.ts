import { Injectable } from '@nestjs/common';

import { UsersService } from '../../users/modules/users.service';
import { BaseListsReqDto } from '../dto/req/base-lists.req.dto';
import { BaseListsDto } from '../dto/res/base-lists.dto';
import { UpdateAnnouncementDto } from '../dto/res/update-announcement.dto';

@Injectable()
export class ListsService {
  constructor(private readonly usersService: UsersService) {}
  public async create(createAnnouncementDto: BaseListsReqDto) {
    return {} as BaseListsDto;
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
