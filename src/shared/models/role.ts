import { PermissionKey } from './permission-key';

export type Role = {
  id: string;
  name: string;
  super: boolean;
  required: boolean;
  permissions: PermissionKey[];
};

export type AuthRole = Pick<Role, 'id' | 'name' | 'required' | 'super' | 'permissions'>;
