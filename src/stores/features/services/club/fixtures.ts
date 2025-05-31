import { Fixtures } from "@/types/match";
import { createSlice } from "@reduxjs/toolkit";

export const fixtures = createSlice({
  name: "fixtures",
  initialState: {
    value: {
      status: false,
      data: [] as Fixtures[],
    },
  },
  reducers: {
    updateFixtures: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    replaceFixture: (state, action) => {
      const { _id } = action?.payload;
      const currentArray = state.value.data;
      const currentIndex = currentArray.findIndex((v) => v._id === _id);
      if (currentIndex >= 0) {
        const currentDataset = currentArray[currentIndex];
        currentArray.splice(currentIndex, 1, {
          ...currentDataset,
          ...action?.payload,
        });
        state.value.data = currentArray;
      }
    },
    clearFixtures: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const { updateFixtures, replaceFixture, clearFixtures } =
  fixtures.actions;

export default fixtures.reducer;
