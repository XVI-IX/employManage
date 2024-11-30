import { IArgonService } from '@app/common/domain/adapters/argon.interface';
import { IEmployeeRepository } from '../../domain/repositories';
import { BadRequestException } from '@nestjs/common';

export class ResetPasswordEmployeeUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly argonService: IArgonService,
  ) {}

  async resetPassword(token: string, newPassword: string) {
    const employee = await this.employeeRepository.findOne({
      where: {
        resetPasswordToken: token,
      },
    });

    if (!employee) {
      throw new BadRequestException('Invalid token');
    }

    if (employee.resetPasswordExpires < new Date()) {
      throw new BadRequestException('Token expired');
    }

    const hashedPassword = await this.argonService.hashPassword(newPassword);

    await this.employeeRepository.update(employee.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return {
      message: 'Password reset successfully',
    };
  }
}
