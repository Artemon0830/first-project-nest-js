import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IsNull } from 'typeorm';

import { UserEntity } from '../../../../database/entities/user.entity';
import {
  AuthManagerResDto,
  AuthResDto,
} from '../../../auth/models/dto/res/auth.res.dto';
import { IUserData } from '../../../auth/models/interfaces/user-data.interface';
import { AuthCacheService } from '../../../auth/services/auth-cache-service';
import { TokenService } from '../../../auth/services/token.service';
import { RefreshTokenRepository } from '../../../repository/services/refresh-token.repository';
import { UserRepository } from '../../../repository/services/user.repository';
import { RoleEnum } from '../../dto/enums/role.enum';
import { UsersMapper } from '../users.mapper';
import { CreateManagerDto } from './dto/req/create.manager.dto';
import { UserID } from '../../../../common/types/entity-ids.type';

@Injectable()
export class UsersAdminService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {
  }

  public async unbanUser(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({
      id: userId,
      isBanned: true,
    });
    if (!user) {
      throw new UnauthorizedException('User is not banned');
    }
    await this.userRepository.update({ id: userId }, { isBanned: false });
  }


  public async createManager(
    dto: CreateManagerDto,
  ): Promise<AuthManagerResDto> {
    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    if (user.email === dto.email) {
      throw new ForbiddenException('User with this email already exists');
    }
    if (user.role === RoleEnum.ADMIN) {
      throw new ForbiddenException('Only administrators can create managers');
    }
    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });

    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          deviceId: dto.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);

    const userEntity = await this.userRepository.findOneBy({ id: user.id });

    return {
      user: UsersMapper.toManagerResDto(userEntity),
      tokens,
    };
  }
}
