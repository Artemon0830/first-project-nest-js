import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from './enums/table-name-enum';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.FOLLOW_PREMIUMS)
export class FollowPremiumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.premium)
  @JoinColumn({ name: 'user_id' })
  user_premium?: UserEntity;
}
