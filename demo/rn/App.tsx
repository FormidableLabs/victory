import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./src/screens/root-navigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
