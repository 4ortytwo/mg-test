import { Race } from "../../@types/ErgastAPI";
import { AsyncReducerState } from "../../redux/store";

import {
  FETCH_RACES_FAILURE,
  FETCH_RACES_REQUEST,
  FETCH_RACES_SUCCESS,
} from "./racesActions";
import { RacesActionTypes } from "./types";

export type RacesDataState = {
  races: Race[];
};

export type RacesState = RacesDataState & AsyncReducerState;

export const initialState: RacesState = {
  loading: false,
  loaded: false,
  races: [],
  error: null,
};

export const racesReducer = (
  state: RacesState = initialState,
  action: RacesActionTypes
) => {
  switch (action.type) {
    case FETCH_RACES_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_RACES_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        races: [...state.races, ...action.payload],
      };
    }
    case FETCH_RACES_FAILURE: {
      return { ...state, loading: false, loaded: false, error: action.payload };
    }
    default:
      return state;
  }
};
