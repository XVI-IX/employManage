import { LoggerService } from '@app/common/infrastructure/logger/logger.service';
import { IEmployeeRepository } from '../../domain/repositories';
import { JwtTokenService } from '@app/common/infrastructure/services/jwt/jwt.service';
import { IArgonService } from '@app/common/domain/adapters/argon.interface';
import { IAuthToken } from 'apps/auth/src/domain/usecase/auth.interface';
import { BadRequestException } from '@nestjs/common';
import { IAuthUser } from '@app/common/infrastructure/decorators';

export class LoginUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly logger: LoggerService,
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

      if (!isValidPassword) {
        throw new BadRequestException('Invalid password provided');
      }

      const tokenPayload: IAuthUser = {
        id: employee.id,
        role: employee.role,
        email: employee.email,
      };
      const token = await this.jwtTokenService.generateToken(tokenPayload);

      return {
        token,
      };
    } catch (error) {
      this.logger.error('Error logging in employee', error.stack);
      throw new BadRequestException('Error logging in employee');
    }
  }
}
