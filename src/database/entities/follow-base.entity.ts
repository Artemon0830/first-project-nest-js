import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Follow_baseID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name-enum';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.FOLLOW_BASES)
export class FollowBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Follow_baseID;

  @CreateDateColumn()
  created: Date;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.base)
  @JoinColumn({ name: 'user_id' })
  user_base?: UserEntity;
}
