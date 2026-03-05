import { v4 } from 'uuid';
import { create } from 'zustand';

import { AuthFarm, AuthRole, AuthUser } from '../models';

interface AuthState {
  deviceId: string;
  user: AuthUser | null;
  farm: AuthFarm | null;
  role: AuthRole | null;
  isHydrated: boolean;
  setSession: (user: AuthUser | null, farm: AuthFarm | null, role: AuthRole | null) => void;
  clearSession: () => void;
  setHydrated: (isHydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  deviceId: v4(),
  user: null,
  farm: null,
  role: null,
  isHydrated: false,
  setSession: (user, farm, role) => set({ user, farm, role }),
  clearSession: () => set({ user: null, farm: null, role: null }),
  setHydrated: (isHydrated: boolean) => set({ isHydrated }),
}));
