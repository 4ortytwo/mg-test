import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text, Alert } from "react-native";

import { persistor } from "../../redux/store";
import { ParamList } from "../../ParamList";

import Drivers from "./Drivers";
import SingleDriver from "./SingleDriver";

interface DriversStackProps {}

const Stack = createStackNavigator<ParamList>();

export const DriversStack: React.FC<DriversStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drivers"
        component={Drivers}
        options={{
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() =>
                  persistor
                    .purge()
                    .then(
                      Alert.alert(
                        "AsyncStorage purged",
                        "Rows will be fetched again"
                      )
                    )
                }
              >
                <Text>Purge🔥</Text>
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("За годный фидбек спасибо большое", "🤓")
                }
              >
                <Text>HI MESH GROUP ❤️</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: `Driver ${route.params.givenName}`,
        })}
        name="SingleDriver"
        component={SingleDriver}
      />
    </Stack.Navigator>
  );
};
