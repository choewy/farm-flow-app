import { ListResponse } from '@app/shared/api';
import { Role, RoleUser } from '@app/shared/models';

export type RoleListResponse = ListResponse<Role>;

export type RoleDetailsResponse = {
  role: Role;
  user: RoleUser;
};

export type RoleCreateRequestData = {
  name: string;
  permissions: string[];
};

export type RoleCreateResponse = {
  id: string;
};

export type RoleUpdateRequestData = {
  name: string;
  permissions: string[];
};
