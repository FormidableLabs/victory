import React from "react";
import { random, range } from "lodash";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryArea } from "victory-area";
import { VictoryContainer, VictoryTheme } from "victory-core";

interface VictoryAreaDemoState {
  data: {
    x: number;
    y: number;
  }[];
  arrayData: number[][];
  groupedData: {
    x: string;
    y: number;
  }[][];
  multiTransitionData: {
    x: number;
    y: number;
  }[][];
  areaTransitionData: {
    x: number;
    y: number;
    y0: number;
  }[];
  style?: React.CSSProperties;
}

export default class VictoryAreaDemo extends React.Component<
  any,
  VictoryAreaDemoState
> {
  constructor(props: any) {
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
    }, 5000);
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
      const y = random(2, 10);
      return { x: area, y, y0: random(0, y) };
    });
  }

  getData() {
    return range(100).map((i) => {
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
    const colors = ["red", "orange", "gold", "tomato", "magenta", "purple"];
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
        <VictoryChart theme={VictoryTheme.clean} style={style}>
          <VictoryArea />
        </VictoryChart>

        <VictoryChart theme={VictoryTheme.clean} style={style}>
          <VictoryArea
            style={{
              data: {
                fill: VictoryTheme.clean.palette?.colors?.purple,
              },
            }}
            data={[
              { x: new Date(1982, 1, 1), y: 125 },
              { x: new Date(1987, 1, 1), y: 257 },
              { x: new Date(1993, 1, 1), y: 345 },
              { x: new Date(1997, 1, 1), y: 515 },
              { x: new Date(2001, 1, 1), y: 132 },
              { x: new Date(2005, 1, 1), y: 305 },
              { x: new Date(2011, 1, 1), y: 270 },
              { x: new Date(2015, 1, 1), y: 470 },
            ]}
          />
        </VictoryChart>

        <VictoryChart theme={VictoryTheme.clean} style={style}>
          <VictoryArea
            style={{
              data: {
                fill: VictoryTheme.clean.palette?.colors?.teal,
              },
            }}
            data={[
              { x: 1, y: 4000 },
              { x: 2, y: 3000 },
              { x: 3, y: 2000 },
              { x: 4, y: 2780 },
              { x: 5, y: 1890 },
            ]}
            interpolation="natural"
            labels={({ datum }) => datum.y}
          />
        </VictoryChart>

        <VictoryChart theme={VictoryTheme.clean} style={style}>
          <VictoryArea
            data={this.state.data}
            style={{
              data: {
                fill: VictoryTheme.clean.palette?.colors?.pink,
              },
            }}
          />
        </VictoryChart>

        <VictoryChart theme={VictoryTheme.clean} style={style}>
          <VictoryStack
            style={{ parent: style.parent }}
            colorScale="qualitative"
          >
            <VictoryArea
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 7 },
              ]}
            />
            <VictoryArea
              data={[
                { x: 1, y: 1 },
                { x: 2, y: 4 },
                { x: 3, y: 5 },
                { x: 4, y: 7 },
                { x: 5, y: 5 },
              ]}
            />
            <VictoryArea
              data={[
                { x: 1, y: 3 },
                { x: 2, y: 2 },
                { x: 3, y: 6 },
                { x: 4, y: 2 },
                { x: 5, y: 6 },
              ]}
            />
            <VictoryArea
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 3 },
                { x: 4, y: 4 },
                { x: 5, y: 7 },
              ]}
            />
          </VictoryStack>
        </VictoryChart>

        <VictoryChart theme={VictoryTheme.clean} style={style}>
          <VictoryGroup
            style={{
              parent: style.parent,
            }}
          >
            <VictoryArea
              style={{
                data: {
                  fill: VictoryTheme.clean.palette?.colors?.purple,
                  stroke: VictoryTheme.clean.palette?.colors?.purple,
                },
              }}
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 7 },
              ]}
            />
            <VictoryArea
              style={{
                data: {
                  fill: VictoryTheme.clean.palette?.colors?.teal,
                  stroke: VictoryTheme.clean.palette?.colors?.teal,
                },
              }}
              data={[
                { x: 1, y: 3 },
                { x: 2, y: 2 },
                { x: 3, y: 6 },
                { x: 4, y: 2 },
                { x: 5, y: 6 },
              ]}
            />
          </VictoryGroup>
        </VictoryChart>

        <VictoryChart theme={VictoryTheme.clean} style={style}>
          <VictoryArea
            style={{
              parent: style.parent,
            }}
            interpolation={"basis"}
            data={range(0, 100)}
            y={(d) => Math.sin(d)}
          />
        </VictoryChart>

        <VictoryChart theme={VictoryTheme.clean} style={style}>
          <VictoryArea
            theme={VictoryTheme.clean}
            style={{
              parent: style.parent,
              data: {
                fill: VictoryTheme.clean.palette?.colors?.purple,
              },
            }}
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 2 },
              { x: 5, y: null },
              { x: 6, y: null },
              { x: 7, y: 6 },
              { x: 8, y: 7 },
              { x: 9, y: 8 },
              { x: 10, y: 12 },
            ]}
            labels={({ datum }) => datum.y}
          />
        </VictoryChart>

        <VictoryChart theme={VictoryTheme.clean} style={style}>
          <VictoryGroup
            style={{
              parent: style.parent,
            }}
          >
            <VictoryArea
              y={(data) => Math.sin(data.x)}
              standalone={false}
              style={{ data: { opacity: 0.4 } }}
            />
            <VictoryArea
              y={(data) => Math.cos(data.x)}
              standalone={false}
              style={{ data: { opacity: 0.4 } }}
            />
          </VictoryGroup>
        </VictoryChart>

        <VictoryChart theme={VictoryTheme.clean} style={style}>
          <VictoryStack
            animate={{ duration: 1000 }}
            containerComponent={
              <VictoryContainer desc="This is an animated area chart that displays data in a range of colors." />
            }
          >
            {this.state.multiTransitionData.map((data, index) => {
              return (
                <VictoryArea key={index} data={data} interpolation={"basis"} />
              );
            })}
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}
