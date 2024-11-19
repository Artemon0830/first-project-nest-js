export class UserListReqDto {
  readonly page?: number;
  readonly limit?: number;
  readonly search?: string;
  readonly sort?: string;
}
