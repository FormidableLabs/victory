/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryBar } from "../packages/victory-bar/src";
import { VictoryChart } from "../packages/victory-chart/src";
import { VictoryGroup } from "../packages/victory-group/src/index";
import { VictoryStack } from "../packages/victory-stack/src/index";
import { VictoryTooltip } from "../packages/victory-tooltip/src/index";
import { VictoryTheme, VictoryLabel } from "../packages/victory-core/src/index";
import { VictoryPolarAxis } from "../packages/victory-polar-axis/src/index";
import {
  getData,
  getStackedData,
  getMixedData,
  getTimeData,
  getLogData,
} from "./data";
import { fromJS } from "immutable";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center"
};

const parentStyle = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" }
};

const defaultChartProps = {
  style: parentStyle, theme: VictoryTheme.material
};

export default {
  title: "VictoryBar",
  component: VictoryBar
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryBar {...defaultChartProps}/>
      <VictoryBar style={parentStyle}/>
    </div>
  );
}

export const Theme = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(8)} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryBar data={getData(8)} />
          <VictoryBar data={getData(8, "seed-1")} />
          <VictoryBar data={getData(8, "seed-2")} />
          <VictoryBar data={getData(8, "seed-3")} />
          <VictoryBar data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.grayscale}>
        <VictoryBar data={getData(8)} />
      </VictoryChart>
      <VictoryChart style={parentStyle} theme={VictoryTheme.grayscale}>
        <VictoryStack labels={({ datum }) => datum.x}>
          <VictoryBar data={getData(8)} />
          <VictoryBar data={getData(8, "seed-1")} />
          <VictoryBar data={getData(8, "seed-2")} />
          <VictoryBar data={getData(8, "seed-3")} />
          <VictoryBar data={getData(8, "seed-4")} />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
}

export const Alignment = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} alignment="start" />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getData(7)} alignment="start" />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} alignment="middle" />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getData(7)} alignment="middle" />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} alignment="end" />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getData(7)} alignment="end" />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getMixedData(5)} alignment="start" />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getMixedData(5)} alignment="start" />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getMixedData(5)} alignment="end" />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getMixedData(5)} alignment="end" />
      </VictoryChart>
    </div>
  );
}

export const BarRatio = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(2)} barRatio={0.01} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(50)} barRatio={0.01} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} barRatio={0.01} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getData(7)} barRatio={0.01} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(2)} barRatio={0.5} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(50)} barRatio={0.5} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} barRatio={0.5} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getData(7)} barRatio={0.5} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(2)} barRatio={1} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(50)} barRatio={1} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} barRatio={1} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getData(7)} barRatio={1} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(2)} barRatio={1.5} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(50)} barRatio={1.5} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} barRatio={1.5} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getData(7)} barRatio={1.5} />
      </VictoryChart>
    </div>
  );
}

export const BarWidth = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} barWidth={5} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} barWidth={10} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} barWidth={20} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} barWidth={({ datum }) => datum.x * 4} />
      </VictoryChart>
    </div>
  );
}

export const CornerRadius = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} cornerRadius={1} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} cornerRadius={5} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} cornerRadius={7} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getData(7)} cornerRadius={7} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getMixedData(7)} barWidth={40} cornerRadius={20} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getMixedData(7)} barWidth={40} cornerRadius={20} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar
          data={getMixedData(7)}
          barWidth={40}
          cornerRadius={{ topLeft: 5, topRight: 20, bottomLeft: 20, bottomRight: 0 }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          data={getMixedData(7)}
          barWidth={40}
          cornerRadius={{ topLeft: 5, topRight: 20, bottomLeft: 20, bottomRight: 0 }}
        />
      </VictoryChart>
      <VictoryChart polar innerRadius={60} {...defaultChartProps}>
        <VictoryBar
          data={[
            { x: 45, y: 6 },
            { x: 90, y: 30 },
            { x: 135, y: 65 },
            { x: 180, y: 50 },
            { x: 270, y: 40 },
            { x: 315, y: 30 }
          ]}
          style={{ data: { fill: "tomato", width: 40 } }}
          cornerRadius={{ topRight: 1, topLeft: 20, bottomRight: 5, bottomLeft: 0 }}
        />
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryBar
          data={[
            { x: 45, y: 6 },
            { x: 90, y: 30 },
            { x: 135, y: 65 },
            { x: 180, y: 50 },
            { x: 270, y: 40 },
            { x: 315, y: 30 }
          ]}
          style={{ data: { fill: "tomato", width: 40 } }}
          cornerRadius={{ topRight: 1, topLeft: 20, bottomRight: 5, bottomLeft: 0 }}
        />
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
        />
      </VictoryChart>
    </div>
  );
}

export const GetPath = () => {
  const verticalPathFn = (props) => {
    //eslint-disable-next-line react/prop-types
    const { x0, x1, y0, y1 } = props;
    return `M ${x0}, ${y0}
      L ${(x1 + x0) / 2}, ${y1}
      L ${x1}, ${y0}
      z`;
  };

  const horizontalPathFn = (props) => {
    //eslint-disable-next-line react/prop-types
    const { x0, x1, y0, y1 } = props;
    return `M ${x0}, ${y1}
      L ${x1}, ${(y0 + y1) / 2}
      L ${x0}, ${y0}
      z`;
  };

  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(7)} getPath={verticalPathFn} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getData(7)} getPath={horizontalPathFn} />
      </VictoryChart>
    </div>
  );
}

export const Data = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          data={[
            { animal: "Cat", pet: 45, wild: 17 },
            { animal: "Dog", pet: 85, wild: 6 },
            { animal: "Fish", pet: 55, wild: 0 },
            { animal: "Bird", pet: 15, wild: 40 }
          ]}
          x={"animal"}
          y={(data) => data.pet + data.wild}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getData(8)} y0={(d) => d.y - d.x} />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getData(8)} y0={(d) => d.y - d.x} />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryBar data={getData(8)} y0={(d) => d.y - d.x} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          data={[
            { a: { b: { c: 1, d: 1 } } },
            { a: { b: { c: 2, d: 3 } } },
            { a: { b: { c: 3, d: 2 } } }
          ]}
          x={"a.b.c"}
          y={"a.b.d"}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          data={fromJS([
            { x: 1, y: 2, label: "cat" },
            { x: 2, y: 5, label: "dog" },
            { x: 3, y: 3, label: "dog" },
            { x: 4, y: -2, label: "bird" },
            { x: 5, y: -5, label: "cat" }
          ])}
        />
      </VictoryChart>
    </div>
  );
}

export const Labels = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryBar data={getData(7)} labels={({ datum }) => `x: ${datum.x}`} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryBar data={getData(7)} labels={["", "", "three", "four", 5, "six"]} />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          data={[
            { x: 1, y: 2, label: "cat" },
            { x: 2, y: 5, label: "dog" },
            { x: 3, y: 3, label: "dog" },
            { x: 4, y: -2, label: "bird" },
            { x: 5, y: -5, label: "cat" }
          ]}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps} domainPadding={{ y: 20 }}>
        <VictoryBar
          data={[
            { x: 1, y: 2, label: "cat" },
            { x: 2, y: 5, label: "dog" },
            { x: 3, y: 3, label: "dog" },
            { x: 4, y: 2, label: "bird" },
            { x: 5, y: 5, label: "cat" }
          ]}
        />
        <VictoryPolarAxis />
      </VictoryChart>
    </div>
  );
}

export const Tooltips = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          data={getData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          data={getMixedData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          data={getMixedData(5)}
          labels={({ datum }) => `x: ${datum.x}`}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          data={getData(5)}
          labels={["one", "two", 3, "wow, four tooltips", "five"]}
          labelComponent={<VictoryTooltip active />}
        />
      </VictoryChart>
      <VictoryChart polar {...defaultChartProps}>
        <VictoryBar
          data={getData(5)}
          style={{ data: { width: 20 } }}
          labels={["one", "two", 3, "wow, four tooltips", "five"]}
          labelComponent={<VictoryTooltip active />}
        />
        <VictoryPolarAxis />
      </VictoryChart>
    </div>
  );
}

export const Style = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          labels={({ datum }) => datum.y}
          style={{
            labels: { fontSize: 20, fill: "tomato", fontFamily: "monospace" },
            data: { fill: "tomato", fillOpacity: 0.7, stroke: "tomato", strokeWidth: 2 }
          }}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={10}>
        <VictoryBar
          style={{
            labels: {
              fill: ({ datum }) => (datum.x === "Dog" ? "red" : "black")
            },
            data: {
              stroke: ({ datum }) => (datum.y > 75 ? "red" : "transparent"),
              strokeWidth: 3,
              opacity: ({ datum }) => (datum.y > 75 ? 1 : 0.4)
            }
          }}
          labels={({ datum }) => datum.x}
          data={[{ x: "Cat", y: 62 }, { x: "Dog", y: 91 }, { x: "Fish", y: 55 }, { x: "Bird", y: 55 }]}
        />
      </VictoryChart>
    </div>
  );
}

export const Scale = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps} scale={{ y: "log" }} minDomain={1}>
        <VictoryBar
          data={getLogData(7)}
          labels={({ datum }) => datum.y.toPrecision(1) }
        />
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} scale={{ y: "log" }} minDomain={1}>
        <VictoryBar
          data={getLogData(7)}
          labels={({ datum }) => datum.y.toPrecision(1) }
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar data={getTimeData(5)} labels={({ datum }) => datum.x.getFullYear()}/>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryBar data={getTimeData(5)} labels={({ datum }) => datum.x.getFullYear()}/>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryBar data={getTimeData(5)} />
          <VictoryBar data={getTimeData(5, "seed-1")} />
          <VictoryBar data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryStack labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryBar data={getTimeData(5)} />
          <VictoryBar data={getTimeData(5, "seed-1")} />
          <VictoryBar data={getTimeData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryGroup offset={10} labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryBar data={getTimeData(5)} />
          <VictoryBar data={getTimeData(5, "seed-1")} />
          <VictoryBar data={getTimeData(5, "seed-2")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps}>
        <VictoryGroup offset={10} labels={({ datum }) => datum.x.getFullYear()}>
          <VictoryBar data={getTimeData(5)} />
          <VictoryBar data={getTimeData(5, "seed-1")} />
          <VictoryBar data={getTimeData(5, "seed-2")} />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}

export const StackedBars = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryStack labels={({ datum }) => datum._y1.toPrecision(2)}>
          <VictoryBar data={getData(7)} />
          <VictoryBar data={getData(7, "seed-1")} />
          <VictoryBar data={getData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryStack>
          <VictoryBar
            data={getData(7)}
            labels={({ datum }) => datum.y.toPrecision(2)}
            labelComponent={<VictoryLabel renderInPortal />}
          />
          <VictoryBar
            data={getData(7, "seed-1")}
            labels={({ datum }) => datum.y.toPrecision(2)}
            labelComponent={<VictoryLabel renderInPortal />}
          />
          <VictoryBar
            data={getData(7, "seed-2")}
            labels={({ datum }) => datum.y.toPrecision(2)}
            labelComponent={<VictoryLabel renderInPortal />}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryStack labels={({ datum }) => datum._y1.toPrecision(2)}>
          <VictoryBar data={getData(9)} />
          <VictoryBar data={getData(5, "seed-1")} />
          <VictoryBar data={getData(3, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryStack labels={({ datum }) => datum._y1.toPrecision(2)} >
          <VictoryBar data={getMixedData(7)} />
          <VictoryBar data={getMixedData(7, "seed-1")} />
          <VictoryBar data={getMixedData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} domainPadding={8}>
        <VictoryStack labels={({ datum }) => datum._y1.toPrecision(2)} >
          <VictoryBar data={getMixedData(7)} />
          <VictoryBar data={getMixedData(7, "seed-1")} />
          <VictoryBar data={getMixedData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={8}>
        <VictoryStack
          labels={({ datum }) => datum._y1.toPrecision(2)}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryBar data={getMixedData(7)} />
          <VictoryBar data={getMixedData(7, "seed-1")} />
          <VictoryBar data={getMixedData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} domainPadding={8}>
        <VictoryStack
          labels={({ datum }) => datum._y1.toPrecision(2)}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryBar data={getMixedData(7)} />
          <VictoryBar data={getMixedData(7, "seed-1")} />
          <VictoryBar data={getMixedData(7, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryStack>
          <VictoryBar data={getData(90)} />
          <VictoryBar data={getData(50, "seed-1")} />
          <VictoryBar data={getData(200, "seed-2")} />
          <VictoryBar data={getData(30, "seed-3")} />
          <VictoryBar data={getData(200, "seed-4")} />
          <VictoryBar data={getData(100, "seed-5")} />
          <VictoryBar data={getData(200, "seed-6")} />
          <VictoryBar data={getData(190, "seed-7")} />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
}

export const GroupedBars = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps} domainPadding={30}>
        <VictoryGroup offset={20} labels={({ datum }) => datum.x}>
          <VictoryBar data={getData(3)} />
          <VictoryBar data={getData(3, "seed-1")} />
          <VictoryBar data={getData(3, "seed-2")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={30}>
        <VictoryGroup offset={10} labels={({ datum }) => datum.x}>
          <VictoryBar data={getData(5)} />
          <VictoryBar data={getData(3, "seed-1")} />
          <VictoryBar data={getData(2, "seed-2")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={30}>
        <VictoryGroup offset={20} labels={({ datum }) => datum.x} >
          <VictoryBar data={getMixedData(3)} />
          <VictoryBar data={getMixedData(3, "seed")} />
          <VictoryBar data={getMixedData(3, "seed-1")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} domainPadding={30}>
        <VictoryGroup offset={20} labels={({ datum }) => datum.x} >
          <VictoryBar data={getMixedData(3)} />
          <VictoryBar data={getMixedData(3, "seed")} />
          <VictoryBar data={getMixedData(3, "seed-1")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={30}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryBar data={getMixedData(3)} />
          <VictoryBar data={getMixedData(3, "seed")} />
          <VictoryBar data={getMixedData(3, "seed-1")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} domainPadding={30}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryBar data={getMixedData(3)} />
          <VictoryBar data={getMixedData(3, "seed")} />
          <VictoryBar data={getMixedData(3, "seed-1")} />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={30}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          style={{ data: { width: 15 } }}
        >
          <VictoryStack colorScale="red">
            <VictoryBar data={getData(3)} />
            <VictoryBar data={getData(3, "seed-1")} />
            <VictoryBar data={getData(3, "seed-2")} />
          </VictoryStack>
          <VictoryStack colorScale="green">
            <VictoryBar data={getData(3)} />
            <VictoryBar data={getData(3, "seed-3")} />
            <VictoryBar data={getData(3, "seed-4")} />
          </VictoryStack>
          <VictoryStack colorScale="blue">
            <VictoryBar data={getData(3)} />
            <VictoryBar data={getData(3, "seed-5")} />
            <VictoryBar data={getData(3, "seed-6")} />
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} domainPadding={30}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          style={{ data: { width: 15 } }}
        >
          <VictoryStack colorScale="red">
            <VictoryBar data={getData(3)} />
            <VictoryBar data={getData(3, "seed-1")} />
            <VictoryBar data={getData(3, "seed-2")} />
          </VictoryStack>
          <VictoryStack colorScale="green">
            <VictoryBar data={getData(3)} />
            <VictoryBar data={getData(3, "seed-3")} />
            <VictoryBar data={getData(3, "seed-4")} />
          </VictoryStack>
          <VictoryStack colorScale="blue">
            <VictoryBar data={getData(3)} />
            <VictoryBar data={getData(3, "seed-5")} />
            <VictoryBar data={getData(3, "seed-6")} />
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart {...defaultChartProps} domainPadding={30}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryStack colorScale="red">
            <VictoryBar data={getMixedData(3)} />
            <VictoryBar data={getMixedData(3, "seed-1")} />
            <VictoryBar data={getMixedData(3, "seed-2")} />
          </VictoryStack>
          <VictoryStack colorScale="green">
            <VictoryBar data={getMixedData(3)} />
            <VictoryBar data={getMixedData(3, "seed-3")} />
            <VictoryBar data={getMixedData(3, "seed-4")} />
          </VictoryStack>
          <VictoryStack colorScale="blue">
            <VictoryBar data={getMixedData(3)} />
            <VictoryBar data={getMixedData(3, "seed-5")} />
            <VictoryBar data={getMixedData(3, "seed-6")} />
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart horizontal {...defaultChartProps} domainPadding={30}>
        <VictoryGroup
          offset={20}
          labels={({ datum }) => datum.x}
          labelComponent={<VictoryTooltip active />}
        >
          <VictoryStack colorScale="red">
            <VictoryBar data={getMixedData(3)} />
            <VictoryBar data={getMixedData(3, "seed-1")} />
            <VictoryBar data={getMixedData(3, "seed-2")} />
          </VictoryStack>
          <VictoryStack colorScale="green">
            <VictoryBar data={getMixedData(3)} />
            <VictoryBar data={getMixedData(3, "seed-3")} />
            <VictoryBar data={getMixedData(3, "seed-4")} />
          </VictoryStack>
          <VictoryStack colorScale="blue">
            <VictoryBar data={getMixedData(3)} />
            <VictoryBar data={getMixedData(3, "seed-5")} />
            <VictoryBar data={getMixedData(3, "seed-6")} />
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}

export const PolarBars = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryBar
          style={{ data: { width: 20 } }}
          data={getData(7)}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryBar
          style={{ data: { stroke: "red", strokeWidth: 2 } }}
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
            { x: "Frog", y: 75 }
          ]}
        />
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar endAngle={180}>
        <VictoryBar
          style={{ data: { stroke: "red", strokeWidth: 2 } }}
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
            { x: "Frog", y: 75 }
          ]}
        />
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryStack colorScale="qualitative">
          <VictoryBar data={getData(7)} />
          <VictoryBar data={getData(7, "seed-1")} />
          <VictoryBar data={getData(7, "seed-2")} />
        </VictoryStack>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryStack colorScale="qualitative" style={{ data: { width: 15 } }}>
          <VictoryBar data={getData(7)} />
          <VictoryBar data={getData(7, "seed-1")} />
          <VictoryBar data={getData(7, "seed-2")} />
        </VictoryStack>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar>
        <VictoryGroup offset={25} colorScale="qualitative" style={{ data: { width: 15 } }}>
          <VictoryBar data={getData(5)} />
          <VictoryBar data={getData(5, "seed-1")} />
          <VictoryBar data={getData(5, "seed-2")} />
        </VictoryGroup>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar innerRadius={50}>
        <VictoryGroup offset={25} colorScale="qualitative" style={{ data: { width: 15 } }}>
          <VictoryBar data={getData(5)} />
          <VictoryBar data={getData(5, "seed-1")} />
          <VictoryBar data={getData(5, "seed-2")} />
        </VictoryGroup>
        <VictoryPolarAxis />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} polar endAngle={180} innerRadius={50}>
        <VictoryStack colorScale="qualitative" style={{ data: { width: 15 } }}>
          <VictoryBar data={getData(5)} />
          <VictoryBar data={getData(5, "seed-1")} />
          <VictoryBar data={getData(5, "seed-2")} />
        </VictoryStack>
        <VictoryPolarAxis />
      </VictoryChart>
    </div>
  );
}

export const Sorting = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          data={[
            { x: "low", y: 1, sort: 1 },
            { x: "med", y: 2, sort: 2 },
            { x: "high", y: 3, sort: 3 }
          ]}
          sortKey={"sort"}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBar
          data={[
            { x: "low", y: 1, sort: 1 },
            { x: "med", y: 2, sort: 2 },
            { x: "high", y: 3, sort: 3 }
          ]}
          sortKey={"sort"}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps}>
        <VictoryBar
          data={[
            { x: "low", y: 1, sort: 3 },
            { x: "med", y: 2, sort: 2 },
            { x: "high", y: 3, sort: 1 }
          ]}
          sortKey={"sort"}
        />
      </VictoryChart>
      <VictoryChart {...defaultChartProps} horizontal>
        <VictoryBar
          data={[
            { x: "low", y: 1, sort: 3 },
            { x: "med", y: 2, sort: 2 },
            { x: "high", y: 3, sort: 1 }
          ]}
          sortKey={"sort"}
        />
      </VictoryChart>
    </div>
  );
}

export const Regressions = () => {
  return (
    <div style={containerStyle}>
      <VictoryChart {...defaultChartProps}>
        <VictoryGroup offset={20} style={{ data: { width: 10 } }}>
          <VictoryStack colorScale={"red"}>
            {getStackedData(5, 3, "useStrings").map((data, index) => {
              return <VictoryBar horizontal key={index} data={data} />;
            })}
          </VictoryStack>
          <VictoryStack colorScale={"green"}>
            {getStackedData(5, 3, "useStrings").map((data, index) => {
              return <VictoryBar horizontal key={index} data={data} />;
            })}
          </VictoryStack>
          <VictoryStack colorScale={"blue"}>
            {getStackedData(5, 3, "useStrings").map((data, index) => {
              return <VictoryBar horizontal key={index} data={data} />;
            })}
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}
