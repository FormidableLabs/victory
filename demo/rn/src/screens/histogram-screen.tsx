import * as React from "react";
import { ScrollView } from "react-native";
import { VictoryStack, VictoryHistogram } from "victory-native";
import viewStyles from "../styles/view-styles";

const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};
const getRandomDateData = () =>
  Array.from({ length: 100 }, () => ({
    x: randomDate(new Date(2016, 0, 1), new Date(2020, 5, 1)),
  }));
const getRandomData = () =>
  Array.from({ length: 100 }, () => ({
    x: Math.floor(Math.random() * 100),
  }));

const numericData = getRandomData();
const numericData2 = getRandomData();
const dateData = getRandomDateData();
const dateData2 = getRandomDateData();

export const HistogramScreen: React.FC = () => {
  return (
    <ScrollView style={viewStyles.container}>
      <VictoryHistogram
        data={numericData}
        style={{
          data: { stroke: "#833B61", strokeWidth: 3, fill: "#F67E7D" },
        }}
        cornerRadius={10}
      />

      <VictoryHistogram
        data={numericData}
        style={{
          data: { stroke: "#833B61", strokeWidth: 3, fill: "#F67E7D" },
        }}
        binSpacing={20}
      />

      <VictoryHistogram data={numericData2} bins={3} />

      <VictoryHistogram
        data={dateData}
        bins={[
          new Date(2016, 0, 1),
          new Date(2017, 0, 1),
          new Date(2018, 0, 1),
          new Date(2019, 0, 1),
          new Date(2020, 0, 1),
        ]}
      />

      <VictoryHistogram
        data={dateData2}
        style={{ data: { stroke: "#f67280", strokeWidth: 4, fill: "#355c7d" } }}
      />

      <VictoryStack colorScale="qualitative">
        <VictoryHistogram data={numericData} />
        <VictoryHistogram data={numericData2} />
      </VictoryStack>
    </ScrollView>
  );
};
