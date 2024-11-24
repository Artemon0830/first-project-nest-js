import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UsersMapper } from '../../users/modules/users.mapper';
import { SignInReqDto } from '../dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../dto/req/sign-up.req.dto';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { AuthCacheService } from './auth-cache-service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    const deleteOldTokens = await this.refreshTokenRepository.delete({
      user_id: user.id,
      deviceId: dto.deviceId,
    });
    const tokens = await this.tokenService.generateTokens({
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

    return { user: UsersMapper.toUserResDto(user), tokens };
  }

  public async signIn(dto: SignInReqDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPassword = await bcrypt.compare(dto.password, user.password);
    if (!isPassword) {
      throw new UnauthorizedException();
    }
    const tokens = await this.tokenService.generateTokens({
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

    return { user: UsersMapper.toUserResDto(userEntity), tokens };
  }
}
