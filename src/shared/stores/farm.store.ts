import { create } from 'zustand';

import { farmApi, FarmListRow } from '@app/feature/farm/api';

interface FarmState {
  rows: FarmListRow[];
  loading: boolean;
  fetchFarms: () => Promise<void>;
  invalidate: () => void;
}

export const useFarmStore = create<FarmState>((set) => ({
  rows: [],
  loading: false,
  fetchFarms: async () => {
    try {
      set({ loading: true });
      const { data } = await farmApi.list();
      set({ rows: data.rows });
    } catch (error) {
      console.error('Failed to fetch farms in store', error);
    } finally {
      set({ loading: false });
    }
  },
  invalidate: () => {
    // This could also just trigger a re-fetch
    set({ rows: [] });
  }
}));
