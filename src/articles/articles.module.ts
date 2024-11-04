import { forwardRef, Module } from '@nestjs/common';

import { CommentsModule } from '../comments/comments.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [forwardRef(() => UsersModule), CommentsModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
