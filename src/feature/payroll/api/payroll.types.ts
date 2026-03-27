import { ListResponse } from '@app/shared/api';
import { PayrollRole, PayrollUser } from '@app/shared/models';

export type PayrollTargetListRequestParam = {
  startDate?: Date;
  endDate?: Date;
};

export type PayrollTargetResponse = {
  user: PayrollUser;
  role: PayrollRole | null;
  payRatePerHour: number;
  payDeductionAmount: number;
  seconds: number;
  needCheck: boolean;
};

export type PayrollTargetListResponse = ListResponse<PayrollTargetResponse>;

export type PayrollTargetDetailListRequestParam = {
  startDate?: Date;
  endDate?: Date;
};

export type PayrollTargetDetailResponse = {
  id: string;
  workDate: string;
  status: 'in' | 'out';
  seconds: number;
  checkedInAt: string;
  checkedOutAt: string;
  payrolled: boolean;
};

export type PayrollTargetDetailListResponse = ListResponse<PayrollTargetDetailResponse> & {
  payRatePerHour: number;
  payDeductionAmount: number;
};

export type PayrollTargetDetailUpdateRequestBody = {
  checkedInAt?: string;
  checkedOutAt?: string;
};

export type PayrollCheckRequestBody = {
  startDate?: Date;
  endDate?: Date;
};
