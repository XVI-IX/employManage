/**
 * @name IDatabseService
 * @description This is the interface for the DatabaseService class
 * @method connect This method is used to connect to the database
 * @method getConnection This method is used to get the connection to the database
 */
export interface IDatabseService {
  connect(): Promise<void>;
  getConnection(): any;
}
