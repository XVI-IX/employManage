import { LoginUseCase } from '../loginEmployee.usecase';

const mockData = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  employee: {
    id: '2cfdbefd-3ee2-4b23-99ae-ee65b1e3e0b8',
    email: 'admin@employManage.com',
    password: 'password',
    hashedPassword: 'password',
  },
};

const jwtTokenServiceMock = {
  generateJwtToken: jest.fn().mockReturnValue(mockData.token),
};

const loggerServiceMock = {
  error: jest.fn().mockReturnValue('error'),
};

const employeeRepositoryMock = {
  getEmployeeByEmail: jest.fn().mockImplementation((email: string) => {
    if (email === mockData.employee.email) {
      return {
        id: mockData.employee.id,
        email: mockData.employee.email,
        password: mockData.employee.password,
      };
    }

    return null;
  }),
};

const argonServiceMock = {
  comparePassword: jest
    .fn()
    .mockImplementation((password: string, hash: string) => {
      return (
        password === mockData.employee.password &&
        hash === mockData.employee.hashedPassword
      );
    }),
};

describe('LoginEmployeeUseCase', () => {
  let loginEmployeeUseCase: LoginUseCase;

  beforeEach(() => {
    loginEmployeeUseCase = new LoginUseCase(
      employeeRepositoryMock as any,
      loggerServiceMock as any,
      jwtTokenServiceMock as any,
      argonServiceMock as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate JWT Token for valid credentials', async () => {
    const authToken = await loginEmployeeUseCase.loginWithPassword(
      mockData.employee.email,
      mockData.employee.password,
    );

    expect(authToken.token).toBe(mockData.token);
    expect(employeeRepositoryMock.getEmployeeByEmail).toHaveBeenCalledWith(
      mockData.employee.email,
    );
    expect(argonServiceMock.comparePassword).toHaveBeenCalledWith(
      mockData.employee.password,
      mockData.employee.hashedPassword,
    );
    expect(jwtTokenServiceMock.generateJwtToken).toHaveBeenCalledWith({
      id: mockData.employee.id,
    });
  });

  it('should throw error for invalid email', async () => {
    await expect(
      loginEmployeeUseCase.loginWithPassword(
        'random@gmail.com',
        mockData.employee.password,
      ),
    ).rejects.toThrow('Invalid Credentials');
  });

  it('should throw error for invalid password', async () => {
    await expect(
      loginEmployeeUseCase.loginWithPassword(
        mockData.employee.email,
        'wrongPAsaword',
      ),
    ).rejects.toThrow('Invalid credentials');
  });
});
