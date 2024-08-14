CREATE TABLE Employee (
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
  jobTitle VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

  -- FOREIGN KEY (departmentId) REFERENCES Department(id)