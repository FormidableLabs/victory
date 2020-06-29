import React from "react";
import PropTypes from "prop-types";
import { times } from "lodash";
import {
  VictoryChart,
  VictoryScatter,
  VictoryPie,
  VictoryLine,
  VictoryStack,
  VictoryBar,
  VictoryAxis
} from "victory";

const scatterData = times(20, i => ({
  x: (i - 10) / 3,
  y: i / 2 - 2 * Math.random() - 4
}));

const toInteger = number => parseInt(number).toString();

const DemoComponent = ({ theme }) => {
  const positions = [
    { transform: "translate(0, -15)" },
    { transform: "translate(180, -40)" },
    { transform: "translate(-10, 140)" },
    { transform: "translate(180, 140)" }
  ];
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-labelledby="title desc"
      style={{
        height: "auto",
        width: "100%"
      }}
    >
      <g transform={positions[0].transform}>
        <VictoryPie
          theme={theme}
          standalone={false}
          style={{ labels: { padding: 10 } }}
          height={200}
          width={200}
        />
      </g>
      <g transform={positions[1].transform}>
        <VictoryChart theme={theme} standalone={false} height={250} width={250}>
          <VictoryAxis tickCount={3} tickFormat={toInteger} />
          <VictoryAxis tickCount={4} dependentAxis />
          <VictoryScatter size={2} data={scatterData} />
        </VictoryChart>
      </g>

      <g transform={positions[2].transform}>
        <VictoryChart theme={theme} standalone={false} height={250} width={250}>
          <VictoryAxis tickCount={4} domain={[0, 3]} tickFormat={toInteger} />
          <VictoryAxis tickCount={4} dependentAxis domain={[0, 10]} />
          <VictoryLine y={data => data.x * data.x} />
        </VictoryChart>
      </g>

      <g transform={positions[3].transform}>
        <VictoryChart
          standalone={false}
          theme={theme}
          height={250}
          width={250}
          domainPadding={{ x: 40 }}
        >
          <VictoryAxis tickFormat={["A", "B", "C"]} />
          <VictoryAxis tickCount={3} dependentAxis />
          <VictoryStack>
            <VictoryBar
              data={[
                {
                  x: "A",
                  y: 1
                },
                {
                  x: "B",
                  y: 3
                },
                {
                  x: "C",
                  y: 3
                }
              ]}
            />
            <VictoryBar
              data={[
                {
                  x: "A",
                  y: 2
                },
                {
                  x: "B",
                  y: 1
                },
                {
                  x: "C",
                  y: 3
                }
              ]}
            />
            <VictoryBar
              data={[
                {
                  x: "A",
                  y: 3
                },
                {
                  x: "B",
                  y: 1
                },
                {
                  x: "C",
                  y: 1
                }
              ]}
            />
          </VictoryStack>
        </VictoryChart>
      </g>
    </svg>
  );
};

DemoComponent.propTypes = {
  theme: PropTypes.object
};

export default DemoComponent;
