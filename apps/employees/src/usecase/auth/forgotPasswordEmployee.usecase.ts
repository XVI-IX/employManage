import { NotFoundException } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories';
import { ITokenHelper } from '@app/common/domain/helpers/token/token.helper';
import * as moment from 'moment';

export class ForgotPasswordEmployeeUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly tokenHelper: ITokenHelper,
  ) {}

  async forgotPassword(email: string): Promise<unknown> {
    const employee = await this.employeeRepository.getEmployeeByEmail(email);

    if (!employee) {
      throw new NotFoundException('Employee with email address not found');
    }

    const resetToken = this.tokenHelper.generateResetPasswordToken();

    await this.employeeRepository.update(employee.id, {
      resetPasswordExpires: moment().utc().format('YYYY-MM-DD HH:mm:ss.SSS'),
      resetPasswordToken: resetToken,
    });

    console.log('Reset token:', resetToken);

    // send email with reset token

    return {
      message: 'Reset password email sent',
    };
  }
}
