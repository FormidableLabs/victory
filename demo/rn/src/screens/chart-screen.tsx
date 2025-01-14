import * as React from "react";
import { ScrollView } from "react-native";
import {
  Background,
  VictoryChart,
  VictoryBar,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryArea,
  VictoryStack,
  VictoryTooltip,
  VictoryZoomContainer,
} from "victory-native";
import viewStyles from "../styles/view-styles";
import { getTransitionData, generateRandomData } from "../data";

export const ChartScreen: React.FC = () => {
  const [transitionData, setTransitionData] =
    React.useState(getTransitionData());

  React.useEffect(() => {
    const updateDataHandle = setInterval(() => {
      setTransitionData(getTransitionData());
    }, 3000);
    return () => {
      clearInterval(updateDataHandle);
    };
  }, []);

  return (
    <ScrollView style={viewStyles.container}>
      <VictoryChart>
        <VictoryBar />
        <VictoryLine />
      </VictoryChart>

      <VictoryChart domain={{ x: [0, 4] }}>
        <VictoryGroup
          labels={["a", "b", "c"]}
          offset={10}
          colorScale={"qualitative"}
        >
          <VictoryBar
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 5 },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 1 },
              { x: 3, y: 7 },
            ]}
          />
          <VictoryBar
            data={[
              { x: 1, y: 3 },
              { x: 2, y: 4 },
              { x: 3, y: 9 },
            ]}
          />
        </VictoryGroup>
      </VictoryChart>

      <VictoryChart>
        <VictoryScatter
          labelComponent={<VictoryTooltip />}
          style={{
            data: { fill: ({ datum }) => datum.fill },
          }}
          data={[
            {
              x: 1,
              y: 3,
              fill: "red",
              symbol: "plus",
              size: 6,
              label: "Red",
            },
            {
              x: 2,
              y: 5,
              fill: "magenta",
              size: 9,
              opacity: 0.4,
              label: "Magenta",
            },
            {
              x: 3,
              y: 4,
              fill: "orange",
              size: 5,
              label: "Orange",
            },
            {
              x: 4,
              y: 2,
              fill: "brown",
              symbol: "square",
              size: 6,
              label: "Brown",
            },
            {
              x: 5,
              y: 5,
              fill: "black",
              symbol: "triangleUp",
              size: 5,
              label: "Black",
            },
          ]}
        />
      </VictoryChart>
      <VictoryChart animate={{ duration: 2000 }}>
        <VictoryArea data={transitionData} />
      </VictoryChart>
      <VictoryChart animate={{ duration: 2000 }}>
        <VictoryBar
          labels={() => "Hi"}
          data={transitionData}
          style={{
            data: {
              fill: "tomato",
              width: 12,
            },
          }}
          animate={{
            onExit: {
              duration: 500,
              before: () => ({
                y: 0,
                fill: "orange",
                label: "BYE",
              }),
            },
          }}
        />
      </VictoryChart>

      <VictoryChart>
        <VictoryStack>
          <VictoryArea
            data={[
              { x: "a", y: 2 },
              { x: "b", y: 3 },
              { x: "c", y: 5 },
              { x: "d", y: 4 },
              { x: "e", y: 7 },
            ]}
          />
          <VictoryArea
            data={[
              { x: "a", y: 1 },
              { x: "b", y: 4 },
              { x: "c", y: 5 },
              { x: "d", y: 7 },
              { x: "e", y: 5 },
            ]}
          />
          <VictoryArea
            data={[
              { x: "a", y: 3 },
              { x: "b", y: 2 },
              { x: "c", y: 6 },
              { x: "d", y: 2 },
              { x: "e", y: 6 },
            ]}
          />
          <VictoryArea
            data={[
              { x: "a", y: 2 },
              { x: "b", y: 3 },
              { x: "c", y: 3 },
              { x: "d", y: 4 },
              { x: "e", y: 7 },
            ]}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart
        polar
        backgroundComponent={<Background />}
        style={{ background: { fill: "pink" } }}
      >
        <VictoryBar />
      </VictoryChart>
      <VictoryChart
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={{
              x: [0, 5],
            }}
          />
        }
      >
        <VictoryBar barRatio={1.2} data={generateRandomData(10)} />
      </VictoryChart>
    </ScrollView>
  );
};
