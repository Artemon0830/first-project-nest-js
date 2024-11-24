import { Global, Module } from '@nestjs/common';

import { FollowBaseRepository } from './services/follow-base.repository';
import { FollowPremiumRepository } from './services/follow-premium.repository';
import { LikeRepository } from './services/like.repository';
import { ListRepository } from './services/list.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  FollowBaseRepository,
  FollowPremiumRepository,
  LikeRepository,
  ListRepository,
  RefreshTokenRepository,
  UserRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
