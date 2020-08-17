import axios from "axios";

import { Driver } from "../../@types/ErgastAPI";

type GetDrivers = (limit: string, offset?: string) => Promise<Driver[]>;

export const getDrivers: GetDrivers = async (limit, offset) => {
  const { data } = await axios.get(
    `http://ergast.com/api/f1/drivers.json?limit=${limit}${
      offset ? `&offset=${offset}` : ""
    }`
  );

  return data.MRData.DriverTable.Drivers;
};
