import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import { driversReducer } from "../features/drivers/driversReducer";
import { racesReducer } from "../features/races/racesReducer";

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

const middleware = compose(applyMiddleware(thunk));

const store = createStore(persistedReducer, middleware);

export default store;

export const persistor = persistStore(store);

export type AsyncReducerState = {
  loading: boolean;
  loaded: boolean;
  error: unknown;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
