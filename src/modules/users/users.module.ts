import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CarsModule } from '../cars/cars.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { UsersService } from './modules/users.service';
import { UsersAdminService } from './modules/admin-service/users-admin.service';
import { UsersManagerService } from './modules/users-manager.service';
import { UsersController } from './users.controller';
import { UsersAdminController } from './users-admin.controller';
import { UsersManagerController } from './users-manager.controller';
import { TokenService } from '../auth/services/token.service';

@Module({
  imports: [forwardRef(() => CarsModule), FileStorageModule, AuthModule],
  controllers: [UsersController, UsersAdminController, UsersManagerController],
  providers: [UsersService, UsersManagerService, UsersAdminService],
  exports: [UsersService, UsersManagerService, UsersAdminService],
})
export class UsersModule {}
