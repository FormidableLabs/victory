import React from "react";
import { VictoryBar } from "../packages/victory-bar";
import { VictoryTooltip, Flyout } from "../packages/victory-tooltip";
import { VictoryLabel } from "../packages/victory-core";
import { getData, getMixedData } from "./data";
import styled from "styled-components";
import { storyContainer } from "./decorators";
import { Meta } from "@storybook/react";

const meta: Meta<typeof VictoryTooltip> = {
  title: "Victory Charts/SVG Container/VictoryTooltip",
  component: VictoryTooltip,
  parameters: {
    chromatic: { viewports: [1200] },
  },
  tags: ["autodocs"],
  decorators: [storyContainer],
};

export default meta;

const style = {
  parent: { border: "1px solid #ccc", margin: "1%", maxWidth: "25%" },
  labels: { fontFamily: "arial" },
  data: { fill: "gold", width: 20 },
};

const defaultBarProps = {
  style,
  width: 300,
  height: 300,
  domainPadding: { y: 25 },
  data: getMixedData(5),
  labels: () => "Label",
  size: 5,
};

const polarBarProps = {
  style,
  polar: true,
  width: 300,
  height: 300,
  domainPadding: { y: 25 },
  data: getData(5),
  labels: () => "Label",
  size: 5,
};

export const DefaultRendering = () => {
  return (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={<VictoryTooltip active />}
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={<VictoryTooltip active />}
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={<VictoryTooltip active />}
      />
    </>
  );
};

export const CenterOffset = () => {
  return (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip active centerOffset={{ x: 20 }} text={`x\noffset`} />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip active centerOffset={{ x: 20 }} text={`x\noffset`} />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip active centerOffset={{ x: 20 }} text={`x\noffset`} />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip active centerOffset={{ y: 20 }} text={`y\noffset`} />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip active centerOffset={{ y: 20 }} text={`y\noffset`} />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip active centerOffset={{ y: 20 }} text={`y\noffset`} />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{ x: 20, y: 20 }}
            text={`x, y\noffset`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{ x: 20, y: 20 }}
            text={`x, y\noffset`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{ x: 20, y: 20 }}
            text={`x, y\noffset`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{ y: ({ datum }) => (datum.y < 0 ? 10 : -10), x: 10 }}
            text={`function\noffset`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{
              x: ({ datum }) => (datum.y < 0 ? -10 : 10),
              y: -10,
            }}
            text={`function\noffset`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{
              y: ({ index }) => (Number(index) < 3 ? -10 : 10),
              x: 10,
            }}
            text={`function\noffset`}
          />
        }
      />
    </>
  );
};

export const PointerOrientation = () => {
  return (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            pointerOrientation={({ datum }) => (datum.y > 0 ? "bottom" : "top")}
            text={({ datum }) =>
              datum.y > 0 ? `orientation\nbottom` : `orientation\ntop`
            }
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{
              y: ({ datum }) => (datum.y > 0 ? -40 : 40),
              x: ({ datum }) => (datum.y > 0 ? -20 : 20),
            }}
            pointerOrientation={({ datum }) => (datum.y > 0 ? "bottom" : "top")}
            text={({ datum }) =>
              datum.y > 0 ? `orientation\nbottom` : `orientation\ntop`
            }
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            pointerOrientation={({ index }) => (index < 3 ? "bottom" : "top")}
            text={({ index }) =>
              Number(index) < 3 ? `orientation\nbottom` : `orientation\ntop`
            }
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{
              x: ({ datum }) => (datum.y > 0 ? 55 : -55),
            }}
            pointerOrientation={({ datum }) => (datum.y > 0 ? "left" : "right")}
            text={({ datum }) =>
              datum.y > 0 ? `orientation\nleft` : `orientation\nright`
            }
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            pointerOrientation={({ datum }) => (datum.y > 0 ? "left" : "right")}
            text={({ datum }) =>
              datum.y > 0 ? `orientation\nleft` : `orientation\nright`
            }
          />
        }
      />

      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            labelPlacement="parallel"
            pointerOrientation={({ index }) =>
              index === 2 || index === 3 ? "right" : "left"
            }
            text={({ index }) =>
              index === 2 || index === 3
                ? `orientation\nleft`
                : `orientation\nright`
            }
          />
        }
      />
    </>
  );
};

export const ConstrainToVisibleArea = () => {
  return (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            constrainToVisibleArea
            centerOffset={{
              y: ({ datum }) => (datum.y > 0 ? -40 : 40),
              x: ({ datum }) => (datum.y > 0 ? -20 : 20),
            }}
            pointerOrientation={({ datum }) => (datum.y > 0 ? "bottom" : "top")}
            text={`constrain\nto\nvisible\narea`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            constrainToVisibleArea
            centerOffset={{
              y: ({ datum }) => (datum.y > 0 ? -60 : 60),
              x: ({ datum }) => (datum.y > 0 ? -10 : 10),
            }}
            pointerOrientation={({ datum }) => (datum.y > 0 ? "bottom" : "top")}
            text={`constrain to\nvisible area`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            constrainToVisibleArea
            centerOffset={{
              x: ({ datum }) => (datum.y > 0 ? 70 : -70),
              y: ({ datum }) => (datum.y > 0 ? -10 : 10),
            }}
            pointerOrientation={({ datum }) => (datum.y > 0 ? "left" : "right")}
            text={`constrain to\nvisible area`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            constrainToVisibleArea
            centerOffset={{
              x: ({ datum }) => (datum.y > 0 ? 70 : -70),
              y: ({ datum }) => (datum.y > 0 ? -10 : 10),
            }}
            pointerOrientation={({ datum }) => (datum.y > 0 ? "left" : "right")}
            text={`constrain\nto\nvisible\narea`}
          />
        }
      />
    </>
  );
};

export const FlyoutHeight = () => {
  return (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip active flyoutHeight={50} text={`flyoutHeight\n50`} />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip active flyoutHeight={50} text={`flyoutHeight\n50`} />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip active flyoutHeight={50} text={`flyoutHeight\n50`} />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            flyoutHeight={({ text }) => (text === "short" ? 20 : 50)}
            text={({ datum }) => (datum.y < 0 ? "short" : "tall")}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            flyoutHeight={({ text }) => (text === "short" ? 20 : 50)}
            text={({ datum }) => (datum.y < 0 ? "short" : "tall")}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            flyoutHeight={({ text }) => (text === "short" ? 20 : 50)}
            text={({ index }) => (Number(index) > 2 ? "short" : "tall")}
          />
        }
      />
    </>
  );
};

export const FlyoutWidth = () => {
  return (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip active flyoutWidth={100} text={`flyoutWidth\n100`} />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip active flyoutWidth={100} text={`flyoutWidth\n100`} />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip active flyoutWidth={100} text={`flyoutWidth\n100`} />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            flyoutWidth={({ text }) => (text === "short" ? 35 : 100)}
            text={({ datum }) => (datum.y < 0 ? "short" : "long")}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            flyoutWidth={({ text }) => (text === "short" ? 35 : 100)}
            text={({ datum }) => (datum.y < 0 ? "short" : "long")}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            flyoutWidth={({ text }) => (text === "short" ? 35 : 100)}
            text={({ index }) => (Number(index) > 2 ? "short" : "long")}
          />
        }
      />
    </>
  );
};

export const PointerWidth = () => {
  return (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            pointerWidth={20}
            centerOffset={{ x: ({ index }) => (index === 0 ? -20 : 0) }}
            text={`pointerWidth\n20`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            pointerWidth={20}
            centerOffset={{ y: ({ index }) => (index === 0 ? 20 : 0) }}
            text={`pointerWidth\n20`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            pointerWidth={20}
            centerOffset={{ x: ({ index }) => (index === 0 ? 20 : 0) }}
            text={`pointerWidth\n20`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{ x: ({ index }) => (Number(index) < 2 ? -20 : 0) }}
            pointerWidth={({ text }) => (text === "skinny" ? 0 : 20)}
            text={({ datum }) => (datum.y < 0 ? "skinny" : "wide ")}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{ y: ({ index }) => (Number(index) < 2 ? 20 : 0) }}
            pointerWidth={({ text }) => (text === "skinny" ? 0 : 20)}
            text={({ datum }) => (datum.y < 0 ? "skinny" : "wide ")}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{
              x: ({ index }) => (index === 0 || index === 4 ? 20 : 0),
            }}
            pointerWidth={({ text }) => (text === "skinny" ? 0 : 20)}
            text={({ index }) => (Number(index) > 2 ? "skinny" : "wide ")}
          />
        }
      />
    </>
  );
};

export const PointerLength = () => {
  return (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{ x: ({ index }) => (index === 0 ? -20 : 0) }}
            pointerLength={30}
            text={`pointerLength\n30`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            pointerLength={30}
            centerOffset={{ y: ({ index }) => (index === 0 ? 20 : 0) }}
            text={`pointerLength\n30`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            pointerLength={30}
            centerOffset={{ x: ({ index }) => (index === 0 ? 20 : 0) }}
            text={`pointerLength\n30`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{ x: ({ index }) => (Number(index) < 2 ? 20 : 0) }}
            pointerLength={({ text }) => (text === "short" ? 1 : 30)}
            text={({ datum }) => (datum.y < 0 ? "short" : "long ")}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{ y: ({ index }) => (Number(index) < 2 ? 20 : 0) }}
            pointerLength={({ text }) => (text === "short" ? 1 : 30)}
            text={({ datum }) => (datum.y < 0 ? "short" : "long ")}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            centerOffset={{
              x: ({ index }) => (index === 0 || index === 4 ? 20 : 0),
            }}
            pointerLength={({ text }) => (text === "short" ? 1 : 30)}
            text={({ index }) => (Number(index) > 2 ? "short" : "long ")}
          />
        }
      />
    </>
  );
};

export const CornerRadius = () => {
  return (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip active cornerRadius={10} text={`cornerRadius\n10`} />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip active cornerRadius={10} text={`cornerRadius\n10`} />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip active cornerRadius={10} text={`cornerRadius\n10`} />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            cornerRadius={({ text }) => (text === "square" ? 0 : 5)}
            text={({ datum }) => (datum.y < 0 ? "square" : "rounded ")}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            cornerRadius={({ text }) => (text === "square" ? 0 : 5)}
            text={({ datum }) => (datum.y < 0 ? "square" : "rounded ")}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            cornerRadius={({ text }) => (text === "square" ? 0 : 5)}
            text={({ index }) => (Number(index) > 2 ? "square" : "rounded ")}
          />
        }
      />
    </>
  );
};

export const FlyoutStyle = () => {
  return (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            style={{ padding: 5, fontFamily: "arial" }}
            flyoutStyle={{
              stroke: "red",
              strokeWidth: 2,
              strokeDasharray: "1, 2",
            }}
            text={`flyoutStyle`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            style={{ padding: 5, fill: "red", fontFamily: "arial" }}
            flyoutStyle={{
              fill: "pink",
              strokeWidth: 0,
              opacity: 0.5,
              padding: 10,
            }}
            text={`flyoutStyle`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            style={{ padding: 10, fontFamily: "arial" }}
            flyoutStyle={{ fill: "cyan", strokeWidth: 0, opacity: 0.5 }}
            text={`flyoutStyle\npolar`}
          />
        }
      />
    </>
  );
};

export const FlyoutPadding = () => {
  return (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            flyoutPadding={{ top: 20, left: 15, right: 5 }}
            text={`flyoutPadding`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            active
            flyoutPadding={{ top: 30, bottom: 10 }}
            text={`flyoutPadding\nhorizontal`}
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            flyoutPadding={({ datum }) =>
              datum.y > 0 ? { top: 20, left: 15, right: 5 } : 2
            }
            text={`flyoutPadding\nfunction`}
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            active
            flyoutPadding={{ top: 20, left: 15, right: 5 }}
            text={`flyoutPadding\npolar`}
          />
        }
      />
    </>
  );
};

const StyledFlyout = styled(Flyout)`
  fill: aquamarine;
`;

const StyledLabel = styled(VictoryLabel)`
  fill: blue;
`;

export const DisableInlineStyles = () => {
  return (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={<VictoryTooltip active disableInlineStyles />}
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            active
            flyoutComponent={<StyledFlyout disableInlineStyles />}
            labelComponent={<StyledLabel disableInlineStyles />}
          />
        }
      />
    </>
  );
};
