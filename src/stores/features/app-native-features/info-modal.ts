import { createSlice } from "@reduxjs/toolkit";

export const infoBar = createSlice({
  name: "information-popups",
  initialState: {
    value: {
      show: false,
      message: "",
      isError: false,
    },
  },
  reducers: {
    openInfobar: (state, action) => {
      state.value.show = true;
      state.value.message = action?.payload?.message;
      state.value.isError = action?.payload?.isError;
    },
    closeInfoBar: (state) => {
      state.value.show = false;
      state.value.message = "";
      state.value.isError = false;
    },
  },
});

export const { openInfobar, closeInfoBar } = infoBar.actions;

export default infoBar.reducer;
