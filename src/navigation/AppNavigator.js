import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ScanScreen from "../screens/ScanScreen";
import ResultsScreen from "../screens/ResultsScreen";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "CodeShield" }}
      />

      <Stack.Screen
        name="Scan"
        component={ScanScreen}
        options={{ title: "Scan Code" }}
      />

      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ title: "Analysis Results" }}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;
