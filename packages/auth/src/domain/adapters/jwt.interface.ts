export interface IJwtPayload {
  id: string;
  role: string;
}

export interface IJwtService {
  verifyToken(token: string): any;
  generateToken(payload: IJwtPayload): string;
}
