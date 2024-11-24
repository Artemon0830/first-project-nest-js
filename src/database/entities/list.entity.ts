import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ListID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name-enum';
import { LikeEntity } from './like.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.LISTS)
export class ListEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: ListID;
  @Column('text')
  model: string;

  @Column('text')
  make: string;

  @Column('int')
  year: number;

  @Column('int')
  price: number;

  @Column('int')
  mileage: number;

  @Column('text')
  image?: string;
  @Column('text')
  description: string;

  @OneToMany(() => LikeEntity, (entity) => entity.list)
  likes?: LikeEntity[];

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.lists)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
