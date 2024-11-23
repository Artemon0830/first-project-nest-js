import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FollowPremiumEntity } from '../../../database/entities/follow-premium.entity';

@Injectable()
export class FollowPremiumRepository extends Repository<FollowPremiumEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FollowPremiumEntity, dataSource.manager);
  }
}
