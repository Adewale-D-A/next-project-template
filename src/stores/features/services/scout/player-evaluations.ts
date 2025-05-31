import { Player } from "@/types/player";
import { createSlice } from "@reduxjs/toolkit";

export const playersEvaluations = createSlice({
  name: "players-evaluations",
  initialState: {
    value: {
      status: false,
      data: [] as Player[],
    },
  },
  reducers: {
    updatePlayersEvaluation: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    clearActiveCompetition: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const { updatePlayersEvaluation, clearActiveCompetition } =
  playersEvaluations.actions;

export default playersEvaluations.reducer;
