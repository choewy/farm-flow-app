import { MemberListResponse, MemberUpdateRequestData } from './member.types';

import { http } from '@app/shared/api';

const list = () => http.get<MemberListResponse>('members');
const update = (id: string, data: MemberUpdateRequestData) => http.patch<void>(`members/${id}`, data);
const remove = (id: string) => http.delete<void>(`members/${id}`);

export const memberApi = {
  list,
  update,
  remove,
};
