import { forwardRef, Module } from '@nestjs/common';

import { CommentsModule } from '../comments/comments.module';
import { UsersModule } from '../users/users.module';
import { ListsController } from './lists.controller';
import { ListsService } from './modules/lists.service';

@Module({
  imports: [forwardRef(() => UsersModule), CommentsModule],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
