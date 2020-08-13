import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ParamList } from "../ParamList";

import { DriversStack } from "./drivers/DriversStack";
import { RacesStack } from "./races/RacesStack";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<ParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const getIcon = (routeName: string) => {
            switch (routeName) {
              case "Drivers":
                return "ios-people";
              case "Races":
                return "ios-car";
              default:
                throw new Error("no icon");
            }
          };

          return (
            <Ionicons name={getIcon(route.name)} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen name="Drivers" component={DriversStack} />
      <Tabs.Screen name="Races" component={RacesStack} />
    </Tabs.Navigator>
  );
};
