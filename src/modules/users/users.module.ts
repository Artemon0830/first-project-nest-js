import { forwardRef, Module } from '@nestjs/common';

import { CarsModule } from '../cars/cars.module';
import { UsersService } from './modules/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [forwardRef(() => CarsModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
