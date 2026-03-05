import { RoleCreateRequestData, RoleCreateResponse, RoleDetailsResponse, RoleListResponse, RoleUpdateRequestData } from './role.type';

import { http } from '@app/shared/api';

const list = () => http.get<RoleListResponse>('roles');
const create = (data: RoleCreateRequestData) => http.post<RoleCreateResponse>('roles', data);
const details = (id: string) => http.get<RoleDetailsResponse>(`roles/${id}`);
const update = (id: string, data: RoleUpdateRequestData) => http.patch<void>(`roles/${id}`, data);
const remove = (id: string) => http.delete<void>(`roles/${id}`);

export const roleApi = {
  list,
  create,
  details,
  update,
  remove,
};
