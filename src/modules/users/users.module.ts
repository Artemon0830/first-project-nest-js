import { forwardRef, Module } from '@nestjs/common';

import { ListsModule } from '../lists/lists.module';
import { UsersService } from './modules/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [forwardRef(() => ListsModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
