/*global window:false*/
/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { range, random } from "lodash";
import { VictoryBar } from "../src";

storiesOf("VictoryBar", module)
  .add("by default", () => <VictoryBar/>)
  .add("with data accessors", () => {
    return
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
    ;
  })
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
