import { ListResponse } from '@app/shared/api';
import { MemberRole, MemberUser } from '@app/shared/models';

export type MemberResponse = {
  user: MemberUser;
  role: MemberRole;
};

export type MemberListResponse = ListResponse<MemberResponse>;
