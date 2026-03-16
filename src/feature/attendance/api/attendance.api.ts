import { AttendanceListRequestParam, AttendanceListResponse,AttendanceTodayResponse } from './attendance.types';

import { http } from '@app/shared/api';

const list = (params: AttendanceListRequestParam) => http.get<AttendanceListResponse>('attendances', { params });
const today = () => http.get<AttendanceTodayResponse>('attendances/today');
const checkIn = (qrCode: string) => http.post('attendances/checkin', { qrCode });
const checkOut = (qrCode: string) => http.post('attendances/checkout', { qrCode });

export const attendanceApi = { list, today, checkIn, checkOut };
