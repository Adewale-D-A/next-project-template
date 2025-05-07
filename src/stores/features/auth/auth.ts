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
      state.value.user = {} as any;
    },
    updateToken: (state, action) => {
      state.value.token = action.payload;
    },
    updateUser: (state, action) => {
      const currentUserData = state.value.user;
      state.value.user = { ...currentUserData, ...action?.payload };
    },
  },
});

export const { updatetAuthUser, clearAuthUser, updateToken, updateUser } =
  authUser.actions;

export default authUser.reducer;
