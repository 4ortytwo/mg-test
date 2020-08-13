import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { Driver } from "./@types/RaceAPI";

export type ParamList = {
  Drivers: undefined;
  SingleDriver: Driver;
  Races: undefined;
};

export type NavProps<T extends keyof ParamList> = {
  navigation: StackNavigationProp<ParamList, T>;
  route: RouteProp<ParamList, T>;
};
