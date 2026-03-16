import { PayrollRole } from './role';
import { PayrollUser } from './user';

export type PayrollResponse = {
  user: PayrollUser;
  role: PayrollRole | null;
  payRatePerHour: number;
  payDeductionAmount: number;
  seconds: number;
};
