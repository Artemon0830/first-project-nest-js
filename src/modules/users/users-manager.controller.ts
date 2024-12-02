import { Body, Controller, Post } from '@nestjs/common';
import { UsersManagerService } from './modules/users-manager.service';
import { ApiConflictResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users-manager')
@ApiConflictResponse({ description: 'Conflict' })
@Controller('users-manager')
export class UsersManagerController {
  constructor(private readonly usersManagerService: UsersManagerService) {}

  @Post('ban')
  ban(@Body() dto: any) {
    return this.usersManagerService.ban(dto.id);
  }

  @Post('delete-invalid-listing')
  deleteInvalidListing(@Body() dto: any) {
    return this.usersManagerService.deleteInvalidListing(dto.listingId);
  }

  @Post('check-suspicious-listing')
  checkSuspiciousListing(@Body() dto: any) {
    return this.usersManagerService.checkSuspiciousListing(dto.listingId);
  }
}