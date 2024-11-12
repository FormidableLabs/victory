import React from "react";
import { random, range } from "lodash";
import { VictoryBar } from "victory-bar";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryArea } from "victory-area";
import { VictoryTheme } from "victory-core";

export default class App extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      data: this.getData(),
      arrayData: this.getArrayData(),
      groupedData: this.getGroupedData(),
      multiTransitionData: this.getMultiTransitionData(),
      areaTransitionData: this.getAreaTransitionData(),
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        data: this.getData(),
        groupedData: this.getGroupedData(),
        multiTransitionData: this.getMultiTransitionData(),
        areaTransitionData: this.getAreaTransitionData(),
        style: this.getStyles(),
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
    return range(20).map((i) => {
      return {
        x: i,
        y: Math.random(),
      };
    });
  }

  getGroupedData() {
    return range(7).map(() => {
      return [
        {
          x: "rabbits",
          y: random(1, 5),
        },
        {
          x: "cats",
          y: random(1, 10),
        },
        {
          x: "dogs",
          y: random(2, 10),
        },
        {
          x: "birds",
          y: random(2, 10),
        },
        {
          x: "frogs",
          y: random(2, 15),
        },
      ];
    });
  }

  getArrayData() {
    return range(40).map((i) => [i, i + Math.random() * 3]);
  }

  getStyles() {
    const colors = VictoryTheme.clean.bar?.colorScale ?? [
      "red",
      "orange",
      "gold",
      "tomato",
      "magenta",
      "purple",
    ];
    return {
      fill: colors[random(0, 5)],
    };
  }

  render() {
    const style = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
    };

    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <div className="demo" style={containerStyle}>
        <VictoryArea
          style={style}
          animate
          data={this.state.areaTransitionData}
          x={(d) => d.x}
          theme={VictoryTheme.clean}
        />

        <VictoryChart style={style} animate theme={VictoryTheme.clean}>
          <VictoryArea data={this.state.areaTransitionData} />
        </VictoryChart>

        <VictoryStack style={style} animate theme={VictoryTheme.clean}>
          {this.state.multiTransitionData.map((data, index) => {
            return (
              <VictoryArea key={index} data={data} interpolation={"basis"} />
            );
          })}
        </VictoryStack>

        <VictoryChart style={style} animate theme={VictoryTheme.clean}>
          <VictoryStack>
            {this.state.multiTransitionData.map((data, index) => {
              return (
                <VictoryArea key={index} data={data} interpolation={"basis"} />
              );
            })}
          </VictoryStack>
        </VictoryChart>

        <VictoryChart style={style} theme={VictoryTheme.clean}>
          <VictoryBar
            animate={{
              animationWhitelist: ["style"],
            }}
            data={this.state.data}
            style={{
              data: this.state.style,
            }}
          />
        </VictoryChart>

        <VictoryChart style={style} theme={VictoryTheme.clean}>
          <VictoryBar
            animate={{
              animationWhitelist: ["data"],
            }}
            data={this.state.data}
            style={{
              data: this.state.style,
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}
