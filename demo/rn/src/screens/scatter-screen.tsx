import * as React from "react";
import { ScrollView, View } from "react-native";
import { VictoryScatter } from "victory-native";
import viewStyles from "../styles/view-styles";
import { generateRandomData } from "../data";

export const ScatterScreen: React.FC = () => {
  const [data, setData] = React.useState(generateRandomData());

  React.useEffect(() => {
    const updateDataHandle = setInterval(() => {
      setData(generateRandomData());
    }, 3000);
    return () => {
      clearInterval(updateDataHandle);
    };
  }, []);

  return (
    <ScrollView style={viewStyles.container}>
      <View pointerEvents="none">
        <VictoryScatter />

        <VictoryScatter data={data} animate={{ duration: 1500 }} />

        <VictoryScatter y={(d) => Math.sin(2 * Math.PI * d.x)} />

        <VictoryScatter
          data={[
            { x: 1, y: 3 },
            { x: 2, y: 5 },
            { x: 3, y: 4 },
            { x: 4, y: 2 },
            { x: 5, y: 5 },
          ]}
          size={8}
          symbol="star"
          style={{
            data: {
              fill: "gold",
              stroke: "orange",
              strokeWidth: 3,
            },
          }}
        />

        <VictoryScatter
          style={{
            data: {
              fill: ({ datum }) => (datum.y > 0 ? "red" : "blue"),
            },
          }}
          symbol={({ datum }) => (datum.y > 0 ? "triangleUp" : "triangleDown")}
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          samples={25}
        />
      </View>
    </ScrollView>
  );
};
