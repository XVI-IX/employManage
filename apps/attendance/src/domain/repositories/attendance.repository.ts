import { IBaseRepository } from '@app/common/domain/repositories';
import { AttendanceModel } from '../models';

export interface IAttendanceRepository
  extends IBaseRepository<AttendanceModel> {
  getAttendanceByEmployeeId(employeeId: string): Promise<AttendanceModel[]>;
  getAttendanceByDate(date: string): Promise<AttendanceModel | null>;
  getAttendanceByEmployeeIdAndDate(
    employeeId: string,
    date: string,
  ): Promise<AttendanceModel | null>;
  getAttendanceByEmployeeIdAndMonth(
    employeeId: string,
    month: string,
  ): Promise<AttendanceModel[]>;
  getAttendanceByEmployeeIdAndYear(
    employeeId: string,
    year: string,
  ): Promise<AttendanceModel[]>;
  getAttendanceByEmployeeIdAndMonthAndYear(
    employeeId: string,
    month: string,
    year: string,
  ): Promise<AttendanceModel[]>;
  getAttendanceByEmployeeIdAndDateRange(
    employeeId: string,
    startDate: string,
    endDate: string,
  ): Promise<AttendanceModel[]>;
}
