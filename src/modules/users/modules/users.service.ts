import { ConflictException, Injectable } from '@nestjs/common';
import * as cron from 'node-cron';

import { UserID } from '../../../common/types/entity-ids.type';
import { FollowPremiumEntity } from '../../../database/entities/follow-premium.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { FollowPremiumRepository } from '../../repository/services/follow-premium.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { FollowPremiumReq } from '../dto/req/follow-premium.req';
import { UpdateUserReqDto } from '../dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly followPremiumRepository: FollowPremiumRepository,
  ) {}

  findMe(userData: IUserData): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id: userData.userId });
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserReqDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }

  public async removeMe(userData: IUserData): Promise<void> {
    await this.userRepository.update(
      { id: userData.userId },
      { deleted: new Date() },
    );
    await this.refreshTokenRepository.delete({ user_id: userData.userId });
  }

  public async findOne(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  public async follow(
    userData: IUserData,
    dto: FollowPremiumReq,
  ): Promise<FollowPremiumEntity> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    this.userRepository.merge(user, dto);
    console.log('DTO', dto);
    await this.userRepository.save(user);
    console.log('User:', user);
    const follow = await this.followPremiumRepository.findOneBy({
      following_id: userData.userId,
    });
    if (follow) {
      throw new ConflictException('You already follow for premium');
    }
    const followEntity = await this.followPremiumRepository.save(
      this.followPremiumRepository.create({
        following_id: userData.userId,
      }),
    );

    // Schedule task to revert status after one month
    this.scheduleRevertStatus(userData.userId);

    return followEntity;
  }

  private scheduleRevertStatus(userId: UserID): void {
    cron.schedule('0 0 0 1 * *', async () => {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (user) {
        user.isPremium = false;
        await this.userRepository.save(user);
      }
    });
  }
}
