import { UpdateEmployeeInput } from 'apps/employees/src/infrastructure/common/schemas/account.schema';
import { UpdateEmployeeUseCase } from '../updateEmployee.usecase';
import { NotFoundException } from '@nestjs/common';

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
  update: {
    id: '2cfdbefd-3ee2-4b23-99ae-ee65b1e3e0b8',
    email: 'admin@employManage.com',
    firstName: 'Solape',
    lastName: 'Akinlaja',
    avatarUrl: 'example.com/avatar',
    jobTitle: 'manager',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

const employeeRepositoryMock = {
  findOne: jest.fn().mockImplementation((query) => {
    if (query.where.id === mockData.employee.id) {
      return mockData.employee;
    }

    return null;
  }),

  update: jest.fn().mockImplementation((data) => {
    return mockData.update;
  }),
};

describe('UpdateEmployeeUseCase', () => {
  let updateEmployeeUseCase: UpdateEmployeeUseCase;

  beforeEach(() => {
    updateEmployeeUseCase = new UpdateEmployeeUseCase(
      employeeRepositoryMock as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update employee and return updated employee', async () => {
    const employeeId = mockData.employee.id;
    const updateData: UpdateEmployeeInput = {
      firstName: mockData.update.firstName,
      lastName: mockData.update.lastName,
      avatarUrl: mockData.update.avatarUrl,
      email: mockData.update?.email,
      jobTitle: mockData.update.jobTitle,
    };

    const updateEmployeeProfile = await updateEmployeeUseCase.updateEmployee(
      employeeId,
      updateData,
    );

    expect(employeeRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        id: employeeId,
      },
    });
    expect(updateEmployeeProfile).toEqual({
      id: mockData.update.id,
      email: mockData.update.email,
      firstName: mockData.update.firstName,
      lastName: mockData.update.lastName,
      avatarUrl: mockData.update.avatarUrl,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should throw error if employee does not exist', async () => {
    const employeeId = 'qnejnwfjrnknrerl';
    const updateData: UpdateEmployeeInput = {
      firstName: mockData.update.firstName,
      lastName: mockData.update.lastName,
      avatarUrl: mockData.update.avatarUrl,
      email: mockData.update?.email,
      jobTitle: mockData.update.jobTitle,
    };

    await expect(
      updateEmployeeUseCase.updateEmployee(employeeId, updateData),
    ).rejects.toThrow(NotFoundException);

    expect(employeeRepositoryMock.findOne).toHaveBeenCalledWith({
      where: {
        id: employeeId,
      },
    });
    expect(employeeRepositoryMock.update).not.toHaveBeenCalled();
  });
});
