import { TeamStats } from "@/types/stats";
import { createSlice } from "@reduxjs/toolkit";

export const teamStats = createSlice({
  name: "team-stats",
  initialState: {
    value: {
      status: false,
      data: {} as TeamStats,
    },
  },
  reducers: {
    updateTeamStats: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    clearTeamStats: (state) => {
      state.value.status = false;
      state.value.data = {} as any;
    },
  },
});

export const { updateTeamStats, clearTeamStats } = teamStats.actions;

export default teamStats.reducer;
