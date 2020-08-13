import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { AppThunk, AsyncReducerState } from "../../redux/store";
import { Driver } from "../../@types/RaceAPI";

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

const { actions, reducer } = createSlice({
  name: "drivers",
  initialState,
  reducers: {
    fetchDriversRequest(state) {
      state.loading = true;
    },
    fetchDriversSuccess(state, action) {
      state.loading = false;
      state.loaded = true;
      state.drivers = action.payload;
    },
    fetchDriversFailure(state, action) {
      state.loading = false;
      state.loaded = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDriversRequest,
  fetchDriversSuccess,
  fetchDriversFailure,
} = actions;

export const driversReducer = reducer;

export const fetchDrivers = (
  limit: string,
  offset?: string
): AppThunk => async (dispatch, getState) => {
  dispatch(fetchDriversRequest());
  try {
    const { drivers } = getState();
    const { data } = await axios.get(
      `http://ergast.com/api/f1/drivers.json?limit=${limit}${
        offset ? `&offset=${offset}` : ""
      }`
    );

    dispatch(
      fetchDriversSuccess([
        ...drivers.drivers.slice(),
        ...data.MRData.DriverTable.Drivers,
      ])
    );
  } catch (e) {
    dispatch(fetchDriversFailure(e.message));
  }
};
