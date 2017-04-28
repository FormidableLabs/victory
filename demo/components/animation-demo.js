/*global window:false */
/*eslint-disable no-magic-numbers */
import React from "react";
import { random, range } from "lodash";
import { VictoryArea, VictoryStack, VictoryChart } from "../../src/index";
import { VictoryTheme } from "victory-core";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.getData(),
      arrayData: this.getArrayData(),
      groupedData: this.getGroupedData(),
      multiTransitionData: this.getMultiTransitionData(),
      areaTransitionData: this.getAreaTransitionData()
    };
  }

  componentWillMount() {
    window.setInterval(() => {
      this.setState({
        data: this.getData(),
        groupedData: this.getGroupedData(),
        multiTransitionData: this.getMultiTransitionData(),
        areaTransitionData: this.getAreaTransitionData(),
        style: this.getStyles()
      });
    }, 3000);
  }

  getMultiTransitionData() {
    const areas = random(8, 10);
    return range(8).map(() => {
      return range(areas).map((area) => {
        return { x: area, y: random(2, 10) };
      });
    });
  }

  getAreaTransitionData() {
    const areas = random(6, 10);
    return range(areas).map((area) => {
      return { x: area, y: random(2, 10) };
    });
  }

  getData() {
    return range(100).map((i) => {
      return {
        x: i,
        y: Math.random()
      };
    });
  }

  getGroupedData() {
    return range(7).map(() => {
      return [
        {
          x: "rabbits",
          y: random(1, 5)
        },
        {
          x: "cats",
          y: random(1, 10)
        },
        {
          x: "dogs",
          y: random(2, 10)
        },
        {
          x: "birds",
          y: random(2, 10)
        },
        {
          x: "frogs",
          y: random(2, 15)
        }
      ];
    });
  }

  getArrayData() {
    return range(40).map((i) => [i, i + (Math.random() * 3)]);
  }

  getStyles() {
    const colors = ["red", "orange", "gold", "tomato", "magenta", "purple"];
    return {
      fill: colors[random(0, 5)]
    };
  }

  render() {
    const style = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" }
    };

    return (
      <div className="demo">

        <VictoryArea
          style={style} animate={{ duration: 1000 }}
          data={this.state.areaTransitionData}
          x={(d) => d.x}
          theme={VictoryTheme.material}
        />

        <VictoryChart
          style={style} animate={{ duration: 1000 }}
          theme={VictoryTheme.material}
        >
          <VictoryArea
            data={this.state.areaTransitionData}
          />
        </VictoryChart>

        <VictoryStack
          style={style}
          animate={{ duration: 1000 }}
          theme={VictoryTheme.material}
          colorScale={"warm"}
        >
          {this.state.multiTransitionData.map((data, index) => {
            return (
              <VictoryArea
                key={index}
                data={data}
                interpolation={"basis"}
              />
            );
          })}
        </VictoryStack>

        <VictoryChart
          style={style}
          animate={{ duration: 1000 }}
          theme={VictoryTheme.material}
        >
          <VictoryStack
            colorScale={"warm"}
          >
            {this.state.multiTransitionData.map((data, index) => {
              return (
                <VictoryArea
                  key={index}
                  data={data}
                  interpolation={"basis"}
                />
              );
            })}
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}
