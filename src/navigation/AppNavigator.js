import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ScanScreen from "../screens/ScanScreen";
import ResultsScreen from "../screens/ResultsScreen";
import MethodologyScreen from "../screens/MethodologyScreen"; 

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Methodology" component={MethodologyScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;