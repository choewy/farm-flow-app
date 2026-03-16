import { PayrollListRequestParam, PayrollListResponse } from './payroll.types';

import { http } from '@app/shared/api';

const list = (params: PayrollListRequestParam) => http.get<PayrollListResponse>('payrolls', { params });

export const payrollApi = { list };
