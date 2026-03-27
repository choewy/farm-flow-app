import { ListResponse } from '@app/shared/api';
import { Member } from '@app/shared/models';

export type MemberResponse = Member;
export type MemberListResponse = ListResponse<Member>;

export type MemberUpdateRoleRequestData = {
  roleId?: string;
};

export type MemberUpdatePayrollRequestData = {
  payRatePerHour?: number;
  payDeductionAmount?: number;
};
