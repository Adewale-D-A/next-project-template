import { Competition } from "@/types/competition";
import { createSlice } from "@reduxjs/toolkit";

export const competitions = createSlice({
  name: "competitions",
  initialState: {
    value: {
      inPorgress: {
        status: false,
        data: [] as Competition[],
      },
      upcoming: {
        status: false,
        data: [] as Competition[],
      },
      completed: {
        status: false,
        data: [] as Competition[],
      },
    },
  },
  reducers: {
    updateInProgess: (state, action) => {
      state.value.inPorgress.status = true;
      state.value.inPorgress.data = action?.payload?.data;
    },
    updateUpcoming: (state, action) => {
      state.value.upcoming.status = true;
      state.value.upcoming.data = action?.payload?.data;
    },
    updateCompleted: (state, action) => {
      state.value.completed.status = true;
      state.value.completed.data = action?.payload?.data;
    },
    clearAll: (state) => {
      state.value = {
        inPorgress: {
          status: false,
          data: [],
        },
        upcoming: {
          status: false,
          data: [],
        },
        completed: {
          status: false,
          data: [],
        },
      };
    },
  },
});

export const { updateCompleted, updateInProgess, updateUpcoming, clearAll } =
  competitions.actions;

export default competitions.reducer;
