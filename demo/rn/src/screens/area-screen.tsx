import * as React from "react";
import { ScrollView } from "react-native";
import { VictoryArea, VictoryGroup, VictoryStack } from "victory-native";
import viewStyles from "../styles/view-styles";
import { getData } from "../data";

export const AreaScreen: React.FC = () => {
  const [data, setData] = React.useState(getData());

  React.useEffect(() => {
    const updateDataHandle = setInterval(() => {
      setData(getData());
    }, 3000);
    return () => {
      clearInterval(updateDataHandle);
    };
  }, []);

  return (
    <ScrollView style={viewStyles.container}>
      <VictoryArea
        interpolation="basis"
        animate={{
          onLoad: { duration: 3500 },
          duration: 1500,
        }}
        data={data}
      />

      <VictoryArea />

      <VictoryArea
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 1 },
          { x: 5, y: 3 },
          { x: 6, y: 4 },
          { x: 7, y: 2 },
        ]}
      />

      <VictoryArea
        data={[
          { amount: 1, yield: 1, error: 0.5 },
          { amount: 2, yield: 2, error: 1.1 },
          { amount: 3, yield: 3, error: 0 },
          { amount: 4, yield: 2, error: 0.1 },
          { amount: 5, yield: 1, error: 1.5 },
        ]}
        x={"amount"}
        y={(d) => d.yield + d.error}
      />

      <VictoryGroup width={300} height={375} style={{ data: { opacity: 0.3 } }}>
        <VictoryArea
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
          ]}
        />
        <VictoryArea
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
          ]}
        />
        <VictoryArea
          data={[
            { x: 1, y: 3 },
            { x: 2, y: 4 },
            { x: 3, y: 2 },
          ]}
        />
      </VictoryGroup>

      <VictoryStack width={300} height={375}>
        <VictoryArea
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
          ]}
        />
        <VictoryArea
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
          ]}
        />
        <VictoryArea
          data={[
            { x: 1, y: 3 },
            { x: 2, y: 4 },
            { x: 3, y: 2 },
          ]}
        />
      </VictoryStack>

      <VictoryStack
        width={300}
        height={450}
        style={{
          data: {
            strokeDasharray: "5,5",
            strokeWidth: 2,
            fillOpacity: 0.4,
          },
        }}
      >
        <VictoryArea
          style={{
            data: {
              fill: "tomato",
              stroke: "tomato",
            },
          }}
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
          ]}
        />
        <VictoryArea
          style={{
            data: {
              fill: "orange",
              stroke: "orange",
            },
          }}
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
          ]}
        />
        <VictoryArea
          style={{
            data: {
              fill: "gold",
              stroke: "gold",
            },
          }}
          data={[
            { x: 1, y: 3 },
            { x: 2, y: 4 },
            { x: 3, y: 2 },
          ]}
        />
      </VictoryStack>
    </ScrollView>
  );
};
