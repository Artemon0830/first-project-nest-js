import { ApiProperty } from '@nestjs/swagger';

export class CreateUserReqDto {
  @ApiProperty({ example: 'Artem Maksymuk', description: 'Name of the user' })
  readonly name: string;
  @ApiProperty({ example: 'test@.gmail.com', description: 'Email of the user' })
  readonly email?: string;
  @ApiProperty({ example: '123qwe!@#QWE', description: 'Password of the user' })
  readonly password: string;
  @ApiProperty({ example: 25, description: 'Age of the user' })
  readonly age?: number;
  @ApiProperty({ example: 'admin|user', description: 'Role of the user' })
  readonly role: string;
}
