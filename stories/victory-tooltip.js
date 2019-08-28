/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryBar } from "../packages/victory-bar/src/index";
import { VictoryTooltip } from "../packages/victory-tooltip/src/index";
import { getChartDecorator } from "./decorators";
import { getData, getMixedData } from "./data";

storiesOf("VictoryTooltip.centerOffset", module)
  .addDecorator(
    getChartDecorator({
      domainPadding: 25,
      style: { parent: { border: "1px solid #ccc" } }
    })
  )
  .add("x centerOffset", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active dy={0} centerOffset={{ x: 20 }} />}
    />
  ))
  .add("y centerOffset", () => (
    <VictoryBar
      horizontal
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active dx={0} centerOffset={{ y: -10 }} />}
    />
  ))
  .add("centerOffset as a function", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={
        <VictoryTooltip
          active
          dy={0}
          centerOffset={{ y: ({ datum }) => (datum.y < 0 ? 10 : -10), x: 10 }}
        />
      }
    />
  ));

storiesOf("VictoryTooltip.constrainToVisibleArea", module)
  .addDecorator(
    getChartDecorator({
      domainPadding: 25,
      style: { parent: { border: "1px solid #ccc" } }
    })
  )
  .add("with wide tooltips", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum, index }) =>
        index === 0 || index === 4 ? `The x value of this point is: ${datum.x}` : `${datum.x}`
      }
      labelComponent={<VictoryTooltip active dy={0} constrainToVisibleArea />}
    />
  ))
  .add("with wide horizontal tooltips", () => (
    <VictoryBar
      horizontal
      data={getData(5)}
      labels={({ datum, index }) =>
        index === 0 || index === 4 ? `The x value of this point is: ${datum.x}` : `${datum.x}`
      }
      labelComponent={<VictoryTooltip active dx={0} constrainToVisibleArea />}
    />
  ))
  .add("with tall tooltips", () => (
    <VictoryBar
      data={getMixedData(5)}
      style={{ labels: { padding: 0 } }}
      labels={({ datum }) => `The x value\n of this\n point is:\n ${datum.x}`}
      labelComponent={<VictoryTooltip active dy={0} constrainToVisibleArea />}
    />
  ))
  .add("with tall horizontal tooltips", () => (
    <VictoryBar
      horizontal
      data={getData(5)}
      style={{ labels: { padding: 0 } }}
      labels={({ datum, index }) =>
        index === 0 || index === 4
          ? `The\n x\n value\n of \nthe \ncurrent \ndata \n point \nis:\n ${datum.x}`
          : datum.x
      }
      labelComponent={<VictoryTooltip active dx={0} constrainToVisibleArea />}
    />
  ));

storiesOf("VictoryTooltip.flyoutHeight", module)
  .addDecorator(
    getChartDecorator({
      domainPadding: 25,
      style: { parent: { border: "1px solid #ccc" } }
    })
  )
  .add("= 50", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active dy={0} flyoutHeight={50} />}
    />
  ))
  .add("= 50 horizontal", () => (
    <VictoryBar
      horizontal
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active dx={0} flyoutHeight={50} />}
    />
  ))
  .add("as a function", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={
        <VictoryTooltip active dy={0} flyoutHeight={({ datum }) => (datum.y < 0 ? 20 : 50)} />
      }
    />
  ));

storiesOf("VictoryTooltip.flyoutWidth", module)
  .addDecorator(
    getChartDecorator({
      domainPadding: 25,
      style: { parent: { border: "1px solid #ccc" } }
    })
  )
  .add("= 50", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active dy={0} flyoutWidth={50} />}
    />
  ))
  .add("= 50 horizontal", () => (
    <VictoryBar
      horizontal
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active dx={0} flyoutWidth={50} />}
    />
  ))
  .add("as a function", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={
        <VictoryTooltip active dy={0} flyoutWidth={({ datum }) => (datum.y < 0 ? 30 : 50)} />
      }
    />
  ));

storiesOf("VictoryTooltip.cornerRadius", module)
  .addDecorator(
    getChartDecorator({
      domainPadding: 25,
      style: { parent: { border: "1px solid #ccc" } }
    })
  )
  .add("= 0", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active dy={0} cornerRadius={0} />}
    />
  ))
  .add("= 10", () => (
    <VictoryBar
      horizontal
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active dx={0} cornerRadius={10} />}
    />
  ))
  .add("as a function", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active dy={0} cornerRadius={({ datum }) => datum.x * 2} />}
    />
  ));

storiesOf("VictoryTooltip.pointerOrientation", module)
  .addDecorator(
    getChartDecorator({
      domainPadding: 25,
      style: { parent: { border: "1px solid #ccc" } }
    })
  )
  .add("left", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active centerOffset={{ x: 40 }} pointerOrientation="left" />}
    />
  ))
  .add("right", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={
        <VictoryTooltip active centerOffset={{ x: -40 }} pointerOrientation="right" />
      }
    />
  ))
  .add("top", () => (
    <VictoryBar
      horizontal
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={<VictoryTooltip active centerOffset={{ y: 40 }} pointerOrientation="top" />}
    />
  ))
  .add("bottom", () => (
    <VictoryBar
      horizontal
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={
        <VictoryTooltip active centerOffset={{ y: -40 }} pointerOrientation="bottom" />
      }
    />
  ))
  .add("as a function", () => (
    <VictoryBar
      data={getMixedData(5)}
      labels={({ datum }) => `x: ${datum.x}`}
      labelComponent={
        <VictoryTooltip
          active
          centerOffset={{ x: 40 }}
          pointerOrientation={({ datum }) => (datum.y < 0 ? "top" : "left")}
        />
      }
    />
  ));
