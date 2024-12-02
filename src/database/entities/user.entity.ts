import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserID } from '../../common/types/entity-ids.type';
import { RoleEnum } from '../../modules/users/dto/enums/role.enum';
import { AddressBaseReqDto } from '../../modules/users/dto/req/address.base.req.dto';
import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name-enum';

import { FollowPremiumEntity } from './follow-premium.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('int')
  age: number;

  @Column('text')
  phone: string;

  @Column('text', { nullable: true })
  image: string;

  @Column('enum', { enum:RoleEnum,default: RoleEnum.ADMIN})
  role: RoleEnum;

  @Column('text')
  password: string;

  @Column('text', { array: true, nullable: true })
  address: AddressBaseReqDto[];

  @Column('text',{nullable:true})
  deviceId: string;

  @Column('boolean', { default: false })
  isPremium: boolean;

  @Column({ default: 0 })
  failedLogin: number;

  @Column({ default: false })
  isBanned: boolean;

  @Column('timestamp', { nullable: true })
  deleted?: Date;
  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars?: CarEntity[];
  @OneToMany(() => FollowPremiumEntity, (entity) => entity.user)
  premium?: FollowPremiumEntity[];
  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];
  // @ManyToOne(() => DealershipsEntity, (entity) => entity.user)
  // dealerships: DealershipsEntity[];
}
