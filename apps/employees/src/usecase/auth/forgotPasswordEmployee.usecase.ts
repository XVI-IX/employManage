import { NotFoundException } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories';
import { ITokenHelper } from '@app/common/domain/helpers/token/token.helper';

export class ForgotPasswordEmployeeUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly tokenHelper: ITokenHelper,
  ) {}

  async forgotPassword(email: string): Promise<any> {
    const employee = await this.employeeRepository.getEmployeeByEmail(email);

    if (!employee) {
      throw new NotFoundException('Employee with email address not found');
    }

    const resetToken = this.tokenHelper.generateResetPasswordToken();

    await this.employeeRepository.update(employee.id, {
      refreshTokenExpires: new Date(Date.now() + 3600000),
      resetPasswordToken: resetToken,
    });

    // send email with reset token

    return {
      resetToken,
    };
  }
}
