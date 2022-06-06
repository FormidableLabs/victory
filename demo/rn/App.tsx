import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./src/screens/root-navigator";

LogBox.ignoreLogs(["Require cycle: ../../packages/victory"]);

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
