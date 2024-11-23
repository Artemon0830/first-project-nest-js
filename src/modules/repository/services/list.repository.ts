import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ListEntity } from '../../../database/entities/list.entity';

@Injectable()
export class ListRepository extends Repository<ListEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ListEntity, dataSource.manager);
  }
}
