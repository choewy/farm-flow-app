import { ListResponse } from '@app/shared/api';
import { PermissionKey, Role, RoleUser } from '@app/shared/models';

export type RoleListResponse = ListResponse<Role>;

export type RoleDetailsResponse = {
  role: Role;
  user: RoleUser;
};

export type RoleCreateRequestData = {
  name: string;
  permissionKeys: PermissionKey[];
};

export type RoleCreateResponse = {
  id: string;
};

export type RoleUpdateRequestData = {
  name: string;
  permissionKeys: PermissionKey[];
};
