import { DatabaseModule } from '@app/common/infrastructure/services/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
import { AttendanceRepositoryModule } from '../repositories/attendance.repository.module';
import { AttendanceRepository } from '../repositories/attendance.repository';
import { CreateAttendanceUseCase } from '../../usecases/createAttendance.usecase';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { FindAttendanceByIdUseCase } from '../../usecases/findAttendanceById.usecase';
import { UpdateAttendanceUseCase } from '../../usecases/updateAttendance.usecase';
import { GetAttendanceByEmployeeIdAndMonth } from '../../usecases/getAttendanceByEmployeeIdAndMonth.usecase';
import { GetAttendanceByEmployeeIdAndMonthAndYear } from '../../usecases/getAttendanceByEmployeeIdAndMonthAndYear.usecase';
import { GetAttendanceByEmployeeIdAndYear } from '../../usecases/getAttendanceByEmployeeIdAndYear.usecase';
import { GetAttendanceByEmployeeIdAndDateRangeUseCase } from '../../usecases/getAttendanceByEmployeeIdAndDateRange.usecase';
import { GetAttendanceByDateRangeUseCase } from '../../usecases/getAttendanceByDateRange.usecase';
import { GetAllAttendanceUseCase } from '../../usecases/getAllAttendance.usecase';

@Module({
  imports: [DatabaseModule, AttendanceRepositoryModule],
})
export class AttendanceGeneralUseCaseProxyModule {
  static CREATE_ATTENDANCE_USE_CASE_PROXY = 'CREATE_ATTENDANCE_USE_CASE_PROXY';
  static GET_ATTENDANCE_BY_ID_USE_CASE_PROXY =
    'GET_ATTENDANCE_BY_ID_USE_CASE_PROXY';
  static UPDATE_ATTENDANCE_USE_CASE_PROXY = 'UPDATE_ATTENDANCE_USE_CASE_PROXY';
  static DELETE_ATTENDANCE_USE_CASE_PROXY = 'DELETE_ATTENDANCE_USE_CASE_PROXY';
  static GET_ALL_ATTENDANCES_USE_CASE_PROXY =
    'GET_ALL_ATTENDANCES_USE_CASE_PROXY';
  static GET_ATTENDANCE_BY_EMPLOYEE_ID_USE_CASE_PROXY =
    'GET_ATTENDANCE_BY_EMPLOYEE_ID_USE_CASE_PROXY';
  static GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_MONTH =
    'GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_MONTH';
  static GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_YEAR =
    'GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_YEAR';
  static GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_DATE_RANGE =
    'GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_DATE_RANGE';
  static GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_MONTH_AND_YEAR =
    'GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_MONTH_AND_YEAR';
  static GET_ATTENDANCE_BY_DATE_RANGE_USE_CASE_PROXY =
    'GET_ATTENDANCE_BY_DATE_RANGE_USE_CASE_PROXY';

  static register(): DynamicModule {
    return {
      module: AttendanceGeneralUseCaseProxyModule,
      providers: [
        {
          inject: [AttendanceRepository],
          provide:
            AttendanceGeneralUseCaseProxyModule.CREATE_ATTENDANCE_USE_CASE_PROXY,
          useFactory: (attendanceRepository: AttendanceRepository) =>
            new UseCaseProxy(new CreateAttendanceUseCase(attendanceRepository)),
        },
        {
          inject: [AttendanceRepository],
          provide:
            AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_ID_USE_CASE_PROXY,
          useFactory: (attendanceRepository: AttendanceRepository) =>
            new UseCaseProxy(
              new FindAttendanceByIdUseCase(attendanceRepository),
            ),
        },
        {
          inject: [AttendanceRepository],
          provide:
            AttendanceGeneralUseCaseProxyModule.UPDATE_ATTENDANCE_USE_CASE_PROXY,
          useFactory: (attendanceRepository: AttendanceRepository) =>
            new UseCaseProxy(new UpdateAttendanceUseCase(attendanceRepository)),
        },
        {
          inject: [AttendanceRepository],
          provide:
            AttendanceGeneralUseCaseProxyModule.DELETE_ATTENDANCE_USE_CASE_PROXY,
          useFactory: (attendanceRepository: AttendanceRepository) =>
            new UseCaseProxy(new UpdateAttendanceUseCase(attendanceRepository)),
        },
        {
          inject: [AttendanceRepository],
          provide:
            AttendanceGeneralUseCaseProxyModule.GET_ALL_ATTENDANCES_USE_CASE_PROXY,
          useFactory: (attendanceRepository: AttendanceRepository) =>
            new UseCaseProxy(new GetAllAttendanceUseCase(attendanceRepository)),
        },
        {
          inject: [AttendanceRepository],
          provide:
            AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_USE_CASE_PROXY,
          useFactory: (attendanceRepository: AttendanceRepository) =>
            new UseCaseProxy(new UpdateAttendanceUseCase(attendanceRepository)),
        },
        {
          inject: [AttendanceRepository],
          provide:
            AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_MONTH,
          useFactory: (attendanceRepository: AttendanceRepository) =>
            new UseCaseProxy(
              new GetAttendanceByEmployeeIdAndMonth(attendanceRepository),
            ),
        },
        {
          inject: [AttendanceRepository],
          provide:
            AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_MONTH_AND_YEAR,
          useFactory: (attendanceRepository: AttendanceRepository) =>
            new UseCaseProxy(
              new GetAttendanceByEmployeeIdAndMonthAndYear(
                attendanceRepository,
              ),
            ),
        },
        {
          inject: [AttendanceRepository],
          provide:
            AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_YEAR,
          useFactory: (attendanceRepository: AttendanceRepository) =>
            new UseCaseProxy(
              new GetAttendanceByEmployeeIdAndYear(attendanceRepository),
            ),
        },
        {
          inject: [AttendanceRepository],
          provide:
            AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_DATE_RANGE,
          useFactory: (attendanceRepository: AttendanceRepository) =>
            new UseCaseProxy(
              new GetAttendanceByEmployeeIdAndDateRangeUseCase(
                attendanceRepository,
              ),
            ),
        },
        {
          inject: [AttendanceRepository],
          provide:
            AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_DATE_RANGE_USE_CASE_PROXY,
          useFactory: (attendanceRepository: AttendanceRepository) =>
            new UseCaseProxy(
              new GetAttendanceByDateRangeUseCase(attendanceRepository),
            ),
        },
      ],
      exports: [
        AttendanceGeneralUseCaseProxyModule.CREATE_ATTENDANCE_USE_CASE_PROXY,
        AttendanceGeneralUseCaseProxyModule.DELETE_ATTENDANCE_USE_CASE_PROXY,
        AttendanceGeneralUseCaseProxyModule.GET_ALL_ATTENDANCES_USE_CASE_PROXY,
        AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_DATE_RANGE_USE_CASE_PROXY,
        AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_DATE_RANGE,
        AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_MONTH,
        AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_MONTH_AND_YEAR,
        AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_YEAR,
        AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_ID_USE_CASE_PROXY,
        AttendanceGeneralUseCaseProxyModule.UPDATE_ATTENDANCE_USE_CASE_PROXY,
        AttendanceGeneralUseCaseProxyModule.GET_ATTENDANCE_BY_EMPLOYEE_ID_AND_MONTH_AND_YEAR,
      ],
    };
  }
}
