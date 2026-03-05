import { http } from '@app/shared/api';

const create = (deviceId: string) => http.post('attendances/qr', { deviceId });

export const attendanceQrApi = { create };
