import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { CommentsModule } from '../comments/comments.module';
import { UsersModule } from '../users/users.module';
import { CarsController } from './cars.controller';
import { CarsService } from './modules/cars.service';

@Module({
  imports: [forwardRef(() => UsersModule), CommentsModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
