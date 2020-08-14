import { Driver } from "../../@types/ErgastAPI";
import { AsyncReducerState } from "../../redux/store";

import {
  FETCH_DRIVERS_FAILURE,
  FETCH_DRIVERS_REQUEST,
  FETCH_DRIVERS_SUCCESS,
} from "./driversActions";
import { DriversActionTypes } from "./types";

export type DriversDataState = {
  drivers: Driver[];
};

export type DriversState = DriversDataState & AsyncReducerState;

export const initialState: DriversState = {
  loading: false,
  loaded: false,
  drivers: [],
  error: null,
};

export const driversReducer = (
  state: DriversState = initialState,
  action: DriversActionTypes
) => {
  switch (action.type) {
    case FETCH_DRIVERS_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_DRIVERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        drivers: [...state.drivers, ...action.payload],
      };
    }
    case FETCH_DRIVERS_FAILURE: {
      return { ...state, loading: false, loaded: false, error: action.payload };
    }
    default:
      return state;
  }
};
