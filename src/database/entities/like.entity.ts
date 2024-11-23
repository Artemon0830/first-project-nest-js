import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from './enums/table-name-enum';
import { ListEntity } from './list.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.LIKES)
export class LikeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  article_id: string;
  @ManyToOne(() => ListEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'article_id' })
  list?: ListEntity;
}
