export interface IUserRepository {
  findUserByEmail(email: string): Promise<any>;
  createUser(email: string, password: string): Promise<any>;
  updateUser(id: string, data: any): Promise<any>;
}
