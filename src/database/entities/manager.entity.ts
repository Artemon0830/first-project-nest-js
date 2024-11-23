import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEnum } from '../../modules/users/dto/enums/role.enum';
import { StatusEnum } from '../../modules/users/dto/enums/status.enum';
import { AddressBaseReqDto } from '../../modules/users/dto/req/address.base.req.dto';
import { TableNameEnum } from './enums/table-name-enum';
import { FollowBaseEntity } from './follow-base.entity';
import { FollowPremiumEntity } from './follow-premium.entity';
import { ListEntity } from './list.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.MANAGER)
export class ManagerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  ban: boolean;

  @OneToMany(() => UserEntity, (entity) => entity.manager)
  user?: UserEntity[];
}
