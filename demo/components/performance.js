/*eslint-disable no-magic-numbers */
import React from "react";
import { range } from "lodash";
import { VictorySelectionContainer } from "../../packages/victory-selection-container/src/index";
import { VictoryScatter } from "../../packages/victory-scatter/src/index";
import { VictoryChart } from "../../packages/victory-chart/src/index";

const scatterData = range(4000).map(() => ({ x: Math.random(), y: Math.random() }));

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      points: []
    };
  }

  handleSelection(datasets) {
    const points = datasets.reduce((memo, dataset) => {
      memo = memo.concat(dataset.data);
      return memo;
    }, []);
    this.setState({ points });
  }

  handleClearSelection() {
    this.setState({ points: [] });
  }

  listData() {
    const points = this.state.points.map((point, index) => {
      return <li key={index}>{`${point.x}, ${point.y}`}</li>;
    });

    return (
      <div>
        <p>Points</p>
        <ul>{points}</ul>
      </div>
    );
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    const chartStyle = { parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryChart
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: "tomato",
                  strokeWidth: 2,
                  fill: "tomato",
                  fillOpacity: 0.1
                }}
              />
            }
            style={{ parent: chartStyle.parent }}
          >
          <VictoryScatter
            style={{
              data: {
                fill: (datum, active) => (active ? "tomato" : "black")
              }
            }}
            data={scatterData}
          />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
