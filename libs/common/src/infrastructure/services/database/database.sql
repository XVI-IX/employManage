CREATE DATABASE IF NOT EXISTS employManage;

USE employManage;

CREATE TABLE Employees (
  id VARCHAR(36) DEFAULT (uuid()) PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  hireDate DATE NOT NULL,
  avatarUrl VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  departmentId VARCHAR(36),
  role VARCHAR(50) NOT NULL DEFAULT 'employee',
  resetPasswordToken VARCHAR(255),
  resetPasswordExpires TIMESTAMP,
  refreshToken VARCHAR(255),
  jobTitle VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Departments (
  id VARCHAR(36) DEFAULT (uuid()) PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  parentId VARCHAR(36) DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE Attendance (
  id VARCHAR(36) DEFAULT (uuid()) PRIMARY KEY,
  employeeId VARCHAR(36) NOT NULL,
  date DATE NOT NULL,
  checkIn TIME DEFAULT (CURRENT_TIME),
  checkOut TIME,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (employeeId) REFERENCES Employees(id),
  CONSTRAINT check_in_before_check_out CHECK (checkIn < checkOut)
);

CREATE TABLE Projects (
  id VARCHAR(36) DEFAULT (uuid()) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  departmentId VARCHAR(36) NOT NULL,
  supervisorId VARCHAR(36) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (departmentId) REFERENCES Departments(id),
  FOREIGN KEY (supervisorId) REFERENCES Employees(id)
);

CREATE TABLE PROJECT_ASSIGNEES (
  id VARCHAR(36) DEFAULT (uuid()) PRIMARY KEY,
  projectId VARCHAR(36) NOT NULL,
  employeeId VARCHAR(36) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (projectId) REFERENCES Projects(id),
  FOREIGN KEY (employeeId) REFERENCES Employees(id)
);

CREATE TABLE TASKS (
  id VARCHAR(36) DEFAULT (uuid()) PRIMARY KEY,
  projectId VARCHAR(36) NOT NULL,
  employeeId VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',

  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,


  FOREIGN KEY (projectId) REFERENCES Projects(id),
  FOREIGN KEY (employeeId) REFERENCES Employees(id)

)

CREATE TABLE Notifications (
  id VARCHAR(36) DEFAULT (uuid()) PRIMARY KEY,
  title VARCHAR(255),
  content TEXT(1024),
  employeeId VARCHAR(36),
  isRead BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (employeeId) REFERENCES Employees(id)
)

ALTER TABLE Projects ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'pending';

  -- FOREIGN KEY (departmentId) REFERENCES Department(id)