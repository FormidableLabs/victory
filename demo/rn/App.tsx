import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./src/screens/root-navigator";
import { registerRootComponent } from "expo";

LogBox.ignoreLogs(["Require cycle: ../../packages/victory"]);

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

registerRootComponent(App);
