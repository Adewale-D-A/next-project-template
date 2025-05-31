import { Match } from "@/types/match";
import { createSlice } from "@reduxjs/toolkit";

export const nextMatch = createSlice({
  name: "next-match",
  initialState: {
    value: {
      status: false,
      data: {} as Match,
    },
  },
  reducers: {
    updateNextMatch: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    clearNextMatch: (state) => {
      state.value.status = false;
      state.value.data = {} as any;
    },
  },
});

export const { updateNextMatch, clearNextMatch } = nextMatch.actions;

export default nextMatch.reducer;
