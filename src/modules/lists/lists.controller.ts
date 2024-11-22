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
import { ListsService } from './modules/lists.service';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}
  @Post()
  async create(
    @Body() createListDto: BaseListsReqDto,
  ): Promise<BaseListsReqDto> {
    return await this.listsService.create(createListDto);
  }

  @Get()
  findAll() {
    return this.listsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArticleDto:) {
  //   return this.listsService.update(+id, updateArticleDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listsService.remove(+id);
  }
}
