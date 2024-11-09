import { BadRequestException } from '@nestjs/common';
import { RegisterEmployeeUseCase } from '../registerEmployee.usecase';

const mockData = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\n',
  employee: {
    id: '2cfdbefd-3ee2-4b23-99ae-ee65b1e3e0b8',
    email: 'admin@employManage.com',
    password: 'password',
    hashedPassword: 'password',
    firstName: 'Admin',
    lastName: 'Admin',
    phone: '1234567890',
    hireDate: '2021-10-10',
    jobTitle: 'Admin',
    role: 'Admin',
    avatarUrl: 'https://www.google.com',
  },
};

const employeeRepositoryMock = {
  getEmployeeByEmail: jest.fn().mockReturnValue(null),
  save: jest.fn().mockImplementation((employee) => ({
    ...employee,
    id: mockData.employee.id,
  })),
};

const jwtServiceMock = {
  generateToken: jest.fn().mockReturnValue(mockData.token),
};

const argonServiceMock = {
  hashPassword: jest.fn().mockReturnValue(mockData.employee.hashedPassword),
};

describe('RegisterEmployeeUseCase', () => {
  let registerEmployeeUseCase: RegisterEmployeeUseCase;

  beforeEach(() => {
    registerEmployeeUseCase = new RegisterEmployeeUseCase(
      employeeRepositoryMock as any,
      jwtServiceMock as any,
      argonServiceMock as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new employee and generate JWT token', async () => {
    const registerInput = {
      email: mockData.employee.email,
      password: mockData.employee.password,
      firstName: mockData.employee.firstName,
      lastName: mockData.employee.lastName,
      avatarUrl: mockData.employee.avatarUrl,
      hireDate: mockData.employee.hireDate,
      phone: mockData.employee.phone,
      jobTitle: mockData.employee.jobTitle,
    };
    const authToken =
      await registerEmployeeUseCase.registerEmployee(registerInput);
    expect(authToken.token).toBe(mockData.token);
    expect(employeeRepositoryMock.getEmployeeByEmail).toHaveBeenCalledWith(
      mockData.employee.email,
    );
    expect(argonServiceMock.hashPassword).toHaveBeenCalledWith(
      mockData.employee.password,
    );
    expect(jwtServiceMock.generateToken).toHaveBeenCalledWith({
      id: mockData.employee.id,
    });
  });

  it('should throw BadRequestException if employee already exists', async () => {
    employeeRepositoryMock.getEmployeeByEmail.mockReturnValueOnce({});
    const registerInput = {
      email: mockData.employee.email,
      password: mockData.employee.password,
      firstName: mockData.employee.firstName,
      lastName: mockData.employee.lastName,
      avatarUrl: mockData.employee.avatarUrl,
      jobTitle: mockData.employee.jobTitle,
      phone: mockData.employee.phone,
      hireDate: mockData.employee.hireDate,
    };

    await expect(
      registerEmployeeUseCase.registerEmployee(registerInput),
    ).rejects.toThrow(BadRequestException);
    expect(employeeRepositoryMock.getEmployeeByEmail).toHaveBeenCalledWith(
      mockData.employee.email,
    );
    expect(argonServiceMock.hashPassword).not.toHaveBeenCalled();
    expect(employeeRepositoryMock.save).not.toHaveBeenCalled();
    expect(jwtServiceMock.generateToken).not.toHaveBeenCalled();
  });
});
