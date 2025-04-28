import { configureStore } from "@reduxjs/toolkit";

//user
import authUser from "./features/auth/auth";

//native app features
import infoBar from "./features/app-native-features/info-modal";
import navMenuProperties from "./features/app-native-features/nav-menu";
import pageProperties from "./features/app-native-features/page-properties";
//native app features

export const premiumStore = () => {
  return configureStore({
    reducer: {
      //user
      auth: authUser,

      //app functionality
      infoBar: infoBar,
      navMenuProperties: navMenuProperties,
      pageProperties: pageProperties,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof premiumStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
