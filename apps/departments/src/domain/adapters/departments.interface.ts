import { IBase } from '@app/common/domain/adapters';

export interface IDeparment extends IBase {
  name: string;
  parentId: string;
}
