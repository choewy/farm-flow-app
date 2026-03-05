import type { AuthResponse, LoginRequestData, RegisterRequestData } from './auth.types';

import { http, httpPublic } from '@app/shared/api';

const login = (data: LoginRequestData) => httpPublic.post<AuthResponse>('auth/login', data);
const register = (data: RegisterRequestData) => httpPublic.post<AuthResponse>('auth/register', data);
const refresh = () => httpPublic.post<AuthResponse>('auth/refresh');
const checkIn = (farmId: string) => http.post<AuthResponse>('auth/checkin', { farmId });

export const authApi = {
  login,
  register,
  refresh,
  checkIn,
};
