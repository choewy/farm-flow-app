import { AuthFarm, AuthRole, AuthUser } from '@app/shared/models';

export type RegisterRequestData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export type LoginRequestData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  expiresIn: number;
  expiresAt: string;
  user: AuthUser;
  farm: AuthFarm | null;
  role: AuthRole | null;
};
