import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppTabs } from "./features/AppTabs";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
};
