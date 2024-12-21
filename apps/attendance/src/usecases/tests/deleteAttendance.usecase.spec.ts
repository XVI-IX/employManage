import { DeleteAttendanceUseCase } from '../deleteAttendance.usecase';

const attendanceRepositoryMock = {
  delete: jest.fn().mockReturnValue({}),
};

describe('DeleteAttendanceUseCase', () => {
  let deleteAttendanceUseCase: DeleteAttendanceUseCase;

  beforeEach(() => {
    deleteAttendanceUseCase = new DeleteAttendanceUseCase(
      attendanceRepositoryMock as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete an attendance record', async () => {
    const attendanceId = '2cfdbefd-3ee2-4b23-99ae-ee65b1e3e0b8';

    await deleteAttendanceUseCase.deleteRepository(attendanceId);

    expect(attendanceRepositoryMock.delete).toHaveBeenCalledWith(attendanceId);
  });
});
