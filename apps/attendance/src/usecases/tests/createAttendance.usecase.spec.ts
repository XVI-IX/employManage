import { BadRequestException } from '@nestjs/common';
import { CreateAttendanceUseCase } from '../createAttendance.usecase';

const mockData = {
  attendance: {
    id: '2cfdbefd-3ee2-4b23-99ae-ee65b1e3e0b8',
    employeeId: '2cfdbefd-3ee2-4b23-99ae-ee65b1e3e0b8',
    date: '2021-10-10',
    checkIn: '2021-10-10T08:00:00.000Z',
    checkOut: '2021-10-10T17:00:00.000Z',
  },
};

const attendanceRepositoryMock = {
  save: jest.fn().mockImplementation((attendance) => ({
    ...attendance,
    id: mockData.attendance.id,
  })),
};

describe('CreateAttendanceUseCase', () => {
  let createAttendanceUseCase: CreateAttendanceUseCase;

  beforeEach(() => {
    createAttendanceUseCase = new CreateAttendanceUseCase(
      attendanceRepositoryMock as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new attendance', async () => {
    const createAttendanceInput = {
      employeeId: mockData.attendance.employeeId,
      date: mockData.attendance.date,
    };

    const result = await createAttendanceUseCase.createAttendance(
      createAttendanceInput,
    );

    expect(result.id).toBe(mockData.attendance.id);
    expect(result.employeeId).toBe(mockData.attendance.employeeId);
    expect(result.date).toBe(mockData.attendance.date);
    expect(result.checkIn).toBeTruthy();
  });

  it('should not create a new attendance if attendance already exists', async () => {
    attendanceRepositoryMock.save.mockReturnValueOnce({});
    const createAttendanceInput = {
      employeeId: mockData.attendance.employeeId,
      date: mockData.attendance.date,
    };

    await expect(
      createAttendanceUseCase.createAttendance(createAttendanceInput),
    ).rejects.toThrow(BadRequestException);
    expect(attendanceRepositoryMock.save).not.toHaveBeenCalled();
  });
});
