export class DepartmentModel {
  id: string;
  name: string;
  parentId?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
