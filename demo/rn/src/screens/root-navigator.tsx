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
import { LegendsScreen } from "./legends-screen";
import { AxisScreen } from "./axis-screen";
import { ScatterScreen } from "./scatter-screen";
import { BoxPlotScreen } from "./box-plot-screen";
import { ErrorBarScreen } from "./error-bar-screen";
import { PolarAxisScreen } from "./polar-axis-screen";
import { VoronoiScreen } from "./voronoi-screen";
import { BrushLineScreen } from "./brush-line-screen";

export const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Components" component={ComponentsScreen} />
      <RootStack.Screen
        name="Bar"
        component={BarScreen}
        options={{ title: "VictoryBar" }}
      />
    </RootStack.Navigator>
  );
};

const RootStack = createNativeStackNavigator<RootStackNavigatorParams>();
