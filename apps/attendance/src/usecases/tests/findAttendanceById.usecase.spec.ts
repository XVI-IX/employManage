import { FindAttendanceByIdUseCase } from '../findAttendanceById.usecase';

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
  findById: jest.fn().mockReturnValue(mockData.attendance),
};

describe('FindAttendanceByIdUseCase', () => {
  let findAttendanceByIdUsecase: FindAttendanceByIdUseCase;

  beforeEach(() => {
    findAttendanceByIdUsecase = new FindAttendanceByIdUseCase(
      attendanceRepositoryMock as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find an attendance record by id', async () => {
    const attendanceId = mockData.attendance.id;

    const result = await findAttendanceByIdUsecase.findById(attendanceId);

    expect(result.id).toBe(mockData.attendance.id);
    expect(result.employeeId).toBe(mockData.attendance.employeeId);
    expect(result.date).toBe(mockData.attendance.date);
    expect(result.checkIn).toBe(mockData.attendance.checkIn);
  });
});
