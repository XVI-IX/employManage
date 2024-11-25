import { ITokenHelper } from '@app/common/domain/helpers/token/token.helper';
import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';

@Injectable()
export class TokenHelper implements ITokenHelper {
  constructor() {}

  generateResetPasswordToken(): string {
    return crypto.randomBytes(3).toString('hex');
  }
}
