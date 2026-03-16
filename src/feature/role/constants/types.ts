import { PermissionKey } from '@app/shared/models';

export type PermissionGroup = {
  title: string;
  keys: PermissionKey[];
};
