import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { AppThunk, AsyncReducerState } from "../../redux/store";
import { Race } from "../../@types/RaceAPI";

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

const { actions, reducer } = createSlice({
  name: "races",
  initialState,
  reducers: {
    fetchRacesRequest(state) {
      state.loading = true;
    },
    fetchRacesSuccess(state, action) {
      state.loading = false;
      state.loaded = true;
      state.races = action.payload;
    },
    fetchRacesFailure(state, action) {
      state.loading = false;
      state.loaded = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRacesRequest,
  fetchRacesSuccess,
  fetchRacesFailure,
} = actions;

export const racesReducer = reducer;

export const fetchRaces = (): AppThunk => async (dispatch, getState) => {
  dispatch(fetchRacesRequest());
  try {
    const { races } = getState();
    const { data } = await axios.get("http://ergast.com/api/f1/current.json");
    dispatch(
      fetchRacesSuccess([
        ...races.races.slice(),
        ...data.MRData.RaceTable.Races,
      ])
    );
  } catch (e) {
    dispatch(fetchRacesFailure(e.message));
  }
};
