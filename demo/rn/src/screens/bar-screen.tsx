import * as React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { VictoryBar, VictoryGroup, VictoryStack } from "victory-native";
import viewStyles from "../styles/view-styles";

export const BarScreen: React.FC = () => {
  return (
    <ScrollView style={viewStyles.container}>
      <VictoryBar />

      <VictoryBar
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 2 },
          { x: 5, y: 1 },
        ]}
      />

      <VictoryGroup
        width={300}
        height={375}
        offset={20}
        colorScale={"qualitative"}
      >
        <VictoryBar
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
          ]}
        />
        <VictoryBar
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
          ]}
        />
        <VictoryBar
          data={[
            { x: 1, y: 3 },
            { x: 2, y: 4 },
            { x: 3, y: 2 },
          ]}
        />
      </VictoryGroup>

      <VictoryStack width={300} height={375} colorScale={"qualitative"}>
        <VictoryBar
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
          ]}
        />
        <VictoryBar
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
          ]}
        />
        <VictoryBar
          data={[
            { x: 1, y: 3 },
            { x: 2, y: 4 },
            { x: 3, y: 2 },
          ]}
        />
      </VictoryStack>

      <VictoryBar
        height={375}
        padding={75}
        style={{
          data: {
            fill: ({ datum }: { datum: { y: number } }) =>
              datum.y > 2 ? "red" : "blue",
          },
        }}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 2 },
          { x: 5, y: 1 },
        ]}
      />
    </ScrollView>
  );
};
