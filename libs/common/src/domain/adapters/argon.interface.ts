/**
 * @name IArgonService
 * @description This is the interface for the argon service
 *
 * @method hashPassword - This method hashes a password
 * @method comparePassword - This method compares a password with a hash
 */
export interface IArgonService {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}
