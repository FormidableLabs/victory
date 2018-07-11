/*global window:false */
/*eslint-disable no-magic-numbers */
import React from "react";
import PropTypes from "prop-types";
import { random, range, merge } from "lodash";
import { VictoryChart } from "../../packages/victory-chart/src/index";
import { VictoryAxis } from "../../packages/victory-axis/src/index";
import { VictoryCandlestick } from "../../packages/victory-candlestick/src/index";
import { VictoryTheme } from "../../packages/victory-core/src/index";

const getData = () => {
  const colors =
    ["violet", "cornflowerblue", "gold", "orange", "turquoise", "tomato", "greenyellow"];
  return range(50).map(() => {
    return {
      x: random(600),
      open: random(600),
      close: random(600),
      high: random(450, 600),
      low: random(0, 150),
      size: random(15) + 3,
      fill: colors[random(0, 6)],
      opacity: random(0.3, 1)
    };
  });
};

const style = {
  parent: {
    border: "1px solid #ccc",
    margin: "2%",
    maxWidth: "40%"
  }
};

const data = [
  { x: new Date(2016, 6, 1), open: 9, close: 30, high: 56, low: 7 },
  { x: new Date(2016, 6, 2), open: 80, close: 40, high: 120, low: 10 },
  { x: new Date(2016, 6, 3), open: 50, close: 80, high: 90, low: 20 },
  { x: new Date(2016, 6, 4), open: 70, close: 22, high: 70, low: 5 },
  { x: new Date(2016, 6, 5), open: 20, close: 35, high: 50, low: 10 },
  { x: new Date(2016, 6, 6), open: 35, close: 30, high: 40, low: 3 },
  { x: new Date(2016, 6, 7), open: 30, close: 90, high: 95, low: 30 },
  { x: new Date(2016, 6, 8), open: 80, close: 81, high: 83, low: 75 }
];


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: getData()
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div className="demo" style={containerStyle}>
        <svg height={500} width={500}>
        <VictoryCandlestick
          style={{ data: { width: 10 }, parent: style.parent }}
          data={data}
          size={8}
          standalone={false}
          events={[{
            target: "labels",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    mutation: (props) => {
                      return {
                        style: merge({}, props.style.labels, { fill: "orange" })
                      };
                    }
                  }
                ];
              }
            }
          },
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    mutation: (props) => {
                      return {
                        style: merge({}, props.style, { fill: "blue" })
                      };
                    }
                  }
                ];
              }
            }
          }]}
        />
        <VictoryAxis
          standalone={false}
        />
        </svg>

        <VictoryCandlestick
          style={{ parent: style.parent }}
          data={data}
          theme={VictoryTheme.material}
          size={8}
          events={[{
            target: "labels",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    mutation: (props) => {
                      return {
                        style: merge({}, props.style.labels, { fill: "orange" })
                      };
                    }
                  }
                ];
              }
            }
          },
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    mutation: (props) => {
                      return {
                        style: merge({}, props.style, { fill: "blue" })
                      };
                    }
                  }
                ];
              }
            }
          }]}
        />

        <VictoryChart
          scale={{ x: "time" }}
          style={style}
          domainPadding={{ x: [20, 50] }}
        >
          <VictoryCandlestick
            candleColors={{ positive: "#8BC34A", negative: "#C62828" }}
            data={data}
            style={{ data: { stroke: "none" } }}
            size={8}
          />
        </VictoryChart>

        <VictoryCandlestick
          animate={{ duration: 2000 }}
          data={this.state.data}
          style={{
            data: {
              width: 50,
              stroke: "transparent",
              fill: (d) => d.fill,
              opacity: (d) => d.opacity
            },
            parent: style.parent
          }}
        />

        <VictoryCandlestick style={style}
          size={1}
        />

        <VictoryChart style={style}>
          <VictoryCandlestick
            data={[]}
          />
        </VictoryChart>

      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
};

App.defaultProps = {
  data: getData()
};
