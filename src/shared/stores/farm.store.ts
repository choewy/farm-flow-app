import { create } from 'zustand';

import { farmApi, FarmListRow } from '@app/feature/farm/api';

interface FarmState {
  loading: boolean;
  rows: FarmListRow[];
  fetchFarms: () => Promise<void>;
  invalidate: () => void;
}

export const useFarmStore = create<FarmState>((set) => ({
  loading: false,
  rows: [],
  fetchFarms: async () => {
    try {
      set({ loading: true });
      const { data } = await farmApi.list();
      set({ rows: data.rows });
    } finally {
      set({ loading: false });
    }
  },
  invalidate: () => {
    set({ rows: [] });
  },
}));
