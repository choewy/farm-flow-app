import { MemberRole } from './role';
import { MemberUser } from './user';

export type Member = {
  user: MemberUser;
  role: MemberRole;
  payRatePerHour: number;
  payDeductionAmount: number;
};
