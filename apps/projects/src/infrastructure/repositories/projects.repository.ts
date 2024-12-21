import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { IProjectRepository } from '../../domain/repositories';
import { DatabaseService } from '@app/common/infrastructure/services/database/database.service';
import { ProjectAssigneesModel, ProjectModel } from '../../domain/model';
import {
  IFindOptions,
  IFindOneOptions,
  IPaginateOptions,
  IPaginateResult,
} from '@app/common/domain/adapters';
import { CreateProjectInput } from '../common/schemas/createProjectInput.schema';
import { QueryBuilder } from '@app/common/infrastructure/services/database/database.query.builder';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  private readonly collectionName: string;
  private readonly logger: Logger;

  constructor(private readonly databaseService: DatabaseService) {
    this.collectionName = 'projects';
    this.logger = new Logger(ProjectRepository.name);
  }
  getProjectsByDepartmentId(departmentId: string): Promise<ProjectModel> {
    throw new Error('Method not implemented.');
  }
  getAllProjectAssignees(projectId: string): Promise<ProjectModel> {
    throw new Error('Method not implemented.');
  }
  getAllDueProjects(): Promise<ProjectModel> {
    throw new Error('Method not implemented.');
  }
  getAllPendingProjects(): Promise<ProjectModel> {
    throw new Error('Method not implemented.');
  }
  getAllCompletedProjects(): Promise<ProjectModel> {
    throw new Error('Method not implemented.');
  }
  getAllSupervisorProjects(supervisorId: string): Promise<ProjectModel> {
    throw new Error('Method not implemented.');
  }
  find?(options: IFindOptions<ProjectModel>): Promise<ProjectModel[]> {
    throw new Error('Method not implemented.');
  }
  findOne?(query: IFindOneOptions<ProjectModel>): Promise<ProjectModel> {
    throw new Error('Method not implemented.');
  }
  paginate?(
    options: IPaginateOptions,
    searchOptions?: IFindOptions<ProjectModel>,
  ): Promise<IPaginateResult<ProjectModel>> {
    throw new Error('Method not implemented.');
  }
  delete?(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  update?(id: string, entity: Partial<ProjectModel>): Promise<ProjectModel> {
    throw new Error('Method not implemented.');
  }

  async save(entity: Partial<CreateProjectInput>): Promise<ProjectModel> {
    const builder: string = new QueryBuilder<ProjectModel>()
      .into(this.collectionName)
      .insert(entity)
      .build();

    try {
      const checkProjectExists = await this.findOne({
        where: {
          name: entity.name,
          departmentId: entity.departmentId,
        },
      });

      if (checkProjectExists) {
        throw new ConflictException('Project already exists');
      }

      const result = await this.databaseService.query(builder);

      if (result.rowCount === 0) {
        throw new BadRequestException('Failed to create project');
      }

      const getProject = await this.findOne({
        where: {
          id: result.rows[0].id,
        },
      });

      return this.transformQueryResultToProjectModel(getProject);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  private transformQueryResultToProjectModel(row: any): ProjectModel {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      startDate: row.startDate,
      endDate: row.endDate,
      departmentId: row.departmentId,
      supervisorId: row.supervisorId,
      status: row.status,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  private transformQueryResultToProjectAssigneesModel(
    row: any,
  ): ProjectAssigneesModel {
    return {
      id: row.id,
      projectId: row.projectId,
      employeeId: row.employeeId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  private transformQueryResultToProjectModelArray(rows: any[]): ProjectModel[] {
    return rows.map((row) => {
      return this.transformQueryResultToProjectModel(row);
    });
  }

  private transformQueryResultToProjectAssigneesModelArray(
    rows: any[],
  ): ProjectAssigneesModel[] {
    return rows.map((row) => {
      return this.transformQueryResultToProjectAssigneesModel(row);
    });
  }
}
