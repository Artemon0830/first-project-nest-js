import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LikeID, CarID } from '../../common/types/entity-ids.type';
import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name-enum';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.LIKES)
export class LikeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: LikeID;

  @CreateDateColumn()
  created: Date;

  @Column()
  list_id: CarID;
  @ManyToOne(() => CarEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'list_id' })
  list?: CarEntity;
}
