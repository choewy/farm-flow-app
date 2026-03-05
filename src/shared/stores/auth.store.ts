import { create } from 'zustand';

import type { AuthFarm, AuthRole, AuthUser } from '../models';

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  farm: AuthFarm | null;
  role: AuthRole | null;
  isHydrated: boolean;
  setSession: (accessToken: string | null, user: AuthUser | null, farm: AuthFarm | null, role: AuthRole | null) => void;
  clearSession: () => void;
  setHydrated: (isHydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  farm: null,
  role: null,
  isHydrated: false,
  setSession: (accessToken, user, farm, role) => set({ accessToken, user, farm, role }),
  clearSession: () => set({ accessToken: null, user: null, farm: null, role: null }),
  setHydrated: (isHydrated: boolean) => set({ isHydrated }),
}));
