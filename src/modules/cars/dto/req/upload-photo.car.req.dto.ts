import { ApiProperty } from '@nestjs/swagger';

export class UploadPhotoCarReqDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  photoCar: any;
}
