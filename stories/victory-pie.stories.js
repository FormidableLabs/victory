/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/

import React from "react";
import { VictoryPie, Slice } from "../packages/victory-pie/src/index";
import { VictoryTooltip } from "../packages/victory-tooltip/src/index";
import { VictoryTheme, Helpers } from "../packages/victory-core/src/index";
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

export default {
  title: "VictoryPie",
  component: VictoryPie
};

export const DefaultRendering = () => {
  return (
    <div style={containerStyle}>
      <VictoryPie style={parentStyle} />
      <VictoryPie style={parentStyle} theme={VictoryTheme.material} />
    </div>
  );
};

export const Data = () => {
  return (
    <div style={containerStyle}>
      <VictoryPie
        style={parentStyle}
        data={[
         { x: "Cat", y: 62 },
         { x: "Dog", y: 91 },
         { x: "Fish", y: 55 },
         { x: "Bird", y: 55 }
       ]}
      />
      <VictoryPie
        style={parentStyle}
        data={[
          { animal: "Cat", pet: 45, wild: 17 },
          { animal: "Dog", pet: 85, wild: 6 },
          { animal: "Fish", pet: 55, wild: 0 },
          { animal: "Bird", pet: 15, wild: 40 }
        ]}
        x={"animal"}
        y={(data) => data.pet + data.wild}
      />
      <VictoryPie
        style={parentStyle}
        data={fromJS([
          { x: "Cat", y: 62 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 55 }
        ])}
      />
    </div>
  );
};

export const Radius = () => {
  return (
    <div style={containerStyle}>
      <VictoryPie
        style={parentStyle}
        radius={100}
      />
      <VictoryPie
        style={parentStyle}
        radius={({ datum }) => datum.radius}
        data={[
          { x: 1, y: 1, radius: 110 },
          { x: 2, y: 3, radius: 120 },
          { x: 3, y: 5, radius: 140 },
          { x: 4, y: 2, radius: 150 },
          { x: 5, y: 3, radius: 130 }
        ]}
      />
      <VictoryPie
        radius={({ datum }) => datum.y + 100}
        labelRadius={({ datum }) => datum.y + 50}
        style={{
          ...parentStyle,
          labels: { fill: "white" }
        }}
        data={[
          { x: "Cat", y: 62 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 25 }
        ]}
      />
      <VictoryPie
        innerRadius={80}
        radius={({ datum }) => datum.y + 100}
        labelRadius={({ datum }) => datum.y + 65}
        style={{
          ...parentStyle,
          labels: { fill: "white" }
        }}
        data={[
          { x: "Cat", y: 62 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 25 }
        ]}
      />
    </div>
  );
};

export const InnerRadius = () => {
  return (
    <div style={containerStyle}>
      <VictoryPie
        style={parentStyle}
        innerRadius={100}
      />
      <VictoryPie
        style={parentStyle}
        radius={({ datum }) => datum.radius}
        innerRadius={({ datum }) => datum.radius - 20}
        data={[
          { x: 1, y: 1, radius: 110 },
          { x: 2, y: 3, radius: 120 },
          { x: 3, y: 5, radius: 140 },
          { x: 4, y: 2, radius: 150 },
          { x: 5, y: 3, radius: 130 }
        ]}
      />
      <VictoryPie
        style={parentStyle}
        innerRadius={({ datum }) => datum.y + 10}
        labelRadius={({ datum }) => datum.y - 20}
        data={[
          { x: "Cat", y: 62 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 25 }
        ]}
      />
      <VictoryPie
        style={parentStyle}
        innerRadius={({ datum }) => datum.radius }
        data={[
          { x: 1, y: 1, radius: 50 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 2 },
          { x: 5, y: 3 }
        ]}
      />
    </div>
  );
};

export const CornerRadius = () => {
  return (
    <div style={containerStyle}>
      <VictoryPie
        style={parentStyle}
        cornerRadius={10}
      />
      <VictoryPie
        style={parentStyle}
        cornerRadius={10}
        innerRadius={100}
      />
      <VictoryPie
        style={parentStyle}
        cornerRadius={({ datum }) => datum.x * 5}
        innerRadius={100}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 2 },
          { x: 5, y: 3 }
        ]}
      />
      <VictoryPie
        style={parentStyle}
        cornerRadius={({ datum }) => datum.r}
        innerRadius={100}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 5, r: 15 },
          { x: 4, y: 2 },
          { x: 5, y: 3 }
        ]}
      />
    </div>
  );
};

export const PadAngle = () => {
  return (
    <div style={containerStyle}>
      <VictoryPie
        style={parentStyle}
        padAngle={6}
      />
      <VictoryPie
        style={parentStyle}
        padAngle={6}
        innerRadius={100}
      />
      <VictoryPie
        style={parentStyle}
        padAngle={({ datum }) => datum.x * 2}
        innerRadius={100}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 2 },
          { x: 5, y: 3 }
        ]}
      />
      <VictoryPie
        style={parentStyle}
        padAngle={({ datum }) => datum.r}
        innerRadius={100}
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: 5, r: 8 },
          { x: 4, y: 2 },
          { x: 5, y: 3 }
        ]}
      />
    </div>
  );
};

export const Labels = () => {
  return (
    <div style={containerStyle}>
      <VictoryPie
        style={parentStyle}
        labels={["one", "two", "three", "four"]}
      />
      <VictoryPie
        style={parentStyle}
        labels={({ index }) => `#${index}`}
      />
      <VictoryPie
        style={parentStyle}
        labels={({ index }) => `#${index}`}
        labelPosition="startAngle"
      />
      <VictoryPie
        style={parentStyle}
        labels={({ index }) => `#${index}`}
        labelPosition="endAngle"
      />
      <VictoryPie
        style={parentStyle}
        labels={({ index }) => `#${index}`}
        labelPosition={({ index }) => index ? undefined : "startAngle"}
      />
    </div>
  );
};

export const Tooltips = () => {
  return (
    <div style={containerStyle}>
      <VictoryPie
        style={parentStyle}
        radius={100}
        labels={["one", "two", "three labels", "four"]}
        labelComponent={<VictoryTooltip active />}

      />
      <VictoryPie
        style={parentStyle}
        radius={100}
        labelComponent={<VictoryTooltip active />}
      />
      <VictoryPie
        style={parentStyle}
        radius={100}
        labels={({ index }) => `#${index}`}
        labelPosition="startAngle"
        labelComponent={<VictoryTooltip active />}

      />
      <VictoryPie
        style={parentStyle}
        radius={100}
        labels={({ index }) => `#${index}`}
        labelPosition="endAngle"
        labelComponent={<VictoryTooltip active />}

      />
      <VictoryPie
        style={parentStyle}
        radius={100}
        labels={({ index }) => `#${index}`}
        labelPosition={({ index }) => index ? undefined : "startAngle"}
        labelComponent={<VictoryTooltip active />}
      />
    </div>
  );
};

export const LabelRadius = () => {
  return (
    <div style={containerStyle}>
      <VictoryPie
        style={{...parentStyle, labels: { fill: "magenta" } }}
        labelRadius={100}
      />
      <VictoryPie
        style={{...parentStyle, labels: { fill: "magenta" } }}
        labelRadius={({ datum }) => datum.y }
        radius={80}
        innerRadius={100}
        data={[
          { x: 1, y: 100 },
          { x: 2, y: 130 },
          { x: 3, y: 150 },
          { x: 4, y: 120 },
          { x: 5, y: 130 }
        ]}
      />
      <VictoryPie
        style={{...parentStyle, labels: { fill: "magenta" } }}
        labelRadius={({ datum }) => datum.r }
        innerRadius={100}
        data={[
          { x: 1, y: 100 },
          { x: 2, y: 130 },
          { x: 3, y: 150, r: 80 },
          { x: 4, y: 120 },
          { x: 5, y: 130 }
        ]}
      />
      <VictoryPie
        style={{...parentStyle, labels: { fill: "magenta" } }}
        labelRadius={({ datum }) => datum.r }
        innerRadius={100}
        labelPosition="startAngle"
        data={[
          { x: 1, y: 100 },
          { x: 2, y: 130 },
          { x: 3, y: 150, r: 80 },
          { x: 4, y: 120 },
          { x: 5, y: 130 }
        ]}
      />
    </div>
  );
};

export const Styles = () => {
  return (
    <div style={containerStyle}>
      <VictoryPie
        style={{
          ...parentStyle,
          labels: { fontSize: 20 },
          data: {
            stroke: "red",
            strokeWidth: 3,
            fillOpacity: 0.3
          }
       }}
      />
      <VictoryPie
        colorScale="cool"
        style={{
          ...parentStyle,
          labels: { fontSize: 20 },
          data: {
            fillOpacity: 0.3
          }
       }}
      />
      <VictoryPie
        style={{
          ...parentStyle,
          labels: {
            fontSize: ({ index }) => index === 4 ? 25 : 15
          },
          data: {
            stroke: ({ index }) => index === 4 ? "red" : undefined,
            strokeWidth: 3
          }
       }}
      />
      <VictoryPie
        style={{
          ...parentStyle,
          labels: {
            fill: "white",
            fontSize: 12,
            fontWeight: "bold"
          }
        }}
        data={[
          { x: "<5", y: 6279 },
          { x: "5-13", y: 9182 },
          { x: "14-17", y: 5511 },
          { x: "18-24", y: 7164 },
          { x: "25-44", y: 6716 },
          { x: "45-64", y: 4263 },
          { x: "≥65", y: 7502 }
        ]}
        innerRadius={100}
        labelRadius={110}
        colorScale={["#D85F49", "#F66D3B", "#D92E1D", "#D73C4C", "#FFAF59", "#E28300", "#F6A57F"]}
      />
    </div>
  );
};

export const StartAndEndAngles = () => {
  return (
    <div style={containerStyle}>
      <VictoryPie
        style={parentStyle}
        endAngle={90}
        startAngle={-90}
      />
      <VictoryPie
        style={parentStyle}
        endAngle={90}
        innerRadius={140}
        padAngle={5}
        startAngle={-90}
      />
      <VictoryPie
        style={parentStyle}
        dataComponent={<Slice sliceStartAngle={0} sliceEndAngle={({ datum }) => datum.endAngle} />}
        labels={() => null}
        cornerRadius={5}
        radius={({ datum }) => datum.radius}
        innerRadius={({ datum }) => datum.innerRadius}
        data={[
          { x: "Cat", y: 62, innerRadius: 0, radius: 30 },
          { x: "Dog", y: 91, innerRadius: 35, radius: 65 },
          { x: "Fish", y: 55, innerRadius: 70, radius: 100 },
          { x: "Bird", y: 55, innerRadius: 105, radius: 135, endAngle: 360 }
        ]}
      />
      <VictoryPie
        style={parentStyle}
        dataComponent={
          <Slice
            sliceStartAngle={-90}
            sliceEndAngle={({ slice }) => Helpers.radiansToDegrees(slice.endAngle) - 90 }
          />
        }
        labels={() => null}
        cornerRadius={5}
        radius={({ datum }) => datum.radius}
        innerRadius={({ datum }) => datum.innerRadius}
        data={[
          { x: "Cat", y: 62, innerRadius: 0, radius: 30 },
          { x: "Dog", y: 91, innerRadius: 35, radius: 65 },
          { x: "Fish", y: 55, innerRadius: 70, radius: 100 },
          { x: "Bird", y: 55, innerRadius: 105, radius: 135 }
        ]}
      />
    </div>
  );
};

export const Origin = () => {
  return (
    <div style={containerStyle}>
      <VictoryPie
        style={{...parentStyle, labels: { fill: "magenta" } }}
        origin={{ x: 150, y: 150 }}
        labelRadius={100}
      />
      <VictoryPie
        style={{...parentStyle, labels: { fill: "magenta" } }}
        origin={{ x: 150, y: 150 }}
        labelRadius={100}
        endAngle={90}
        startAngle={-90}
      />
      <VictoryPie
        style={{...parentStyle, labels: { fill: "magenta" } }}
        origin={{ y: 0 }}
        labelRadius={100}
        startAngle={-270}
        endAngle={-90}
      />
    </div>
  );
};






//   .add("as only a portion of a pie", () => <VictoryPie endAngle={90} startAngle={-90} />)
//   .add("with space between slices", () => (
//     <VictoryPie endAngle={90} innerRadius={140} padAngle={5} startAngle={-90} />
//   ))
//   .add("with an origin prop", () => <VictoryPie radius={100} origin={{ x: 150, y: 150 }} />)


