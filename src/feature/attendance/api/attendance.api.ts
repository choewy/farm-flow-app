import { AttendanceListRequestParam, AttendanceListResponse, AttendanceTodayResponse, AttendanceUpdateRequestData } from './attendance.types';

import { http } from '@app/shared/api';

const list = (params: AttendanceListRequestParam) => http.get<AttendanceListResponse>('attendances', { params });
const today = () => http.get<AttendanceTodayResponse>('attendances/today');
const checkIn = (qrCode: string) => http.post('attendances/checkin', { qrCode });
const checkOut = (qrCode: string) => http.post('attendances/checkout', { qrCode });
const update = (id: string, data: AttendanceUpdateRequestData) => http.patch(`attendances/${id}`, data);

export const attendanceApi = { list, today, checkIn, checkOut, update };
