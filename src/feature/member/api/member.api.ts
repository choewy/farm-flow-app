import { MemberListResponse, MemberUpdatePayrollRequestData, MemberUpdateRoleRequestData } from './member.types';

import { http } from '@app/shared/api';

const list = () => http.get<MemberListResponse>('members');
const updateRole = (id: string, data: MemberUpdateRoleRequestData) => http.patch<void>(`members/${id}/role`, data);
const updatePayroll = (id: string, data: MemberUpdatePayrollRequestData) => http.patch<void>(`members/${id}/payroll`, data);
const remove = (id: string) => http.delete<void>(`members/${id}`);

export const memberApi = {
  list,
  updateRole,
  updatePayroll,
  remove,
};
