import { create } from 'zustand';

import { farmApi, FarmListRow } from '@app/feature/farm/api';

interface FarmState {
  loading: boolean;
  loaded: boolean;
  rows: FarmListRow[];
  fetchFarms: (options?: { force?: boolean }) => Promise<void>;
  invalidate: () => void;
}

export const useFarmStore = create<FarmState>((set) => ({
  loading: false,
  loaded: false,
  rows: [],
  fetchFarms: async ({ force = false } = {}) => {
    const { loading, loaded } = useFarmStore.getState();

    if (loading || (loaded && !force)) {
      return;
    }

    try {
      set({ loading: true });
      const { data } = await farmApi.list();
      set({ rows: data.rows ?? [], loaded: true });
    } finally {
      set({ loading: false });
    }
  },
  invalidate: () => {
    set({ rows: [], loaded: false });
  },
}));
