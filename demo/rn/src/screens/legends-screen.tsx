import * as React from "react";
import { ScrollView, Dimensions } from "react-native";
import { VictoryLegend } from "victory-native";
import Svg from "react-native-svg";
import viewStyles from "../styles/view-styles";

const legendData = [
  {
    name: "Series 1",
    symbol: {
      type: "circle",
      fill: "green",
    },
  },
  {
    name: "Long Series Name",
    symbol: {
      type: "triangleUp",
      fill: "blue",
    },
  },
  {
    name: "Series 3",
    symbol: {
      type: "diamond",
      fill: "pink",
    },
  },
  {
    name: "Series 4",
    symbol: {
      type: "plus",
    },
  },
  {
    name: "Series 5",
    symbol: {
      type: "star",
      fill: "red",
    },
    labels: {
      fill: "purple",
    },
  },
  {
    name: "Series 6",
    symbol: {
      type: "circle",
      fill: "orange",
    },
    labels: {
      fill: "blue",
    },
  },
];

const legendStyle = { border: { stroke: "black" } };

export const LegendsScreen: React.FC = () => {
  return (
    <ScrollView style={viewStyles.container}>
      <Svg width={Dimensions.get("window").width} height={300}>
        <VictoryLegend
          x={5}
          y={10}
          standalone={false}
          data={legendData}
          style={legendStyle}
        />
        <VictoryLegend
          x={5}
          y={200}
          data={legendData}
          standalone={false}
          itemsPerRow={3}
          style={legendStyle}
        />
      </Svg>
    </ScrollView>
  );
};
