import axios from "axios";

import { Race } from "../../@types/ErgastAPI";

export const getRaces = async (): Promise<Race[]> => {
  const { data } = await axios.get("http://ergast.com/api/f1/current.json");

  return data.MRData.RaceTable.Races;
};
