import { createSlice } from "@reduxjs/toolkit";

export const navMenuProperties = createSlice({
  name: "navigation-menu-functionality",
  initialState: {
    value: {
      fullMenuView: true,
    },
  },
  reducers: {
    toggleMenuView: (state) => {
      state.value.fullMenuView = !state.value.fullMenuView;
    },
  },
});

export const { toggleMenuView } = navMenuProperties.actions;

export default navMenuProperties.reducer;
