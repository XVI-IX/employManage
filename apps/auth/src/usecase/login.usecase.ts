import { IAuthToken } from '../domain/usecase/auth.interface';

export class LoginUseCase {
  constructor() {}

  async loginWithPassword(
    email: string,
    password: string,
  ): Promise<IAuthToken> {}
}
