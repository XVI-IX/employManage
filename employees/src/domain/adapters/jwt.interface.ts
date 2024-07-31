/**
 * @name IJwtServicePayload
 * @description Interface for the jwt service
 * @property id - User's unique id
 */
export interface IJwtServicePayload {
  id: string;
  role: string;
}

export interface IJwtService {
  verifyToken(token: string): Promise<any>;
  generateToken(payload: IJwtServicePayload): string;
}
