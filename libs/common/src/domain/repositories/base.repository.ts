import {
  IFindOneOptions,
  IFindOptions,
  IPaginateOptions,
  IPaginateResult,
} from '../adapters';

export interface IBaseRepository<T> {
  save?(entity: Partial<T>): Promise<T>;

  find?(options: IFindOptions<T>): Promise<T[]>;

  findOne?(query: IFindOneOptions<T>): Promise<T>;

  paginate?(
    option: IPaginateOptions,
    searchOptions?: IFindOptions<T>,
  ): Promise<IPaginateResult<T>>;

  delete?(id: string): Promise<string>;
  update?(id: string, entity: Partial<T>): Promise<T>;
}
