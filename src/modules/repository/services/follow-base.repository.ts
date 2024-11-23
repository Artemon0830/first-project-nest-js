import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FollowBaseEntity } from '../../../database/entities/follow-base.entity';

@Injectable()
export class FollowBaseRepository extends Repository<FollowBaseEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FollowBaseEntity, dataSource.manager);
  }
}
