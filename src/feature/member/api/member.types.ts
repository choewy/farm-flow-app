import { ListResponse } from '@app/shared/api';
import { Member } from '@app/shared/models';

export type MemberResponse = Member;
export type MemberListResponse = ListResponse<Member>;

export type MemberUpdateRequestData = {
  roleId?: string;
  payRatePerHour?: number;
  payDeductionAmount?: number;
};
