import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { BaseListsReqDto } from './dto/req/base-lists.req.dto';
import { UpdateAnnouncementDto } from './dto/res/update-announcement.dto';
import { ListsService } from './modules/lists.service';

@Controller('announcement')
export class ListsController {
  constructor(private readonly announcementService: ListsService) {}
  @Post()
  async create(
    @Body() createAnnouncementDto: BaseListsReqDto,
  ): Promise<BaseListsReqDto> {
    return await this.announcementService.create(createAnnouncementDto);
  }

  @Get()
  findAll() {
    return this.announcementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.announcementService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateAnnouncementDto,
  ) {
    return this.announcementService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementService.remove(+id);
  }
}
