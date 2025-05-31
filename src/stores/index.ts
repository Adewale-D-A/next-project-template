import { configureStore } from "@reduxjs/toolkit";

//user
import authUser from "./features/auth/auth";

//native app features
import infoBar from "./features/app-native-features/info-modal";
import navMenuProperties from "./features/app-native-features/nav-menu";
import pageProperties from "./features/app-native-features/page-properties";
//native app features

// services
import playersListData from "./features/services/players-list";
import nextMatch from "./features/services/next-match";
import activeCompetitions from "./features/services/active-competitions";
import competitions from "./features/services/competitions";
// Club only
import fixtures from "./features/services/club/fixtures";
import teamStats from "./features/services/club/team-stats";
import playerOfTheWeek from "./features/services/club/player-of-the-week";
// Scouts only
import watchlistStats from "./features/services/scout/watchlist-stats";
import playersEvaluations from "./features/services/scout/player-evaluations";
import clubs from "./features/services/scout/clubs";
import watchlist from "./features/services/scout/watchlist";

export const premiumStore = () => {
  return configureStore({
    reducer: {
      //user
      auth: authUser,

      //app functionality
      infoBar: infoBar,
      navMenuProperties: navMenuProperties,
      pageProperties: pageProperties,

      // services
      players: playersListData,
      nextMatch: nextMatch,
      activeCompetition: activeCompetitions,
      competitions: competitions,
      //Club only
      fixtures: fixtures,
      teamStats: teamStats,
      playerOfTheWeek: playerOfTheWeek,
      // Scout
      watchlistStats: watchlistStats,
      playersEvaluations: playersEvaluations,
      clubs: clubs,
      watchlist: watchlist,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof premiumStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
