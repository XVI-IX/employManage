export interface IEnvironmentInterface {
  getPort(): number;
  getEnvironment(): string;
  getJwtSecret(): string;
  getJwtExpiresIn(): string;
}
