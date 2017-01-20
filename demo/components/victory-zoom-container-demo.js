/* globals window */
import React from "react";
import { range, merge, random } from "lodash";
import {
  VictoryChart, VictoryZoomContainer, VictoryArea, VictoryLine, VictoryGroup, VictoryAxis, VictoryStack
} from "../../src/index";
import { VictoryTheme } from "victory-core";

export default class App extends React.Component {

  state = {
    barData: range(-50, 75).map((i) => ({x: i, y: Math.random()}))
  };

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

  getZoomDomain() {
    return {
      x: [random(0, 0.5, 0.1), random(0.5, 1, 0.1)]
    };
  }

  getTransitionData() {
    const lines = random(6, 10);
    return range(lines).map((line) => {
      return {x: line, y: random(2, 10)};
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

  render() {
    const parentStyle = {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"};
    return (
      <div className="demo">
        <h1>VictoryZoomContainer</h1>


          <VictoryChart style={{parent: parentStyle}}
            containerComponent={<VictoryZoomContainer/>}
            scale={{
              x: "time"
            }}
          >
            <VictoryAxis
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: {stroke: "red", strokeWidth: 5},
                labels: {fontSize: 12}
              }}
              label={this.state.label}
              data={[
                {x: new Date(1982, 1, 1), y: 125},
                {x: new Date(1987, 1, 1), y: 257},
                {x: new Date(1993, 1, 1), y: 345},
                {x: new Date(1997, 1, 1), y: 515},
                {x: new Date(2001, 1, 1), y: 132},
                {x: new Date(2005, 1, 1), y: 305},
                {x: new Date(2011, 1, 1), y: 270},
                {x: new Date(2015, 1, 1), y: 470}
              ]}
            />
          </VictoryChart>

          <VictoryChart style={{parent: parentStyle}}
            animate={{duration: 1500}}
            containerComponent={<VictoryZoomContainer/>}
          >
            <VictoryLine
              style={{parent: parentStyle, data: this.state.style}}
              data={this.state.data}
            />
          </VictoryChart>

        <button onClick={() => this.setState({zoomDomain: this.getZoomDomain()})}>
          New domain
        </button>

          <VictoryChart
            containerComponent={<VictoryZoomContainer zoomDomain={this.state.zoomDomain}/>}
            animate={{duration: 1500}}
            style={{parent: parentStyle}}
            events={[{
              target: "data",
              childName: "line",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        const strokeWidth = props.style.strokeWidth + 1;
                        return {style: merge({}, props.style, {strokeWidth})};
                      }
                    }
                  ];
                }
              }
            }]}
          >
            <VictoryLine
              name="line"
              style={{parent: parentStyle, data: {stroke: "blue"}}}
              y={(d) => Math.sin(2 * Math.PI * d.x)}
              sample={25}
            />
          </VictoryChart>

          <VictoryChart style={{parent: parentStyle}} containerComponent={<VictoryZoomContainer/>}>
            <VictoryLine
              style={{
                parent: parentStyle,
                data: {stroke: "red", strokeWidth: 6}
              }}
              events={[{
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: (props) => {
                          return {style: merge({}, props.style, {stroke: "orange"})};
                        }
                      }, {
                        target: "labels",
                        mutation: () => {
                          return {text: "hey"};
                        }
                      }
                    ];
                  }
                }
              }]}
              label={this.state.label}
              data={range(0, 100)}
              y={(d) => d * d}
            />
          </VictoryChart>

          <VictoryChart style={{parent: parentStyle}} containerComponent={<VictoryZoomContainer/>}>
            <VictoryArea
              style={{parent: parentStyle, data: {stroke: "#333", fill: "#888", opacity: 0.4}}}
              data={this.state.data}
              interpolation="stepBefore"
            />
            <VictoryAxis/>
            <VictoryLine data={this.state.data} interpolation="stepBefore"/>
            <VictoryAxis dependentAxis/>
          </VictoryChart>

          <VictoryChart style={{parent: parentStyle}}
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
                        return {style: merge({}, props.style, {fill: "gold"})};
                      }
                    }, {
                      childName: "area-3",
                      target: "data",
                      mutation: (props) => {
                        return {
                          style: merge({}, props.style, {fill: "orange"})
                        };
                      }
                    }, {
                      childName: "area-4",
                      target: "data",
                      mutation: (props) => {
                        return {
                          style: merge({}, props.style, {fill: "red"})
                        };
                      }
                    }
                  ];
                }
              }
            }]}
          >
            <VictoryAxis/>
            <VictoryStack>
              <VictoryArea name="area-1"
                data={[
                  {x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}, {x: "d", y: 4}, {x: "e", y: 7}
                ]}
              />
              <VictoryArea name="area-2"
                data={[
                  {x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}, {x: "d", y: 7}, {x: "e", y: 5}
                ]}
              />
              <VictoryArea name="area-3"
                data={[
                  {x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}, {x: "d", y: 2}, {x: "e", y: 6}
                ]}
              />
              <VictoryArea name="area-4"
                data={[
                  {x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 3}, {x: "d", y: 4}, {x: "e", y: 7}
                ]}
              />
            </VictoryStack>
            <VictoryAxis dependentAxis/>
          </VictoryChart>
      </div>
    );
  }
}
