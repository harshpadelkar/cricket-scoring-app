import { UserRole } from '../enums/user-role.enum';

export interface JwtPayloadUserDetails {
  userId: string;
  token?: string;
}
