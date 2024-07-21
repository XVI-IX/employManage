/**
 * @name IArgonService
 * @description Interface for Argon service
 * @method hash - Method to hash password
 *  @param password - Password to hash
 * @method compare - Method to compare password and hash
 *  @param password - Password to compare
 *  @param hash - Hash to compare
 */
export interface IArgonService {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
