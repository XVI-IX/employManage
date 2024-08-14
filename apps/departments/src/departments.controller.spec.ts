import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

describe('DepartmentsController', () => {
  let departmentsController: DepartmentsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [DepartmentsService],
    }).compile();

    departmentsController = app.get<DepartmentsController>(
      DepartmentsController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(departmentsController.getHello()).toBe('Hello World!');
    });
  });
});
