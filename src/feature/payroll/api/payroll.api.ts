import {
  PayrollCheckRequestBody,
  PayrollTargetDetailListRequestParam,
  PayrollTargetDetailListResponse,
  PayrollTargetDetailUpdateRequestBody,
  PayrollTargetListRequestParam,
  PayrollTargetListResponse,
} from './payroll.types';

import { http } from '@app/shared/api';

const targets = (params: PayrollTargetListRequestParam) => http.get<PayrollTargetListResponse>('payrolls/targets', { params });
const targetDetails = (userId: string, params: PayrollTargetDetailListRequestParam) =>
  http.get<PayrollTargetDetailListResponse>(`payrolls/targets/${userId}`, { params });
const updateAttendance = (userId: string, targetDetailId: string, body: PayrollTargetDetailUpdateRequestBody) =>
  http.patch(`payrolls/${userId}/attendance/${targetDetailId}`, body);
const removeAttendance = (userId: string, targetDetailId: string) => http.delete(`payrolls/${userId}/attendance/${targetDetailId}`);
const check = (userId: string, body: PayrollCheckRequestBody) => http.patch(`payrolls/${userId}/check`, body);

export const payrollApi = { targets, targetDetails, updateAttendance, removeAttendance, check };
