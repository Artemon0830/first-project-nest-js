import { Global, Module } from '@nestjs/common';

import { CarRepository } from './services/car.repository';
import { FollowBaseRepository } from './services/follow-base.repository';
import { FollowPremiumRepository } from './services/follow-premium.repository';
import { LikeRepository } from './services/like.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  FollowBaseRepository,
  FollowPremiumRepository,
  LikeRepository,
  CarRepository,
  RefreshTokenRepository,
  UserRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
