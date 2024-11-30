import { IEmployeeRepository } from '../../domain/repositories';
import { JwtTokenService } from '@app/common/infrastructure/services/jwt/jwt.service';
import { IArgonService } from '@app/common/domain/adapters/argon.interface';
import { IAuthToken } from 'apps/auth/src/domain/usecase/auth.interface';
import { BadRequestException } from '@nestjs/common';
import { IAuthUser } from '@app/common/infrastructure/decorators';

export class LoginUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly jwtTokenService: JwtTokenService,
    private readonly argonService: IArgonService,
  ) {}

  async loginWithPassword(
    email: string,
    password: string,
  ): Promise<IAuthToken> {
    try {
      const employee = await this.employeeRepository.getEmployeeByEmail(email);

      if (!employee) {
        throw new BadRequestException('Invalid email provided');
      }

      const isValidPassword = await this.argonService.comparePassword(
        password,
        employee.password,
      );

      console.log('match ', isValidPassword);
      if (!isValidPassword) {
        throw new BadRequestException('Invalid password provided');
      }

      const tokenPayload: IAuthUser = {
        id: employee.id,
        role: employee.role,
        email: employee.email,
      };
      const token = this.jwtTokenService.generateToken(tokenPayload);

      console.log(token);

      return {
        token,
      };
    } catch (error) {
      throw new BadRequestException('Error logging in employee');
    }
  }
}
