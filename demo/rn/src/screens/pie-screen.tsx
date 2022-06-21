import * as React from "react";
import { ScrollView } from "react-native";
import { VictoryPie } from "victory-native";
import viewStyles from "../styles/view-styles";
import { generateRandomData } from "../data/";

export const PieScreen: React.FC = () => {
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
      <VictoryPie
        innerRadius={75}
        labelRadius={125}
        style={{ labels: { fontSize: 20 } }}
        data={data}
        animate={{ duration: 1500 }}
      />

      <VictoryPie
        style={{
          data: {
            stroke: "none",
            opacity: 0.3,
          },
        }}
      />
      <VictoryPie innerRadius={90} />
      <VictoryPie endAngle={90} startAngle={-90} />
      <VictoryPie
        endAngle={90}
        innerRadius={90}
        padAngle={5}
        startAngle={-90}
      />
      <VictoryPie
        style={{
          labels: {
            fill: "white",
            stroke: "none",
            fontSize: 15,
            fontWeight: "bold",
          },
        }}
        data={[
          { x: "<5", y: 6279 },
          { x: "5-13", y: 9182 },
          { x: "14-17", y: 5511 },
          { x: "18-24", y: 7164 },
          { x: "25-44", y: 6716 },
          { x: "45-64", y: 4263 },
          { x: "≥65", y: 7502 },
        ]}
        innerRadius={70}
        labelRadius={100}
        colorScale={[
          "#D85F49",
          "#F66D3B",
          "#D92E1D",
          "#D73C4C",
          "#FFAF59",
          "#E28300",
          "#F6A57F",
        ]}
      />
      <VictoryPie
        style={{
          data: {
            stroke: ({ datum }) => (datum.y > 75 ? "black" : "none"),
            opacity: ({ datum }) => (datum.y > 75 ? 1 : 0.4),
          },
        }}
        data={[
          { x: "Cat", y: 62 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 55 },
        ]}
      />
    </ScrollView>
  );
};
