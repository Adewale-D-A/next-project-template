import { Player } from "@/types/player";
import { createSlice } from "@reduxjs/toolkit";

export const playerOfTheWeek = createSlice({
  name: "player-of-the-week",
  initialState: {
    value: {
      status: false,
      data: {} as Player,
    },
  },
  reducers: {
    updatePlayerOfTheWeek: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    clearPlayerOfTheWeek: (state) => {
      state.value.status = false;
      state.value.data = {} as any;
    },
  },
});

export const { updatePlayerOfTheWeek, clearPlayerOfTheWeek } =
  playerOfTheWeek.actions;

export default playerOfTheWeek.reducer;
