import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ParamList } from "../../ParamList";

import Races from "./Races";

interface RacesStackProps {}

const Stack = createStackNavigator<ParamList>();

export const RacesStack: React.FC<RacesStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Races" component={Races} />
    </Stack.Navigator>
  );
};
