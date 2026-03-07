import type { AuthResponse, LoginRequestData, RegisterRequestData } from './auth.types';

import { http } from '@app/shared/api';

const login = (data: LoginRequestData) => http.post<AuthResponse>('auth/login', data);
const register = (data: RegisterRequestData) => http.post<AuthResponse>('auth/register', data);
const refresh = () => http.post<AuthResponse>('auth/refresh');
const checkIn = (farmId: string) => http.post<AuthResponse>('auth/checkin', { farmId });
const logout = () => http.delete('auth/logout');

export const authApi = {
  login,
  register,
  refresh,
  checkIn,
  logout,
};
