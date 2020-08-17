import { Race } from "../../@types/ErgastAPI";
import { AppThunk } from "../../redux/store";

import { getRaces } from "./api";

export const FETCH_RACES_REQUEST = "FETCH_RACES_REQUEST";
export const FETCH_RACES_SUCCESS = "FETCH_RACES_SUCCESS";
export const FETCH_RACES_FAILURE = "FETCH_RACES_FAILURE";

export const fetchRacesRequest = () => ({
  type: FETCH_RACES_REQUEST,
});
export const fetchRacesSuccess = (payload: Race[]) => ({
  type: FETCH_RACES_SUCCESS,
  payload,
});
export const fetchRacesFailure = (payload: unknown) => ({
  type: FETCH_RACES_FAILURE,
  payload,
});

export const fetchRaces = (): AppThunk => async (dispatch, getState) => {
  dispatch(fetchRacesRequest());
  try {
    const races = await getRaces();
    dispatch(fetchRacesSuccess(races));
  } catch (e) {
    dispatch(fetchRacesFailure(e.message));
  }
};
