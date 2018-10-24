/*global window:false */
/*eslint-disable no-magic-numbers */
import React from "react";
import PropTypes from "prop-types";
import { assign, merge, random, range } from "lodash";
import { VictoryChart } from "../../packages/victory-chart/src/index";
import { VictoryLine } from "../../packages/victory-line/src/index";
import { VictoryErrorBar, ErrorBar } from "../../packages/victory-errorbar/src/index";
import { VictoryScatter } from "../../packages/victory-scatter/src/index";
import { VictoryContainer, VictoryTheme } from "../../packages/victory-core/src/index";

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
  { x: 1, y: 1, errorX: [1, 0.5], errorY: .1 },
  { x: 2, y: 2, errorX: [1, 3], errorY: .1 },
  { x: 3, y: 3, errorX: [1, 3], errorY: [.2, .3] },
  { x: 4, y: 2, errorX: [1, 0.5], errorY: .1 },
  { x: 5, y: 1, errorX: [1, 0.5], errorY: .2 }
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
          />
          <VictoryScatter data={basicData}/>
        </VictoryChart>

        <VictoryChart style={style}>
          <VictoryErrorBar data={basicData}/>
          <VictoryLine
            data={basicData}
          />
        </VictoryChart>

        <VictoryErrorBar
          style={style}
          width={500}
          height={500}
          domain={[0, 6]}
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
        />

        <VictoryErrorBar
          style={style}
          width={500}
          height={500}
          domain={[0, 6]}
          animate={{ duration: 2000 }}
          borderWidth={30}
          data={this.state.data}
        />

        <VictoryErrorBar
          style={{
            parent: style.parent,
            data: { fill: (data) => data.y > 0 ? "red" : "blue" }
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
          <VictoryErrorBar
            style={style}
            standalone={false}
          />
        </svg>

        <VictoryErrorBar
          style={{ parent: style.parent, data: this.state.hoverStyle }}
          data={this.state.data}
          events={[{
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
          }]}
        />

        <VictoryChart style={style}
          theme={VictoryTheme.material}
        >
          <VictoryErrorBar
            style={style}
            data={this.state.data}
          />
        </VictoryChart>

        <VictoryChart style={style}
          theme={VictoryTheme.material}
        >
          <VictoryErrorBar
            style={style}
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
