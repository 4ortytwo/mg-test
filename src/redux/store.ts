import AsyncStorage from "@react-native-community/async-storage";
import {
  configureStore,
  Action,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { driversReducer } from "../features/drivers/driversSlice";
import { racesReducer } from "../features/races/racesSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["drivers", "races"],
};

const rootReducer = combineReducers({
  drivers: driversReducer,
  races: racesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: true,
});

export default store;

export const persistor = persistStore(store);

export type AsyncReducerState = {
  loading: boolean;
  loaded: boolean;
  error: unknown;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
