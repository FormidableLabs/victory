import * as React from "react";
import { RootStackNavigatorParams } from "../navigation-config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BarScreen } from "./bar-screen";
import { ComponentsScreen } from "./components-screen";
import { PieScreen } from "./pie-screen";
import { ChartScreen } from "./chart-screen";
import { LineScreen } from "./line-screen";
import { AreaScreen } from "./area-screen";
import { HistogramScreen } from "./histogram-screen";

export const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Components" component={ComponentsScreen} />
      <RootStack.Screen
        name="Pie"
        component={PieScreen}
        options={{ title: "VictoryPie" }}
      />
      <RootStack.Screen
        name="Chart"
        component={ChartScreen}
        options={{ title: "VictoryChart" }}
      />
      <RootStack.Screen
        name="Line"
        component={LineScreen}
        options={{ title: "VictoryLine" }}
      />
      <RootStack.Screen
        name="Area"
        component={AreaScreen}
        options={{ title: "VictoryArea" }}
      />
      <RootStack.Screen
        name="Bar"
        component={BarScreen}
        options={{ title: "VictoryBar" }}
      />
      <RootStack.Screen
        name="Histogram"
        component={HistogramScreen}
        options={{ title: "VictoryHistogram" }}
      />
    </RootStack.Navigator>
  );
};

const RootStack = createNativeStackNavigator<RootStackNavigatorParams>();
