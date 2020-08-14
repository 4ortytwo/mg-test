import { Driver } from "../../@types/ErgastAPI";

import {
  FETCH_DRIVERS_FAILURE,
  FETCH_DRIVERS_REQUEST,
  FETCH_DRIVERS_SUCCESS,
} from "./driversActions";

interface FetchDriversRequestAction {
  type: typeof FETCH_DRIVERS_REQUEST;
}

interface FetchDriversSuccessAction {
  type: typeof FETCH_DRIVERS_SUCCESS;
  payload: Driver[];
}

interface FetchDriversFailureAction {
  type: typeof FETCH_DRIVERS_FAILURE;
  payload: unknown;
}

export type DriversActionTypes =
  | FetchDriversRequestAction
  | FetchDriversSuccessAction
  | FetchDriversFailureAction;
