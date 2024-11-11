 
import React from "react";
import { range, random, minBy, maxBy, last } from "lodash";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryAxis } from "victory-axis";
import { VictoryArea } from "victory-area";
import { VictoryBar } from "victory-bar";
import { VictoryLine } from "victory-line";
import { VictoryScatter } from "victory-scatter";
import { VictoryZoomContainer } from "victory-zoom-container";
import { VictoryTooltip } from "victory-tooltip";
import { VictoryLegend } from "victory-legend";
import {
  CoordinatesPropType,
  DomainTuple,
  VictoryClipContainer,
  VictoryPortal,
  VictoryTheme,
} from "victory-core";

const allData = range(0, 10, 0.001).map((x) => ({
  x,
  y: (Math.sin((Math.PI * x) / 2) * x) / 10,
}));

const themeColors = VictoryTheme.clean.palette?.colors || {};
const {
  red = "red",
  orange = "orange",
  yellow = "yellow",
  blue = "blue",
  teal = "teal",
  pink = "pink",
  purple = "purple",
  green = "green",
} = themeColors;

interface CustomChartState {
  zoomedXDomain: DomainTuple;
}

class CustomChart extends React.Component<any, CustomChartState> {
  entireDomain: { x: DomainTuple; y: DomainTuple };

  constructor(props: any) {
    super(props);

    this.entireDomain = this.getEntireDomain(props);

    this.state = {
      zoomedXDomain: this.entireDomain.x,
    };
  }

  onDomainChange(domain: { x: DomainTuple; y: DomainTuple }) {
    this.setState({
      zoomedXDomain: domain.x,
    });
  }

  getData() {
    const { zoomedXDomain } = this.state;
    const { data, maxPoints } = this.props;
    const filtered = data.filter(
      (d: { x: number }) => d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1],
    );

    if (filtered.length > maxPoints) {
      const k = Math.ceil(filtered.length / maxPoints);
      return filtered.filter((d: { x: number[] }, i: number) => i % k === 0);
    }
    return filtered;
  }

  getEntireDomain(props: { data: CoordinatesPropType[] }) {
    const { data }: { data: CoordinatesPropType[] } = props;

    const minPoint = minBy(data, (d: CoordinatesPropType) => d.y);
    const yMin = minPoint ? minPoint.y : 0;

    const maxPoint = maxBy(data, (d: CoordinatesPropType) => d.y);
    const yMax = maxPoint ? maxPoint.y : 0;

    const lastPoint = last(data);
    const xLast = lastPoint ? lastPoint.x : 0;

    const yArr: DomainTuple = [yMin, yMax];
    const xArr: DomainTuple = [data[0].x, xLast];

    return {
      x: xArr,
      y: yArr,
    };
  }

  render() {
    const renderedData = this.getData();
    return (
      <VictoryChart
        theme={VictoryTheme.clean}
        style={this.props.style}
        domain={this.entireDomain}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            onZoomDomainChange={this.onDomainChange.bind(this)}
            minimumZoom={{ x: 1 / 10000 }}
          />
        }
      >
        <VictoryScatter data={renderedData} />
      </VictoryChart>
    );
  }
}

interface VictoryZoomContainerDemoState {
  arrayData: number[][];
  barData: {
    x: number;
    y: number;
  }[];
  data: {
    a: number;
    b: number;
  }[];
  transitionData: {
    x: number;
    y: number;
  }[];
  zoomDomain: {
    x?: DomainTuple;
    y?: DomainTuple;
  };
}

const parentStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  margin: "2%",
  maxWidth: "40%",
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const makeData = () => range(-50, 75).map((i) => ({ x: i, y: Math.random() }));

export default class VictoryZoomContainerDemo extends React.Component<
  any,
  VictoryZoomContainerDemoState
> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      barData: makeData(),
      data: this.getData(),
      transitionData: this.getTransitionData(),
      arrayData: this.getArrayData(),
      zoomDomain: this.getZoomDomain(),
    };
  }

  componentDidMount() {
     
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        transitionData: this.getTransitionData(),
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getZoomDomain() {
    const yZoomDomain: DomainTuple = [random(0, 0.4), random(0.6, 1)];

    return {
      y: yZoomDomain,
    };
  }

  getTransitionData() {
    const lines = random(6, 10);
    return range(lines).map((line) => {
      return { x: line, y: random(2, 10) };
    });
  }

  getData() {
    return range(50).map((i) => {
      return {
        a: i + 20,
        b: Math.random(),
      };
    });
  }
  getArrayData() {
    return range(40).map((i) => [i, i + Math.random() * 3]);
  }

  getStyles() {
    const colors = ["red", "orange", "cyan", "green", "blue", "purple"];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5),
    };
  }
  render() {
    return (
      <div className="demo" style={containerStyle}>
        <CustomChart
          style={{ parent: parentStyle }}
          data={allData}
          maxPoints={120}
        />

        <VictoryGroup
          theme={VictoryTheme.clean}
          containerComponent={<VictoryZoomContainer zoomDimension="y" />}
          style={{ parent: parentStyle }}
          data={this.state.transitionData}
        >
          <VictoryLine animate={{ duration: 1500 }} />
        </VictoryGroup>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          containerComponent={
            <VictoryZoomContainer
              zoomDomain={{ x: [new Date(1993, 1, 1), new Date(2005, 1, 1)] }}
              zoomDimension="x"
              containerRef={(ref) => ref}
            />
          }
          scale={{
            x: "time",
          }}
        >
          <VictoryAxis tickFormat={(x) => new Date(x).getFullYear()} />
          <VictoryLine
            style={{
              data: {
                stroke: yellow,
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

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          animate={{ duration: 1500 }}
          domainPadding={{ x: 20, y: 0 }}
          containerComponent={
            <VictoryZoomContainer
              minimumZoom={{ x: 5 }}
              zoomDimension="x"
              downsample={10}
              clipContainerComponent={
                <VictoryClipContainer clipPadding={{ top: 15, bottom: 15 }} />
              }
            />
          }
        >
          <VictoryPortal>
            <VictoryScatter
              theme={VictoryTheme.clean}
              style={{
                parent: parentStyle,
                data: {
                  fill: green,
                },
              }}
              data={this.state.data}
              x="a"
              y="b"
            />
          </VictoryPortal>
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          animate={{ duration: 1500 }}
          domainPadding={{ x: 20, y: 0 }}
          containerComponent={
            <VictoryZoomContainer
              minimumZoom={{ x: 5 }}
              zoomDimension="x"
              downsample={10}
              clipContainerComponent={
                <VictoryClipContainer clipPadding={{ top: 15, bottom: 15 }} />
              }
            />
          }
        >
          <VictoryScatter
            style={{ parent: parentStyle }}
            data={this.state.data}
            x="a"
            y="b"
            labels={({ datum }) => datum.x}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          containerComponent={<VictoryZoomContainer />}
        >
          <VictoryLine
            style={{
              parent: parentStyle,
            }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: (props) => {
                          return {
                            style: Object.assign({}, props.style, {
                              stroke: "orange",
                            }),
                          };
                        },
                      },
                      {
                        target: "labels",
                        mutation: () => {
                          return { text: "hey" };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            data={range(0, 100)}
            y={(d) => d * d}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          containerComponent={<VictoryZoomContainer />}
        >
          <VictoryArea
            style={{
              parent: parentStyle,
              data: {
                fill: pink,
              },
            }}
            data={this.state.data}
            x="a"
            y="b"
            interpolation="stepBefore"
          />
          <VictoryAxis />
          <VictoryLine
            style={{
              parent: parentStyle,
              data: {
                stroke: pink,
              },
            }}
            data={this.state.data}
            x="a"
            y="b"
            interpolation="stepBefore"
          />
          <VictoryAxis dependentAxis />
        </VictoryChart>

        <button
          onClick={() => this.setState({ zoomDomain: this.getZoomDomain() })}
        >
          random y domain
        </button>

        <VictoryChart
          theme={VictoryTheme.clean}
          height={400}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
            />
          }
          animate={{ duration: 500 }}
          style={{ parent: parentStyle }}
        >
          <VictoryLine
            name="line"
            style={{ parent: parentStyle }}
            y={(d) => Math.sin(2 * Math.PI * d.x)}
            samples={25}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: parentStyle }}
          height={400}
          padding={{ top: 80, bottom: 50, left: 50, right: 50 }}
          containerComponent={<VictoryZoomContainer />}
          events={[
            {
              childName: "area-1",
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      childName: "area-2",
                      target: "data",
                      mutation: (props) => {
                        return {
                          style: Object.assign({}, props.style, {
                            fill: yellow,
                          }),
                        };
                      },
                    },
                    {
                      childName: "area-3",
                      target: "data",
                      mutation: (props) => {
                        return {
                          style: Object.assign({}, props.style, {
                            fill: orange,
                          }),
                        };
                      },
                    },
                    {
                      childName: "area-4",
                      target: "data",
                      mutation: (props) => {
                        return {
                          style: Object.assign({}, props.style, { fill: red }),
                        };
                      },
                    },
                  ];
                },
              },
            },
          ]}
        >
          <VictoryLegend
            x={83}
            y={10}
            title="Legend"
            orientation="horizontal"
            data={[
              { name: "One", symbol: { fill: teal } },
              { name: "Two", symbol: { fill: pink } },
              { name: "Three", symbol: { fill: purple } },
              { name: "Four", symbol: { fill: blue } },
            ]}
          />
          <VictoryAxis />
          <VictoryStack>
            <VictoryArea
              name="area-1"
              data={[
                { x: "a", y: 2 },
                { x: "b", y: 3 },
                { x: "c", y: 5 },
                { x: "d", y: 4 },
                { x: "e", y: 7 },
              ]}
            />
            <VictoryArea
              name="area-2"
              data={[
                { x: "a", y: 1 },
                { x: "b", y: 4 },
                { x: "c", y: 5 },
                { x: "d", y: 7 },
                { x: "e", y: 5 },
              ]}
            />
            <VictoryArea
              name="area-3"
              data={[
                { x: "a", y: 3 },
                { x: "b", y: 2 },
                { x: "c", y: 6 },
                { x: "d", y: 2 },
                { x: "e", y: 6 },
              ]}
            />
            <VictoryArea
              name="area-4"
              data={[
                { x: "a", y: 2 },
                { x: "b", y: 3 },
                { x: "c", y: 3 },
                { x: "d", y: 4 },
                { x: "e", y: 7 },
              ]}
            />
          </VictoryStack>
          <VictoryAxis dependentAxis />
        </VictoryChart>
        <VictoryChart
          theme={VictoryTheme.clean}
          horizontal
          style={{ parent: parentStyle }}
          containerComponent={<VictoryZoomContainer zoomDimension="x" />}
        >
          <VictoryBar
            data={this.state.data}
            x="a"
            y="b"
            style={{
              data: {
                fill: orange,
              },
            }}
          />
          <VictoryAxis />
          <VictoryAxis dependentAxis />
        </VictoryChart>
      </div>
    );
  }
}
