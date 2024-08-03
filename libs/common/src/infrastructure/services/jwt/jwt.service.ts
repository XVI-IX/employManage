import {
  IJwtPayload,
  IJwtService,
} from '@app/common/domain/adapters/jwt.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envConfig } from '../../config/environment.config';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token, {
      secret: envConfig.getJWTSecret(),
    });
  }

  generateToken(payload: IJwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: envConfig.getJWTSecret(),
      expiresIn: envConfig.getJwtExpiration(),
    });
  }
}
