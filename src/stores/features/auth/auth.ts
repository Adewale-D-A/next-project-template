import { AuthUser } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";

export const authUser = createSlice({
  name: "auth-user",
  initialState: {
    value: {
      status: false,
      isLoggedIn: false,
      user: {} as AuthUser,
      token: "",
    },
  },
  reducers: {
    updatetAuthUser: (state, action) => {
      state.value.status = true;
      state.value.isLoggedIn = true;
      state.value.user = action.payload?.user;
      state.value.token = action.payload?.token;
    },
    clearAuthUser: (state) => {
      state.value.status = false;
      state.value.isLoggedIn = false;
      state.value.token = "";
    },
    updateToken: (state, action) => {
      state.value.token = action.payload;
    },
  },
});

export const { updatetAuthUser, clearAuthUser, updateToken } = authUser.actions;

export default authUser.reducer;
