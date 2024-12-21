import { Controller, Inject } from '@nestjs/common';
import { AttendanceGeneralUseCaseProxyModule } from '../usecase-proxy/attendance-general.usecase.proxy';
import { CreateAttendanceUseCase } from '../../usecases/createAttendance.usecase';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { HttpResponse } from '@app/common/infrastructure/helpers/response.helper';
import {
  CheckOutInput,
  CreateAttendanceInput,
} from '../common/schema/attendance.schema';
import { GetAllAttendanceUseCase } from '../../usecases/getAllAttendance.usecase';
import { UpdateAttendanceUseCase } from '../../usecases/updateAttendance.usecase';
import { FindAttendanceByIdUseCase } from '../../usecases/findAttendanceById.usecase';
import { GetAttendanceByEmployeeIdAndDateUseCase } from '../../usecases/getAttendanceByEmployeeIdAndDate.usecase';
import { GetAttendanceByEmployeeIdAndMonthAndYear } from '../../usecases/getAttendanceByEmployeeIdAndMonthAndYear.usecase';
import { GetAttendanceByEmployeeIdAndYear } from '../../usecases/getAttendanceByEmployeeIdAndYear.usecase';
import { GetAttendanceByDateRangeUseCase } from '../../usecases/getAttendanceByDateRange.usecase';
import { GetAttendanceByEmployeeIdUseCase } from '../../usecases/getAttendanceByEmployeeId.usecase';
import { GetAttendanceByEmployeeIdAndMonth } from '../../usecases/getAttendanceByEmployeeIdAndMonth.usecase';

@Controller()
export class AttendanceController {
  constructor(
    @Inject(
      AttendanceGeneralUseCaseProxyModule.CREATE_ATTENDANCE_USE_CASE_PROXY,
    )
    private readonly createAttendanceUseCase: UseCaseProxy<CreateAttendanceUseCase>,
    @Inject(
      AttendanceGeneralUseCaseProxyModule.GET_ALL_ATTENDANCES_USE_CASE_PROXY,
    )
    private readonly getAllAttendancesUseCase: UseCaseProxy<GetAllAttendanceUseCase>,
    @Inject(
      AttendanceGeneralUseCaseProxyModule.UPDATE_ATTENDANCE_USE_CASE_PROXY,
    )
    private readonly updateAttendanceUseCase: UseCaseProxy<UpdateAttendanceUseCase>,
    @Inject(
      AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_ID_USE_CASE_PROXY,
    )
    private readonly getAttendanceByIdUseCase: UseCaseProxy<FindAttendanceByIdUseCase>,
    @Inject(
      AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_MONTH,
    )
    private readonly getAttendanceByEmployeeIdAndMonth: UseCaseProxy<GetAttendanceByEmployeeIdAndMonth>,
    @Inject(
      AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_MONTH_AND_YEAR,
    )
    private readonly getAttendanceByEmployeeIdAndMonthAndYearUseCase: UseCaseProxy<GetAttendanceByEmployeeIdAndMonthAndYear>,
    @Inject(
      AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_YEAR,
    )
    private readonly getAttendanceByEmployeeIdAndYearUseCase: UseCaseProxy<GetAttendanceByEmployeeIdAndYear>,
    @Inject(
      AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_DATE_USE_CASE_PROXY,
    )
    private readonly getAttendanceByEmployeeIdAndDateUseCase: UseCaseProxy<GetAttendanceByEmployeeIdAndDateUseCase>,
    @Inject(
      AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_DATE_RANGE_USE_CASE_PROXY,
    )
    private readonly getAttendanceByDateRangeUseCase: UseCaseProxy<GetAttendanceByDateRangeUseCase>,
    @Inject(
      AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_USE_CASE_PROXY,
    )
    private readonly getAttendanceByEmployeeIdUseCase: UseCaseProxy<GetAttendanceByEmployeeIdUseCase>,
  ) {}

  @MessagePattern('createAttendance')
  async createAttendance(@Payload() data: CreateAttendanceInput) {
    const response = await this.createAttendanceUseCase
      .getInstance()
      .createAttendance(data);

    return HttpResponse.send('Attendance created', response);
  }

  @MessagePattern('getAllAttendances')
  async getAllAttendances() {
    const response = await this.getAllAttendancesUseCase
      .getInstance()
      .getAllAttendance();

    return HttpResponse.send('Attendance retrieved successfully', response);
  }

  @MessagePattern('checkout')
  async updateAttendance(@Payload() data: CheckOutInput) {
    const response = await this.updateAttendanceUseCase
      .getInstance()
      .updateAttendance(data.employeeId, data);

    return HttpResponse.send('Checkout successful', response);
  }

  @MessagePattern('getAttendanceById')
  async getAttendanceById(@Payload() data: { attendanceId: string }) {
    const response = await this.getAttendanceByIdUseCase
      .getInstance()
      .findById(data.attendanceId);

    return HttpResponse.send('Attendance record retrieved', response);
  }

  @MessagePattern('getAttendanceByEmployeeIdAndDate')
  async getAttendanceByEmployeeIdAndDate(
    @Payload() data: { employeeId: string; date: string },
  ) {
    const response = await this.getAttendanceByEmployeeIdAndDateUseCase
      .getInstance()
      .getAttendanceByEmployeeIdAndDate(data.employeeId, data.date);

    return HttpResponse.send('Attendance record retrieved', response);
  }

  @MessagePattern('getAttendanceByDateRange')
  async getAttendanceByDateRange(
    @Payload() data: { start: string; end: string },
  ) {
    console.log('data', data);

    const response = await this.getAttendanceByDateRangeUseCase
      .getInstance()
      .getAttendanceByDateRange(data.start, data.end);

    return HttpResponse.send('Attendance record retrieved', response);
  }

  @MessagePattern('getAttendanceByEmployeeId')
  async getAttendanceByEmployeeId(@Payload() data: { employeeId: string }) {
    const response = await this.getAttendanceByEmployeeIdUseCase
      .getInstance()
      .getAttendanceByEmployeeId(data.employeeId);

    return HttpResponse.send('Attendance record retrieved', response);
  }
}
