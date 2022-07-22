import React from 'react';
import { Text, View } from 'react-native';
import { VictoryBar } from "victory-native";

// LogBox.ignoreLogs(['Require cycle: ../../packages/victory']);
// console.log(VictoryBar);

export default function App() {
  return (
    <View>
      <Text>WHAT UP WORLD</Text>
      {/*<VictoryBar />*/}
    </View>
  );
}

// This is what it should be... Still struggling
// import React from "react";
// import { LogBox } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { RootNavigator } from "./src/screens/root-navigator";
//
// LogBox.ignoreLogs(["Require cycle: ../../packages/victory"]);
//
// export default function App() {
//   return (
//     <NavigationContainer>
//       <RootNavigator />
//     </NavigationContainer>
//   );
// }
