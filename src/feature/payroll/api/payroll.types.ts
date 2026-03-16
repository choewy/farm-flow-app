import { ListResponse } from '@app/shared/api';
import { PayrollRole, PayrollUser } from '@app/shared/models';

export type PayrollListRequestParam = {
  startDate?: Date;
  endDate?: Date;
};

export type PayrollResponse = {
  user: PayrollUser;
  role: PayrollRole | null;
  payRatePerHour: number;
  payDeductionAmount: number;
  seconds: number;
};

export type PayrollListResponse = ListResponse<PayrollResponse>;
