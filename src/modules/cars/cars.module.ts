import { forwardRef, Module } from '@nestjs/common';

import { CommentsModule } from '../comments/comments.module';
import { UsersModule } from '../users/users.module';
import { CarsController } from './cars.controller';
import { CarsService } from './modules/cars.service';
import { FileStorageService } from '../file-storage/services/file-storage.service';

@Module({
  imports: [forwardRef(() => UsersModule), CommentsModule, ],
  controllers: [CarsController],
  providers: [CarsService, FileStorageService],
})
export class CarsModule {}
