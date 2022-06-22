import * as React from "react";
import { ScrollView } from "react-native";
import viewStyles from "../styles/view-styles";
import {
  VictoryBar,
  VictoryChart,
  VictoryPolarAxis,
  VictoryTheme,
} from "victory-native";

export const PolarAxisScreen: React.FC = () => {
  return (
    <ScrollView style={viewStyles.container}>
      <VictoryChart polar theme={VictoryTheme.material}>
        {["cat", "dog", "bird", "dog", "frog", "fish"].map((d, i) => {
          return (
            <VictoryPolarAxis
              dependentAxis
              key={i}
              label={d}
              labelPlacement="perpendicular"
              style={{ tickLabels: { fill: "none" } }}
              axisValue={d}
            />
          );
        })}
        <VictoryBar
          style={{ data: { fill: "tomato", width: 25 } }}
          data={[
            { x: "cat", y: 10 },
            { x: "dog", y: 25 },
            { x: "bird", y: 40 },
            { x: "frog", y: 50 },
            { x: "fish", y: 50 },
          ]}
        />
      </VictoryChart>
    </ScrollView>
  );
};
