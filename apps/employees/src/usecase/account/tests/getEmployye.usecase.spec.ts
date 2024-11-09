import { NotFoundException } from '@nestjs/common';
import { GetEmployeeUseCase } from '../getEmployee.usecase';

const mockData = {
  employee: {
    id: '2cfdbefd-3ee2-4b23-99ae-ee65b1e3e0b8',
    email: 'admin@employManage.com',
    firstName: 'John',
    lastName: 'Doe',
    avatarUrl: 'example.com/avatar',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

const employeeRepositoryMock = {
  findOne: jest.fn().mockImplementation((query) => {
    if (query && query.where.id === mockData.employee.id) {
      return mockData.employee;
    }

    return null;
  }),
};

describe('GetEmployeeUseCase', () => {
  let getEmployeeUseCase: GetEmployeeUseCase;

  beforeEach(() => {
    getEmployeeUseCase = new GetEmployeeUseCase(employeeRepositoryMock as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user profile if user exists', async () => {
    const employeeId = mockData.employee.id;
    const employee = await getEmployeeUseCase.getProfile(employeeId);
    expect(employeeRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        id: employeeId,
      },
    });
    expect(employee).toEqual({
      id: mockData.employee.id,
      email: mockData.employee.email,
      lastName: mockData.employee.lastName,
      avatarUrl: mockData.employee.avatarUrl,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should throw error if user does not exist', async () => {
    const employeeId = '1cfdbefd-3ee2-4b23-99ae-ee65b1e3e0b8';
    await expect(getEmployeeUseCase.getProfile(employeeId)).rejects.toThrow(
      NotFoundException,
    );
    expect(employeeRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        id: employeeId,
      },
    });
  });
});
