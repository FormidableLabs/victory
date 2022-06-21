import * as React from "react";
import { ScrollView } from "react-native";
import { VictoryAxis } from "victory-native";
import Svg from "react-native-svg";
import viewStyles from "../styles/view-styles";

export const AxisScreen: React.FC = () => {
  return (
    <ScrollView style={viewStyles.container}>
      <VictoryAxis height={100} />

      <VictoryAxis
        height={100}
        scale="time"
        tickValues={[
          new Date(1980, 1, 1),
          new Date(1990, 1, 1),
          new Date(2000, 1, 1),
          new Date(2010, 1, 1),
          new Date(2020, 1, 1),
        ]}
        tickFormat={(x) => x.getFullYear()}
      />

      <Svg width={320} height={320}>
        <VictoryAxis
          width={320}
          height={320}
          domain={[-10, 10]}
          crossAxis
          offsetY={160}
          standalone={false}
        />
        <VictoryAxis
          dependentAxis
          width={320}
          height={320}
          domain={[-10, 10]}
          crossAxis
          offsetX={160}
          standalone={false}
        />
      </Svg>

      <VictoryAxis
        dependentAxis
        padding={{ left: 50, top: 20, bottom: 20 }}
        scale="log"
        domain={[1, 5]}
      />
    </ScrollView>
  );
};
