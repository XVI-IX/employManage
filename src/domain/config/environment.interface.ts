/**
 * @name IEnvironment
 * @description Interface for environment
 *
 * @method getPort - Method to get port
 * @method getEnvironment - Method to get environment
 * @method getJwtSecret - Method to get jwt secret
 * @method getJwtExpiration - Method to get jwt expiration
 */
export interface IEnvironment {
  getPort(): number;
  getEnvironment(): string;
  getJwtSecret(): string;
  getJwtExpiration(): string;
}
