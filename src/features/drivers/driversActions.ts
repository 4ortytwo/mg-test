import axios from "axios";

import { Driver } from "../../@types/ErgastAPI";
import { AppThunk } from "../../redux/store";

export const FETCH_DRIVERS_REQUEST = "FETCH_DRIVERS_REQUEST";
export const FETCH_DRIVERS_SUCCESS = "FETCH_DRIVERS_SUCCESS";
export const FETCH_DRIVERS_FAILURE = "FETCH_DRIVERS_FAILURE";

export const fetchDriversRequest = () => ({
  type: FETCH_DRIVERS_REQUEST,
});
export const fetchDriversSuccess = (payload: Driver[]) => ({
  type: FETCH_DRIVERS_SUCCESS,
  payload,
});
export const fetchDriversFailure = (payload: unknown) => ({
  type: FETCH_DRIVERS_FAILURE,
  payload,
});

export const fetchDrivers = (
  limit: string,
  offset?: string
): AppThunk => async (dispatch) => {
  dispatch(fetchDriversRequest());
  try {
    const { data } = await axios.get(
      `http://ergast.com/api/f1/drivers.json?limit=${limit}${
        offset ? `&offset=${offset}` : ""
      }`
    );
    dispatch(fetchDriversSuccess(data.MRData.DriverTable.Drivers));
  } catch (e) {
    dispatch(fetchDriversFailure(e.message));
  }
};
