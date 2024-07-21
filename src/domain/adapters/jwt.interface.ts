/**
 * @name IJwtServicePayload
 * @description Interface for JWT service payload
 * @property id - User id
 */
export interface IJwtServicePayload {
  id: string;
}

/**
 * @name IJwtService
 * @description Interface for JWT service
 * @method verifyToken - Method to verify token
 * @method generateToken - Method to generate token
 */
export interface IJwtService {
  verifyToken(token: string): Promise<any>;
  generateToken(payload: IJwtServicePayload): string;
}
