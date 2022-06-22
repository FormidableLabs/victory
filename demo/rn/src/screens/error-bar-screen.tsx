import * as React from "react";
import { ScrollView, Text } from "react-native";
import { VictoryChart, VictoryErrorBar, VictoryTheme } from "victory-native";
import viewStyles from "../styles/view-styles";

export const ErrorBarScreen: React.FC = () => {
  return (
    <ScrollView style={viewStyles.container}>
      <VictoryChart domainPadding={15} theme={VictoryTheme.material}>
        <VictoryErrorBar
          data={data}
          errorX={(datum) => datum.error * datum.x}
          errorY={(datum) => datum.error * datum.y}
        />
      </VictoryChart>
    </ScrollView>
  );
};

const data = [
  { x: 15, y: 35000, error: 0.2 },
  { x: 20, y: 42000, error: 0.05 },
  { x: 25, y: 30000, error: 0.1 },
  { x: 30, y: 35000, error: 0.2 },
  { x: 35, y: 22000, error: 0.15 },
];
