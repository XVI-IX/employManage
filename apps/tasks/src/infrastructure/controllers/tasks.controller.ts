import { Controller, Inject } from '@nestjs/common';
import { TasksGeneralUsecaseProxyModule } from '../usecase-proxy/tasksGeneral.usecase-proxy.module';
import { UseCaseProxy } from '@app/common/infrastructure/usecase-proxy/usecase-proxy';
import { CreateTaskUseCase } from '../../usecases/createTask.usecase';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskInput } from '../common/schemas/tasks.schema';
import { HttpResponse } from '@app/common/infrastructure/helpers/response.helper';

@Controller()
export class TasksController {
  constructor(@Inject(TasksGeneralUsecaseProxyModule.CREATE_TASK_USE_CASE_PROXY) private readonly createTaskUseCase: UseCaseProxy<CreateTaskUseCase>) {}

  @MessagePattern('createTask')
  async createTask(@Payload() data: CreateTaskInput ) {
    const task = await this.createTaskUseCase.getInstance().createTaskRepository(data);

    return HttpResponse.send('Task created', task);
  }

  
}
