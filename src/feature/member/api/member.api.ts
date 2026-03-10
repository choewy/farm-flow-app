import { MemberListResponse } from './member.types';

import { http } from '@app/shared/api';

const list = () => http.get<MemberListResponse>('members');
const update = (id: string, roleId: string) => http.patch<void>(`members/${id}`, { roleId });
const remove = (id: string) => http.delete<void>(`members/${id}`);

export const memberApi = {
  list,
  update,
  remove,
};
