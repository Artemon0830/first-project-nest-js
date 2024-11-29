import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Follow_premiumID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name-enum';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.FOLLOW_PREMIUMS)
export class FollowPremiumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Follow_premiumID;

  @CreateDateColumn()
  createdPremiumAt: Date;

  @Column()
  following_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.premium)
  @JoinColumn({ name: 'following_id' })
  user?: UserEntity;
}
