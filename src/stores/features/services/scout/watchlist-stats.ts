import { WatchlistStats } from "@/types/scout/watchlist";
import { createSlice } from "@reduxjs/toolkit";

export const watchlistStats = createSlice({
  name: "watchlist-stats",
  initialState: {
    value: {
      status: false,
      data: {} as WatchlistStats,
    },
  },
  reducers: {
    updateWatchlistStats: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    clearWatchlistStats: (state) => {
      state.value.status = false;
      state.value.data = {} as any;
    },
  },
});

export const { updateWatchlistStats, clearWatchlistStats } =
  watchlistStats.actions;

export default watchlistStats.reducer;
