import * as React from "react";
import { ScrollView } from "react-native";
import { VictoryChart, VictoryBoxPlot } from "victory-native";
import viewStyles from "../styles/view-styles";
import { getBoxPlotData } from "../data";

export const BoxPlotScreen: React.FC = () => {
  const [data, setData] = React.useState(getBoxPlotData());

  React.useEffect(() => {
    const updateDataHandle = setInterval(() => {
      setData(getBoxPlotData());
    }, 3000);
    return () => {
      clearInterval(updateDataHandle);
    };
  }, []);

  return (
    <ScrollView style={viewStyles.container}>
      <VictoryChart domainPadding={50}>
        <VictoryBoxPlot
          minLabels
          maxLabels
          boxWidth={10}
          data={[
            { x: "red", y: [5, 10, 9, 2] },
            { x: "blue", y: [1, 15, 6, 8] },
            { x: "green", y: [3, 5, 6, 9] },
            { x: "yellow", y: [5, 20, 8, 12] },
            { x: "white", y: [2, 11, 12, 13] },
          ]}
        />
      </VictoryChart>
      <VictoryChart domainPadding={50}>
        <VictoryBoxPlot
          labels
          boxWidth={10}
          horizontal
          y="type"
          data={[
            { type: 1, min: 1, max: 18, median: 8, q1: 5, q3: 15 },
            { type: 2, min: 4, max: 20, median: 10, q1: 7, q3: 15 },
            { type: 3, min: 3, max: 12, median: 6, q1: 5, q3: 10 },
          ]}
        />
      </VictoryChart>
      <VictoryBoxPlot animate boxWidth={10} data={data} />
    </ScrollView>
  );
};
