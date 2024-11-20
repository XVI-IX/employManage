export interface IEnvironmentInterface {
  getEnvironment(): string;
  getPort(): number;
  getURL(): string;
  getAdminMail(): string;
  getJWTSecret(): string;
  getResetSecret(): string;
  getEmailHost(): string;
  getEmailPort(): string;
  getEmailPassword(): string;
  getEmailUsername(): string;
  getDatabaseUrl(): string;
  getPaystackKey(): string;
  getJwtExpiration(): string;
  getPaginationLimit(): number;
  getOpensourceMapsKey(): string;
  getOpenRouteUrl(): string;
  getEarthRadius(): number;
  getDatabaseHost(): string;
  getDatabaseUser(): string;
  getDatabasePort(): number;
  getDatabasePassword(): string;
  getDatabase(): string;
  getEmployeeServicePort(): number;
}
