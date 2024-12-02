import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CarID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name-enum';
import { LikeEntity } from './like.entity';
import { UserEntity } from './user.entity';
import { CarModels } from '../../modules/cars/interface/CarModels';

@Entity(TableNameEnum.CARS)
export class CarEntity {
  @PrimaryGeneratedColumn('uuid')
  id: CarID;

  @Column('text')
  producer: string;

  @Column('text')
  model: string;

  @Column('text')
  brand: string;

  @Column('int')
  year: number;

  @Column('int')
  price: number;

  @Column('enum', { enum: ['USD', 'EUR', 'UAH'], default: 'USD' })
  currency: string;

  @Column('int')
  mileage: number;

  @Column('text', { nullable: true })
  photoCar: string;

  @Column('text', { nullable: true })
  description: string;
  @OneToMany(() => LikeEntity, (entity) => entity.list)
  likes?: LikeEntity[];

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
