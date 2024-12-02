import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotIn, IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches, Min,
} from 'class-validator';
import { Index } from 'typeorm';

import { TransformHelper } from '../../../../../../common/helpers/transform.helper';
import { RoleEnum } from '../../../../dto/enums/role.enum';

@Index(['email'], { unique: true })
export class ManagerReqDto {
  @IsString()
  id: string;
  @ApiProperty({ description: 'User name', example: 'Artem Maksymuk' })
  @IsString({ message: 'This name is already in use' })
  @Length(3, 50)
  name: string;

  @ApiProperty({ example: 'string@test.com' })
  @Transform(TransformHelper.trim)
  @IsString({ message: 'This email is already in use' })
  @IsEmail()
  email: string;
  @ApiProperty({ default: RoleEnum.MANAGER })
  @IsOptional({ message: 'Role admin is not allowed' })
  @IsEnum(RoleEnum)
  role: RoleEnum.MANAGER;
  @ApiProperty({ description: 'User password', example: '123qweWE' })
  @Transform(TransformHelper.trim)
  @IsNotIn(['password', '12345678', 'admin', 'qwerty', 'password123'], {
    message: 'Password is too weak',
  })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;


  @ApiProperty({ example: 25 })
  @IsNumber()
  @Min(18)
  age: number;
  @ApiProperty({ example: '+380671234567' })
  @IsString()
  phone: string;
  @IsString()
  deviceId: string;
}
