import { Race } from "../../@types/ErgastAPI";

import {
  FETCH_RACES_FAILURE,
  FETCH_RACES_REQUEST,
  FETCH_RACES_SUCCESS,
} from "./racesActions";

interface FetchRacesRequestAction {
  type: typeof FETCH_RACES_REQUEST;
}

interface FetchRacesSuccessAction {
  type: typeof FETCH_RACES_SUCCESS;
  payload: Race[];
}

interface FetchRacesFailureAction {
  type: typeof FETCH_RACES_FAILURE;
  payload: unknown;
}

export type RacesActionTypes =
  | FetchRacesRequestAction
  | FetchRacesSuccessAction
  | FetchRacesFailureAction;
