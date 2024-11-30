import { IArgonService } from '@app/common/domain/adapters/argon.interface';
import { IEmployeeRepository } from '../../domain/repositories';
import { IJwtService } from '@app/common/domain/adapters/jwt.interface';
import { RegisterEmployeeInput } from '../../infrastructure/common/schemas/auth.schema';
import { IAuthToken } from 'apps/auth/src/domain/usecase/auth.interface';
import { ConflictException } from '@nestjs/common';

export class RegisterEmployeeUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly argonService: IArgonService,
    private readonly jwtTokenService: IJwtService,
  ) {}

  /**
   * @name registerEmployee
   * @description register employee
   *
   * @param input object representing employee data
   * @returns {IAuthToken} JWT token for authorization
   */
  async registerEmployee(input: RegisterEmployeeInput): Promise<IAuthToken> {
    const employee = await this.employeeRepository.getEmployeeByEmail(
      input.email,
    );

    if (employee) {
      throw new ConflictException('Employee already exists');
    }

    const hashedPassword = await this.argonService.hashPassword(input.password);
    const newEmployee = await this.employeeRepository.save({
      email: input.email,
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
      avatarUrl: input.avatarUrl,
      phone: input.phone,
      hireDate: new Date(input.hireDate),
      jobTitle: input.jobTitle,
    });

    const token = this.jwtTokenService.generateToken({
      id: newEmployee.id,
      role: newEmployee.role,
    });

    return {
      token,
    };
  }
}
