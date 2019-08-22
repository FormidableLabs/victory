/*global window:false */
/*eslint-disable no-magic-numbers */
import React from "react";
import PropTypes from "prop-types";
import { random, range, merge } from "lodash";
import { VictoryChart } from "../../packages/victory-chart/src/index";
import { VictoryCandlestick } from "../../packages/victory-candlestick/src/index";
import { VictoryTheme } from "../../packages/victory-core/src/index";

const getData = () => {
  const colors = [
    "violet",
    "cornflowerblue",
    "gold",
    "orange",
    "turquoise",
    "tomato",
    "greenyellow"
  ];
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
  { x: new Date(2016, 6, 4), open: 70, close: 22, high: 70, low: 5 }
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
            labels={({ datum }) => `x: ${datum.x.getDate()}`}
            labelOrientation={{ low: "bottom", high: "top" }}
            openLabels={({ datum }) => datum.open}
            closeLabels={({ datum }) => datum.close}
            lowLabels={({ datum }) => datum.low}
            highLabels={({ datum }) => datum.high}
            data={data}
            size={8}
            standalone={false}
            events={[
              {
                target: "highLabels",
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
              }
            ]}
          />
        </svg>

        <VictoryCandlestick
          horizontal
          style={{ parent: style.parent }}
          labels={({ datum }) => `x: ${datum.x.getDate()}`}
          labelOrientation={{ low: "left", high: "right", labels: "bottom" }}
          openLabels={({ datum }) => datum.open}
          closeLabels={({ datum }) => datum.close}
          lowLabels={({ datum }) => datum.low}
          highLabels={({ datum }) => datum.high}
          data={data}
          theme={VictoryTheme.material}
          size={8}
          events={[
            {
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
            }
          ]}
        />

        <VictoryChart scale={{ x: "time" }} style={style} domainPadding={{ x: [20, 50] }}>
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
          candleWidth={50}
          style={{
            data: {
              stroke: "transparent",
              fill: ({ datum }) => datum.fill,
              opacity: ({ datum }) => datum.opacity
            },
            parent: style.parent
          }}
        />

        <VictoryChart scale={{ x: "time" }} style={style} domainPadding={{ x: [20, 50] }}>
          <VictoryCandlestick
            candleColors={{ positive: "#8BC34A", negative: "#C62828" }}
            data={data}
            style={{ data: { stroke: "none" }, closeLabels: { fill: "blue" } }}
            size={8}
            openLabels={({ datum }) => datum.open}
            closeLabels={({ datum }) => datum.close}
            lowLabels={({ datum }) => datum.low}
            highLabels={({ datum }) => datum.high}
            labelOrientation={{ open: "top", high: "top" }}
          />
        </VictoryChart>

        <VictoryCandlestick style={style} size={1} />

        <VictoryChart style={style}>
          <VictoryCandlestick data={[]} />
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
