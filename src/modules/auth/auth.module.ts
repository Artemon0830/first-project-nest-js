import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { RedisModule } from '../redis/redis.module';
import { AuthController } from './auth.controller';
import { JwtAccessGuard } from './guard/jwt-access.guard';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache-service';
import { TokenService } from './services/token.service';

@Module({
  imports: [JwtModule, RedisModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    AuthService,
    AuthCacheService,
    TokenService,
  ],
  exports: [],
})
export class AuthModule {}
