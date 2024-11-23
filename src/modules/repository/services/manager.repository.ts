import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ManagerEntity } from '../../../database/entities/manager.entity';
import { UserEntity } from '../../../database/entities/user.entity';

@Injectable()
export class ManagerRepository extends Repository<ManagerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }
}
