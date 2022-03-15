/*global window:false */
/*eslint-disable no-magic-numbers */
import React from "react";
import PropTypes from "prop-types";
import { assign, merge, random, range } from "lodash";
import { VictoryChart } from "Packages/victory-chart/src/index";
import { VictoryErrorBar, ErrorBar } from "Packages/victory-errorbar/src/index";
import { VictoryScatter } from "Packages/victory-scatter/src/index";
import {
  VictoryContainer,
  VictoryTheme
} from "Packages/victory-core/src/index";

const getData = () => {
  return range(4).map(() => {
    return {
      x: random(6),
      y: random(6),
      errorX: [random(1, true), random(3, true)],
      errorY: [random(2, true), random(2, true)]
    };
  });
};

const basicData = [
  { x: 1, y: 1, errorX: [1, 0.5], errorY: 0.1 },
  { x: 2, y: 2, errorX: [1, 3], errorY: 0.1 },
  { x: 3, y: 3, errorX: [1, 3], errorY: [0.2, 0.3] },
  { x: 4, y: 2, errorX: [1, 0.5], errorY: 0.1 },
  { x: 5, y: 1, errorX: [1, 0.5], errorY: 0.2 }
];

const style = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverStyle: { stroke: "gold" },
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
        <VictoryChart style={style}>
          <VictoryErrorBar
            data={basicData}
            data-test-variable="TESTING 123"
            aria-label="Victory ErrorBar with Victory Chart wrapper"
          />
          <VictoryScatter data={basicData} />
        </VictoryChart>

        <VictoryChart horizontal style={style}>
          <VictoryErrorBar data={basicData} />
          <VictoryScatter data={basicData} />
        </VictoryChart>

        <VictoryErrorBar
          horizontal
          style={style}
          width={500}
          height={500}
          animate={{ duration: 2000 }}
          borderWidth={30}
          data={this.state.data}
        />

        <VictoryErrorBar
          style={{
            parent: style.parent,
            data: { fill: ({ datum }) => (datum.y > 0 ? "red" : "blue") }
          }}
          width={500}
          height={500}
        />

        <VictoryErrorBar
          style={{
            parent: style.parent,
            data: { stroke: "blue", opacity: 0.7, strokeWidth: 3 }
          }}
          width={500}
          height={500}
          data={this.state.data}
        />

        <svg style={style} width={500} height={300}>
          <VictoryErrorBar style={style} standalone={false} />
        </svg>

        <VictoryErrorBar
          style={{ parent: style.parent, data: this.state.hoverStyle }}
          data={this.state.data}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        return {
                          style: merge({}, props.style, { stroke: "orange" })
                        };
                      }
                    }
                  ];
                }
              }
            }
          ]}
        />

        <VictoryChart style={style} theme={VictoryTheme.material}>
          <VictoryErrorBar style={style} data={this.state.data} />
        </VictoryChart>

        <VictoryChart style={style} theme={VictoryTheme.material}>
          <VictoryErrorBar style={style} data={[]} />
        </VictoryChart>

        <VictoryErrorBar
          style={style}
          width={500}
          height={500}
          animate={{ duration: 2000 }}
          data={this.state.data}
          dataComponent={<ErrorBar />}
          containerComponent={
            <VictoryContainer
              title="ErrorBar Chart"
              desc="This is a errorbar chart with data points!"
              style={assign({}, style.parent, { border: "1px solid red" })}
            />
          }
          data-test-variable="TESTING 123"
          aria-label="Victory ErrorBar Inside VictoryContainer"
        />

        <VictoryErrorBar
          horizontal
          style={style}
          width={500}
          height={500}
          animate={{ duration: 6000 }}
          borderWidth={30}
          data={this.state.data}
          data-test-variable="TESTING 123"
          aria-label="Victory ErrorBar Standalone"
        />

        <VictoryErrorBar
          style={style}
          data={this.state.data}
          data-test-variable="TESTING 123"
          aria-label="Victory ErrorBar Standalone"
        />
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
