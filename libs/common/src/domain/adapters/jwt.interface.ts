import { IAuthUser } from '@app/common/infrastructure/decorators';

/**
 * @name  IJwtPayload
 * @description This is the payload to be embedded in the token
 * @property id - This is the user's unique ID
 * @property email - This is the user's email
 * @property role - the role assigned to the user
 */
export interface IJwtPayload extends IAuthUser {}

export interface IJwtService {
  generateToken(payload: IJwtPayload): string;
  verifyToken(token: string): Promise<any>;
}
