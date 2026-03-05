import { AttendanceTodayResponse } from './attendance.types';

import { http } from '@app/shared/api';

const today = () => http.get<AttendanceTodayResponse>('attendances/today');
const checkIn = (qrCode: string) => http.post('attendances/checkin', { qrCode });
const checkOut = (qrCode: string) => http.post('attendances/checkout', { qrCode });

export const attendanceApi = { today, checkIn, checkOut };
