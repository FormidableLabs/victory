/* globals window */
import React from "react";
import { range, merge, random } from "lodash";
import {VictoryChart, VictoryZoom, VictoryArea, VictoryLine, VictoryGroup} from "../../src/index";

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
        <h1>VictoryZoom</h1>

        <VictoryZoom>
          <VictoryGroup data={this.state.transitionData}>
            <VictoryLine style={{data: this.state.style}} />
          </VictoryGroup>
        </VictoryZoom>

        <VictoryZoom>
          <VictoryChart style={{parent: parentStyle}}>
            <VictoryLine
              style={{parent: parentStyle, data: this.state.style}}
              data={this.state.data}
              label={"label\none"}
              animate={{duration: 1500}}
            />
          </VictoryChart>
        </VictoryZoom>

        <button onClick={() => this.setState({zoomDomain: this.getZoomDomain()})}>
          New domain
        </button>
        <VictoryZoom zoomDomain={this.state.zoomDomain}>
          <VictoryChart
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
        </VictoryZoom>

        <VictoryZoom>
          <VictoryChart style={{parent: parentStyle}}>
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
        </VictoryZoom>

        <VictoryZoom>
          <VictoryChart style={{parent: parentStyle}}>
            <VictoryArea
              style={{parent: parentStyle, data: {stroke: "#333", fill: "#888", opacity: 0.4}}}
              data={this.state.barData}
              interpolation="stepBefore"
            />
          </VictoryChart>
        </VictoryZoom>
      </div>
    );
  }
}
