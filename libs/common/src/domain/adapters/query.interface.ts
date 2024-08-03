export interface IFindOptions<T> {
  where?: Partial<T>;
  orderBy?: string;
  skip?: number;
  take?: number;
}

export interface IFindOneOptions<T> {
  where: Partial<T>;
}
