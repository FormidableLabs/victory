/* globals window */
/*eslint-disable no-magic-numbers,react/no-multi-comp */
import React from "react";
import PropTypes from "prop-types";
import { range, merge, random, minBy, maxBy, last, round } from "lodash";
import {
  VictoryChart, VictoryGroup, VictoryStack
} from "../../packages/victory-chart/src/index";
import { VictoryAxis } from "../../packages/victory-axis/src/index";
import { VictoryArea } from "../../packages/victory-area/src/index";
import { VictoryLine } from "../../packages/victory-line/src/index";
import { VictoryScatter } from "../../packages/victory-scatter/src/index";
import { VictoryZoomContainer } from "../../packages/victory-zoom-container/src/index";
import { VictoryTooltip } from "../../packages/victory-tooltip/src/index";
import { VictoryLegend } from "../../packages/victory-legend/src/index";
import {
  VictoryTheme, VictoryClipContainer, VictoryPortal
} from "../../packages/victory-core/src/index";

const allData = range(0, 10, 0.001).map((x) => ({
  x, y: Math.sin(Math.PI * x / 2) * x / 10
}));

class CustomChart extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    maxPoints: PropTypes.number,
    style: PropTypes.object
  };

  constructor(props) {
    super();
    this.entireDomain = this.getEntireDomain(props);
    this.state = {
      zoomedXDomain: this.entireDomain.x
    };
  }

  onDomainChange(domain) {
    this.setState({
      zoomedXDomain: domain.x
    });
  }

  getData() {
    const { zoomedXDomain } = this.state;
    const { data, maxPoints } = this.props;
    const filtered = data.filter(
      (d) => (d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1])
    );

    if (filtered.length > maxPoints) {
      const k = Math.ceil(filtered.length / maxPoints);
      return filtered.filter(
        (d, i) => ((i % k) === 0)
      );
    }
    return filtered;
  }

  getEntireDomain(props) {
    const { data } = props;
    return {
      y: [minBy(data, (d) => d.y).y, maxBy(data, (d) => d.y).y],
      x: [ data[0].x, last(data).x ]
    };
  }
  getZoomFactor() {
    const { zoomedXDomain } = this.state;
    const factor = 10 / (zoomedXDomain[1] - zoomedXDomain[0]);
    return round(factor, factor < 3 ? 1 : 0);
  }

  render() {
    const renderedData = this.getData();
    return (
      <VictoryChart
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

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.getData(),
      transitionData: this.getTransitionData(),
      arrayData: this.getArrayData(),
      style: {
        stroke: "blue",
        strokeWidth: 2
      },
      zoomDomain: this.getZoomDomain()
    };
  }

  state = {
    barData: range(-50, 75).map((i) => ({ x: i, y: Math.random() }))
  };

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        transitionData: this.getTransitionData(),
        style: this.getStyles()
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getZoomDomain() {
    return {
      y: [random(0, 0.4, 0.1), random(0.6, 1, 0.1)]
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
        b: Math.random()
      };
    });
  }
  getArrayData() {
    return range(40).map((i) => [i, i + (Math.random() * 3)]);
  }

  getStyles() {
    const colors = ["red", "orange", "cyan", "green", "blue", "purple"];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5)
    };
  }
  render() {
    const parentStyle = { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" };
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div className="demo" style={containerStyle}>

        <CustomChart style={{ parent: parentStyle }} data={allData} maxPoints={120}/>

          <VictoryGroup
            containerComponent={<VictoryZoomContainer zoomDimension="y"/>}
            style={{ parent: parentStyle }} data={this.state.transitionData}
          >
            <VictoryLine animate={{ duration: 1500 }} style={{ data: this.state.style }} />
          </VictoryGroup>

          <VictoryChart style={{ parent: parentStyle }}
            containerComponent={
              <VictoryZoomContainer
                zoomDomain={{ x: [new Date(1993, 1, 1), new Date(2005, 1, 1)] }}
                dimension="x"
              />
            }
            scale={{
              x: "time"
            }}
          >
            <VictoryAxis
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: { stroke: "red", strokeWidth: 5 }
              }}
              data={[
                { x: new Date(1982, 1, 1), y: 125 },
                { x: new Date(1987, 1, 1), y: 257 },
                { x: new Date(1993, 1, 1), y: 345 },
                { x: new Date(1997, 1, 1), y: 515 },
                { x: new Date(2001, 1, 1), y: 132 },
                { x: new Date(2005, 1, 1), y: 305 },
                { x: new Date(2011, 1, 1), y: 270 },
                { x: new Date(2015, 1, 1), y: 470 }
              ]}
            />
          </VictoryChart>

          <VictoryChart style={{ parent: parentStyle }}
            animate={{ duration: 1500 }}
            domainPadding={{ x: 20, y: 0 }}
            containerComponent={
              <VictoryZoomContainer
                minimumZoom={{ x: 5 }}
                zoomDimension="x"
                downsample={10}
                clipContainerComponent={
                  <VictoryClipContainer clipPadding={{ top: 15, bottom: 15 }}/>
                }
              />
            }
          >
            <VictoryPortal>
              <VictoryScatter
                style={{ parent: parentStyle, data: { fill: "orange" } }}
                size={15}
                data={this.state.data}
                x="a" y="b"
              />
            </VictoryPortal>
          </VictoryChart>

          <VictoryChart style={{ parent: parentStyle }}
            animate={{ duration: 1500 }}
            domainPadding={{ x: 20, y: 0 }}
            containerComponent={
              <VictoryZoomContainer
                minimumZoom={{ x: 5 }}
                zoomDimension="x"
                downsample={10}
                clipContainerComponent={
                  <VictoryClipContainer clipPadding={{ top: 15, bottom: 15 }}/>
                }
              />
            }
          >
            <VictoryScatter
              style={{ parent: parentStyle, data: { fill: "orange" } }}
              size={15}
              data={this.state.data}
              x="a" y="b"
              labels={(d) => d.x}
              labelComponent={<VictoryTooltip/>}
            />
          </VictoryChart>

          <VictoryChart
            style={{ parent: parentStyle }}
            containerComponent={<VictoryZoomContainer/>}
          >
            <VictoryLine
              style={{
                parent: parentStyle,
                data: { stroke: "red", strokeWidth: 6 }
              }}
              events={[{
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: (props) => {
                          return { style: merge({}, props.style, { stroke: "orange" }) };
                        }
                      }, {
                        target: "labels",
                        mutation: () => {
                          return { text: "hey" };
                        }
                      }
                    ];
                  }
                }
              }]}
              data={range(0, 100)}
              y={(d) => d * d}
            />
          </VictoryChart>

          <VictoryChart
            style={{ parent: parentStyle }}
            containerComponent={<VictoryZoomContainer/>}
          >
            <VictoryArea
              style={{ parent: parentStyle, data: { stroke: "#333", fill: "#888", opacity: 0.4 } }}
              data={this.state.data}
              x="a" y="b"
              interpolation="stepBefore"
            />
            <VictoryAxis/>
            <VictoryLine data={this.state.data} x="a" y="b" interpolation="stepBefore"/>
            <VictoryAxis dependentAxis/>
          </VictoryChart>

          <button onClick={() => this.setState({ zoomDomain: this.getZoomDomain() })}>
            random y domain
          </button>

          <VictoryChart
            containerComponent={
              <VictoryZoomContainer zoomDimension="x" zoomDomain={this.state.zoomDomain} />
            }
            animate={{ duration: 500 }}
            style={{ parent: parentStyle }}
          >
            <VictoryLine
              name="line"
              style={{ parent: parentStyle, data: { stroke: "blue" } }}
              y={(d) => Math.sin(2 * Math.PI * d.x)}
              sample={25}
            />
          </VictoryChart>

          <VictoryChart style={{ parent: parentStyle }}
            height={400}
            padding={{ top: 80, bottom: 50, left: 50, right: 50 }}
            containerComponent={<VictoryZoomContainer/>}
            theme={VictoryTheme.material}
            events={[{
              childName: "area-1",
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      childName: "area-2",
                      target: "data",
                      mutation: (props) => {
                        return { style: merge({}, props.style, { fill: "gold" }) };
                      }
                    }, {
                      childName: "area-3",
                      target: "data",
                      mutation: (props) => {
                        return {
                          style: merge({}, props.style, { fill: "orange" })
                        };
                      }
                    }, {
                      childName: "area-4",
                      target: "data",
                      mutation: (props) => {
                        return {
                          style: merge({}, props.style, { fill: "red" })
                        };
                      }
                    }
                  ];
                }
              }
            }]}
          >
          <VictoryLegend x={83} y={10}
            title="Legend"
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
            data={[
              { name: "One", symbol: { fill: "tomato" } },
              { name: "Two", symbol: { fill: "orange" } },
              { name: "Three", symbol: { fill: "gold" } }
            ]}
          />
            <VictoryAxis/>
            <VictoryStack>
              <VictoryArea name="area-1"
                data={[
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 5 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 }
                ]}
              />
              <VictoryArea name="area-2"
                data={[
                  { x: "a", y: 1 },
                  { x: "b", y: 4 },
                  { x: "c", y: 5 },
                  { x: "d", y: 7 },
                  { x: "e", y: 5 }
                ]}
              />
              <VictoryArea name="area-3"
                data={[
                  { x: "a", y: 3 },
                  { x: "b", y: 2 },
                  { x: "c", y: 6 },
                  { x: "d", y: 2 },
                  { x: "e", y: 6 }
                ]}
              />
              <VictoryArea name="area-4"
                data={[
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 3 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 }
                ]}
              />
            </VictoryStack>
            <VictoryAxis dependentAxis/>
          </VictoryChart>


      </div>
    );
  }
}
