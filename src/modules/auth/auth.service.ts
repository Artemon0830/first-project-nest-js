import { Injectable } from '@nestjs/common';

import { SignUpReqDto } from './dto/req/sign-up.req.dto';

@Injectable()
export class AuthService {
  public async signUp(dto: SignUpReqDto): Promise<any> {
    return dto;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
