/*global window:false*/
/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { range, random } from "lodash";
import { VictoryBar, VictoryChart } from "../src/index";
import { VictoryTheme } from "victory-core";

const chartDecorator = (story) => {
  return (
    <VictoryChart theme={VictoryTheme.material}>
      {story()}
    </VictoryChart>
  );
};

const data = [
  { x: 1, y: 2.2 },
  { x: 2, y: 3.5 },
  { x: 3, y: 5.1 },
  { x: 4, y: 4 },
  { x: 5, y: 7 },
  { x: 6, y: 3.3 },
  { x: 7, y: 7.4 }
];

const negativeData = [
  { x: -3, y: 2.2 },
  { x: -2, y: 3.5 },
  { x: -1, y: -5.1 },
  { x: 0, y: -4 },
  { x: 1, y: -7 },
  { x: 2, y: 3.3 },
  { x: 3, y: 7.4 }
];

const pets = [
  { animal: "Cat", pet: 45, wild: 17 },
  { animal: "Dog", pet: 85, wild: 6 },
  { animal: "Fish", pet: 55, wild: 0 },
  { animal: "Bird", pet: 15, wild: 40 }
];

const dates =  [
  { x: new Date(2016, 6, 1), y: 5 },
  { x: new Date(2016, 6, 2), y: 10 },
  { x: new Date(2016, 6, 3), y: 15 },
  { x: new Date(2016, 6, 4), y: 20 },
  { x: new Date(2016, 6, 5), y: 10 }
];

const polarData = [
  { x: 45, y: 2 },
  { x: 90, y: 3 },
  { x: 135, y: 5 },
  { x: 180, y: 4 },
  { x: 225, y: 7 },
  { x: 270, y: 2 },
  { x: 315, y: 4 },
  { x: 360, y: 7 }
];

const getData = (num) => range(num).map((v) => ({ x: v + 1, y: 2 * v + 2 }));

storiesOf("VictoryBar", module)
  .add("VictoryBar", () => <VictoryBar/>)

storiesOf("VictoryBar/props/alignment", module)
  .addDecorator(chartDecorator)
  .add("start", () => <VictoryBar data={data} alignment="start"/>)
  .add("middle", () => <VictoryBar data={data} alignment="middle"/>)
  .add("end", () => <VictoryBar data={data} alignment="end"/>)
  .add("start (negative values)", () => <VictoryBar data={negativeData} alignment="start"/>)
  .add("end (negative values)", () => <VictoryBar data={negativeData} alignment="end"/>)
  .add("start (horizontal)", () => <VictoryBar data={data} horizontal alignment="start"/>)
  .add("end (horizontal)", () => <VictoryBar data={data} horizontal alignment="end"/>)

storiesOf("VictoryBar/props/barRatio", module)
  .addDecorator(chartDecorator)
  .add("barRatio = 0.01", () => <VictoryBar data={data} barRatio={0.01}/>)
  .add("barRatio = 0.25", () => <VictoryBar data={data} barRatio={0.25}/>)
  .add("barRatio = 0.5", () => <VictoryBar data={data} barRatio={0.5}/>)
  .add("barRatio = 0.75", () => <VictoryBar data={data} barRatio={0.75}/>)
  .add("barRatio = 1", () => <VictoryBar data={data} barRatio={1}/>)
  .add("barRatio = 0.01 (horizontal)", () => <VictoryBar horizontal data={data} barRatio={0.01}/>)
  .add("barRatio = 0.5 (horizontal)", () => <VictoryBar horizontal data={data} barRatio={0.5}/>)
  .add("barRatio = 1 (horizontal)", () => <VictoryBar horizontal data={data} barRatio={1}/>)
  .add("barRatio = 0.01 (50 bars)", () => <VictoryBar data={getData(50)} barRatio={0.01}/>)
  .add("barRatio = 0.5 (50 bars)", () => <VictoryBar data={getData(50)} barRatio={0.5}/>)
  .add("barRatio = 1 (50 bars)", () => <VictoryBar data={getData(50)} barRatio={1}/>)

storiesOf("VictoryBar/props/categories", module)
  .addDecorator(chartDecorator)
  .add("string categories", () => {
    return (
    <VictoryBar
      categories={{ x: ["Bird", "Fish", "Cat", "Dog"] }}
      data={[
        { x: "Cat", y: 45 },
        { x: "Dog", y: 85 },
        { x: "Fish", y: 55 },
        { x: "Bird", y: 15 }
      ]}
    />
    );
  })

storiesOf("VictoryBar/props/cornerRadius", module)
  .addDecorator(chartDecorator)
  .add("cornerRadius = 1", () => <VictoryBar data={data} cornerRadius={1}/>)
  .add("cornerRadius = 5", () => <VictoryBar data={data} cornerRadius={5}/>)
  .add("cornerRadius = 7", () => <VictoryBar data={data} cornerRadius={7}/>)
  .add("cornerRadius = 1 (horizontal)", () => <VictoryBar horizontal data={data} cornerRadius={1}/>)
  .add("cornerRadius = 5 (horizontal)", () => <VictoryBar horizontal data={data} cornerRadius={5}/>)
  .add("cornerRadius = 7 (horizontal)", () => <VictoryBar horizontal data={data} cornerRadius={7}/>)
  .add("cornerRadius = 1 (negative values)", () => <VictoryBar data={negativeData} cornerRadius={1}/>)
  .add("cornerRadius = 5 (negative values)", () => <VictoryBar data={negativeData} cornerRadius={5}/>)
  .add("cornerRadius = 7 (negative values)", () => <VictoryBar data={negativeData} cornerRadius={7}/>)
  .add("cornerRadius = 1 (20 bars)", () => <VictoryBar data={getData(20)} cornerRadius={1}/>)
  .add("cornerRadius = 3 (20 bars)", () => <VictoryBar data={getData(20)} cornerRadius={3}/>)

storiesOf("VictoryBar/props/data", module)
  .addDecorator(chartDecorator)
  .add("with data accessors", () => {
    return (
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
    );
  })
  .add("with nested data accessors", () => {
    return (
      <VictoryBar
        data={[
          { a: { b: { c: 1, d: 1 } } },
          { a: { b: { c: 2, d: 3 } } },
          { a: { b: { c: 3, d: 2 } } }
        ]}
        x={"a.b.c"}
        y={"a.b.d"}
      />
    );
  })

  storiesOf("VictoryBar/props/labels", module)
  .addDecorator(chartDecorator)
  .add("function labels", () => (
    <VictoryBar data={data} labels={(d) => `x: ${d.x}`}/>
  ))
  .add("array labels", () => (
    <VictoryBar data={data} labels={["", "", "three", "four", 5, "six"]}/>
  ))
  .add("data labels", () => (
    <VictoryBar
      data={[
        { x: 1, y: 2, label: "cat"},
        { x: 2, y: 5, label: "dog"},
        { x: 3, y: 3, label: "dog"},
        { x: 4, y: -2, label: "bird"},
        { x: 5, y: -5, label: "cat"},
      ]}
    />
  ))
storiesOf("VictoryBar/other", module)
  .add("with custom styles", () => (
    <VictoryBar
      labels={(d) => d.y}
      style={{
        labels: {
          fontSize: 20, fontFamily: "monospace"
        },
        data: {
          stroke: "tomato",
          fillOpacity: 0.3
        }
      }}
    />
  ))
  .add("with functional styles", () => (
    <VictoryBar
      style={{
        data: {
          stroke: (data) => data.y > 75 ? "red" : "transparent",
          strokeWidth: 3,
          opacity: (data) => data.y > 75 ? 1 : 0.4
        }
      }}
      data={[
        { x: "Cat", y: 62 },
        { x: "Dog", y: 91 },
        { x: "Fish", y: 55 },
        { x: "Bird", y: 55 }
      ]}
    />
  ))
  .add("animation transitions", () => {
    class BarContainer extends React.Component {
      constructor(props) {
        super(props);
        this.state = { data: this.getData() };
      }

      getData() { //eslint-disable-line
        const samples = random(6, 10);
        return range(samples).map((data) => {
          return {
            x: data,
            y: random(3, 10),
            label: `#${data}`
          };
        });
      }

      componentDidMount() {
        window.setInterval(() => {
          this.setState({ data: this.getData() });
        }, 2000);
      }

      render() {
        return (
          <div className="chromatic-ignore" style={{ height: 250 }}>
            <VictoryBar
              data={this.state.data}
              animate={{ duration: 1000 }}
            />
          </div>
        );
      }
    }

    return <BarContainer/>;
  });
