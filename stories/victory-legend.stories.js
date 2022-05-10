/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryAxis } from "victory-axis";
import { VictoryChart } from "victory-chart";
import { VictoryLegend } from "victory-legend";
import { range, isFunction } from "lodash";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center"
};

const style = {
  parent: { border: "1px solid #ccc", margin: "1%", maxWidth: "25%" },
  data: { fill: "gold", width: 20 }
};

const defaultChartProps = {
  style,
  width: 300,
  height: 300,
  domain: [0, 10]
};

export default {
  title: "VictoryLegend",
  component: VictoryLegend
};

const legendStyle = {
  labels: { fontSize: 14, fontFamily: "Arial" },
  border: { fill: "pink", opacity: 0.4 }
};

const getData = (num, { getName, getSize, getSymbol, getFill } = {}) => {
  return range(num).map((v) => ({
    name: isFunction(getName) ? getName(v) : `Series ${v + 1}`,
    symbol: {
      size: isFunction(getSize) ? getSize(v) : 5,
      type: isFunction(getSymbol) ? getSymbol(v) : "circle",
      fill: isFunction(getFill) ? getFill(v) : undefined
    }
  }));
};

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => {
  return (
    <VictoryChart {...defaultChartProps}>
      <VictoryAxis />
      {children}
    </VictoryChart>
  );
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <Wrapper>
        <VictoryLegend />
      </Wrapper>
      <Wrapper>
        <VictoryLegend orientation="horizontal" />
      </Wrapper>
    </div>
  );
};

export const Title = () => {
  return (
    <div style={containerStyle}>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          orientation="horizontal"
          itemsPerRow={3}
          style={legendStyle}
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          centerTitle
          itemsPerRow={3}
          style={legendStyle}
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          centerTitle
          style={legendStyle}
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          orientation="horizontal"
          itemsPerRow={3}
          style={{ ...legendStyle, title: { padding: 20 } }}
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          itemsPerRow={3}
          style={legendStyle}
          titleOrientation="bottom"
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          itemsPerRow={3}
          style={legendStyle}
          titleOrientation="left"
          centerTitle
        />
      </Wrapper>
      <Wrapper>
        <VictoryLegend
          data={getData(5)}
          title={`TITLE\nmultiline`}
          itemsPerRow={3}
          style={legendStyle}
          titleOrientation="right"
          style={{ ...legendStyle, title: { padding: 20 } }}
        />
      </Wrapper>
    </div>
  );
};
