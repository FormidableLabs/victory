import React from "react";
import { storiesOf, action } from "@kadira/storybook";
import _ from "lodash";
import { VictoryPie } from "../src";

storiesOf("VictoryPie", module)
  .add("by default", () => (
    <VictoryPie />
  ))
  .add("with basic data", () => (
    <VictoryPie
      data={[
        {x: "Cat", y: 62},
        {x: "Dog", y: 91},
        {x: "Fish", y: 55},
        {x: "Bird", y: 55}
      ]}
    />
  ))
  .add("with flexible data", () => (
    <VictoryPie
      data={[
        {animal: "Cat", pet: 45, wild: 17},
        {animal: "Dog", pet: 85, wild: 6},
        {animal: "Fish", pet: 55, wild: 0},
        {animal: "Bird", pet: 15, wild: 40}
      ]}
      x={"animal"}
      y={(data) => data.pet + data.wild}
    />
  ))
  .add("with configured styles", () => (
    <VictoryPie
      style={{
        labels: {
          fontSize: 20,
          padding: 100
        },
        data: {
          stroke: "transparent",
          opacity: 0.3
        }
      }}
    />
  ))
  .add("as a donut", () => (
    <VictoryPie innerRadius={140} />
  ))
  .add("as only a portion of a pie", () => (
    <VictoryPie
      endAngle={90}
      startAngle={-90}
    />
  ))
  .add("with space between slices", () => (
    <VictoryPie
      endAngle={90}
      innerRadius={140}
      padAngle={5}
      startAngle={-90}
    />
  ))
  .add("with custom data and colors", () => (
    <VictoryPie
      style={{
        labels: {
          fill: "white",
          fontSize: 12,
          fontWeight: "bold"
        }
      }}
      data={[
        {x: "<5", y: 6279},
        {x: "5-13", y: 9182},
        {x: "14-17", y: 5511},
        {x: "18-24", y: 7164},
        {x: "25-44", y: 6716},
        {x: "45-64", y: 4263},
        {x: "≥65", y: 7502}
      ]}
      innerRadius={110}
      colorScale={[
        "#D85F49",
        "#F66D3B",
        "#D92E1D",
        "#D73C4C",
        "#FFAF59",
        "#E28300",
        "#F6A57F"
      ]}
    />
  ))
  .add("with functional styles", () => (
    <VictoryPie
      style={{
        data: {
          stroke: (data) => data.y > 75 ? "black" : "transparent",
          opacity: (data) => data.y > 75 ? 1 : 0.4
        }
      }}
      data={[
        {x: "Cat", y: 62},
        {x: "Dog", y: 91},
        {x: "Fish", y: 55},
        {x: "Bird", y: 55},
      ]}
    />
  ))
  .add("with a click handler", () => (
    <VictoryPie
      data={[
        {x: "Cat", y: 62},
        {x: "Dog", y: 91},
        {x: "Fish", y: 55},
        {x: "Bird", y: 55},
      ]}
      events={{
        data: {
          onClick: (event, props) => {
            action("click a slice of pie")();
            const fill = props.style.fill;
            return fill === "pink" ? null : {style: {fill: "pink"}};
          }
        }
      }}
    />
  ))
  .add("with an animation", () => {
    class PieContainer extends React.Component {
      constructor(props) {
        super(props);
        this.state = {data: this.getData()};
      }

      getData() {
        const samples =  _.random(6, 10);
        return _.range(samples).map((data) => {
          return {
            x: data,
            y: _.random(3, 10),
            label: `#${data}`
          };
        });
      }

      componentDidMount() {
        setInterval(() => {
          this.setState({data: this.getData()});
        }, 2000);
      }

      render() {
        return (
          <VictoryPie
            data={this.state.data}
            animate={{
              duration: 1000,
              onEnter: {
                duration: 500,
                before: () => ({y: 0, label: " "}),
                after: (datum) => ({y: datum.y, label: "NEW"})
              }
            }}
          />
        );
      }
    }

    return <PieContainer />
  });
