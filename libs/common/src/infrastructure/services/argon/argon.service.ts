import { IArgonService } from '@app/common/domain/adapters/argon.interface';
import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

/**
 * @name ArgonService
 * @description This is the argon service
 * @class
 * @implements IArgonService
 */
@Injectable()
export class ArgonService implements IArgonService {
  async hashPassword(password: string): Promise<string> {
    return await argon.hash(password);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await argon.verify(hash, password);
  }
}
