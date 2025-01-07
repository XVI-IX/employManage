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

  async addProjectAssignee(
    projectId: string,
    assignee: string,
  ): Promise<ProjectAssigneesModel> {
    const builder: string = new QueryBuilder<ProjectAssigneesModel>()
      .into('project_assignees')
      .insert({
        projectId,
        employeeId: assignee,
      })
      .build();

    try {
      const response = await this.databaseService.query(builder);

      if (response.rowCount === 0) {
        throw new BadRequestException('Failed to add project assignee');
      }

      const getProjectAssignee = await this.databaseService.query(
        new QueryBuilder<ProjectAssigneesModel>()
          .select([])
          .from('project_assignees')
          .where({ projectId })
          .andWhere({ employeeId: assignee })
          .build(),
      );

      return this.transformQueryResultToProjectAssigneesModel(
        getProjectAssignee[0],
      );
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async removeProjectAssignee(
    projectId: string,
    assignee: string,
  ): Promise<ProjectAssigneesModel> {
    const builder: string = new QueryBuilder<ProjectAssigneesModel>()
      .from('project_assignees')
      .delete()
      .where({
        projectId,
        employeeId: assignee,
      })
      .build();
    try {
      const response = await this.databaseService.query(builder);

      if (response.rowCount === 0) {
        throw new BadRequestException('Failed to remove project assignee');
      }

      const getProjectAssignee = await this.databaseService.query(
        new QueryBuilder<ProjectAssigneesModel>()
          .select([])
          .from('project_assignees')
          .where({ projectId })
          .andWhere({ employeeId: assignee })
          .build(),
      );

      return this.transformQueryResultToProjectAssigneesModel(
        getProjectAssignee[0],
      );
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * @name getProjectsByDepartmentsId
   * @description Get project details by project id.
   *
   * @param departmentId Unique identifier of the department.
   * @returns project details of the department.
   */
  async getProjectsByDepartmentId(departmentId: string): Promise<ProjectModel> {
    const builder: string = new QueryBuilder<ProjectModel[]>()
      .select([])
      .from(this.collectionName)
      .where({
        departmentId: departmentId,
      })
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (result[0].length === 0) {
        throw new BadRequestException('No project found');
      }

      return this.transformQueryResultToProjectModelArray(result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * @name getAllProjectAssignees
   * @description Get all project assignees by project id.
   *
   * @param projectId unique identifier of the project.
   * @returns project details of the project.
   */
  async getAllProjectAssignees(
    projectId: string,
  ): Promise<ProjectAssigneesModel[]> {
    const builder: string = new QueryBuilder<ProjectAssigneesModel>()
      .select([])
      .from('project_assignees')
      .where({
        projectId,
      })
      .build();

    try {
      const result = await this.databaseService.query(builder);

      if (result[0].length === 0) {
        throw new BadRequestException('No project assignees found');
      }

      return this.transformQueryResultToProjectAssigneesModelArray(result[0]);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * @name getAllDueProjects
   * @description Get all due projects.
   *
   * @returns all due projects.
   *
   */
  async getAllDueProjects(): Promise<ProjectModel> {
    const builder: string = `SELECT * FROM ${this.collectionName} WHERE end_date < NOW() AND status = 'pending';`;

    try {
      const result = await this.databaseService.query(builder);

      if (result[0].length === 0) {
        throw new BadRequestException('No project found');
      }

      return this.transformQueryResultToProjectModel(result[0]);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * @name getAllPendingProjects
   * @description Get all pending projects.
   *
   * @returns all pending projects.
   */
  async getAllPendingProjects(): Promise<ProjectModel> {
    const builder = new QueryBuilder<ProjectModel>()
      .from(this.collectionName)
      .select([])
      .where({
        status: 'pending',
      })
      .build();

    try {
      const results = await this.databaseService.query(builder);

      if (results[0].length === 0) {
        throw new BadRequestException('No pending project found');
      }

      return this.transformQueryResultToProjectModel(results[0]);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * @name getAllCompletedProjects
   * @description Get all completed projects.
   *
   * @returns all completed projects.
   */
  async getAllCompletedProjects(): Promise<ProjectModel> {
    const builder: string = new QueryBuilder<ProjectModel>()
      .select([])
      .from(this.collectionName)
      .where({
        status: 'completed',
      })
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (result[0].length === 0) {
        throw new BadRequestException('No project found');
      }

      return this.transformQueryResultToProjectModel(result[0]);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * @name getAllSupervisorProjects
   * @description Get all projects assigned to the supervisor.
   *
   * @param supervisorId unique employee id of the supervisor
   * @returns all projects assigned to the supervisor
   */
  async getAllSupervisorProjects(supervisorId: string): Promise<ProjectModel> {
    const builder: string = new QueryBuilder<ProjectModel>()
      .select([])
      .from(this.collectionName)
      .where({
        supervisorId,
      })
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (result[0].length === 0) {
        throw new BadRequestException('No project found');
      }

      return this.transformQueryResultToProjectModel(result[0]);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * @name getProjectById
   * @description Get project details by project id.
   *
   * @param options options to find projects by.
   * @returns project details of the project.
   */
  async find?(options: IFindOptions<ProjectModel>): Promise<ProjectModel[]> {
    const builder: string = new QueryBuilder<ProjectModel>()
      .select([])
      .from(this.collectionName)
      .where(options.where)
      .orderBy(options.orderBy as keyof ProjectModel)
      .limit(options.take)
      .build();
    try {
      const response = await this.databaseService.query(builder);

      if (!response) {
        throw new BadRequestException('Projects could not be retrieved');
      }

      return this.transformQueryResultToProjectModelArray(response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findOne?(query: IFindOneOptions<ProjectModel>): Promise<ProjectModel> {
    const builder: string = new QueryBuilder<ProjectModel>()
      .select([])
      .from(this.collectionName)
      .where(query.where)
      .orderBy('createdAt', 'DESC')
      .limit(1)
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (result[0].length === 0) {
        return null;
      }

      return this.transformQueryResultToProjectModel(result[0]);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  paginate?(
    options: IPaginateOptions,
    searchOptions?: IFindOptions<ProjectModel>,
  ): Promise<IPaginateResult<ProjectModel>> {
    throw new Error('Method not implemented.');
  }

  async delete?(id: string): Promise<string> {
    const builder: string = new QueryBuilder<ProjectModel>()
      .from(this.collectionName)
      .delete()
      .where({
        id,
      })
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (result.rowCount === 0) {
        throw new BadRequestException('Failed to delete project');
      }

      return 'Project deleted successfully';
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async update?(
    id: string,
    entity: Partial<ProjectModel>,
  ): Promise<ProjectModel> {
    const builder: string = new QueryBuilder<ProjectModel>()
      .from(this.collectionName)
      .update(entity)
      .where({
        id,
      })
      .build();
    try {
      const result = await this.databaseService.query(builder);

      if (result.rowCount === 0) {
        throw new BadRequestException('Failed to update project');
      }

      const getProject = await this.findOne({
        where: {
          id,
        },
      });

      return this.transformQueryResultToProjectModel(getProject);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async save(entity: Partial<CreateProjectInput>): Promise<ProjectModel> {
    const builder: string = new QueryBuilder<ProjectModel>()
      .into(this.collectionName)
      .insert(entity)
      .build();

    const checkProjectExistsQuery: string = new QueryBuilder<ProjectModel>()
      .select([])
      .from(this.collectionName)
      .where({
        name: entity.name,
      })
      .andWhere({
        departmentId: entity.departmentId,
      })
      .build();

    try {
      const checkProjectExists = await this.databaseService.query(
        checkProjectExistsQuery,
      );

      if (checkProjectExists.length > 0) {
        throw new ConflictException('Project already exists');
      }

      const result = await this.databaseService.query(builder);

      if (!result) {
        throw new BadRequestException('Failed to create project');
      }

      const getProject = await this.findOne({
        where: {
          name: entity.name,
          departmentId: entity.departmentId,
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
