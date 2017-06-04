/*eslint-disable no-magic-numbers */
import React from "react";
import {
  VictoryChart, VictoryLine, VictoryGroup, VictoryBrushContainer
} from "../../src/index";

const data = [
  { x: 1, y: -3 },
  { x: 2, y: 5 },
  { x: 3, y: 3 },
  { x: 4, y: 0 },
  { x: 5, y: -2 },
  { x: 6, y: -2 },
  { x: 7, y: 5 }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  handleSelectionChange(domain) {
    this.setState({
      selectedDomain: domain
    });
  }
  changeSelection(a, b) {
    this.setState({
      selectedDomain: { x: [a, b] }
    });
  }
  render() {
    return (
      <div style={{ width: 300 }}>
        <button onClick={() => this.changeSelection(1, 3)}>1-3</button>
        <button onClick={() => this.changeSelection(3, 6)}>3-6</button>
        <VictoryChart
          containerComponent={
            <VictoryBrushContainer
              dimension="x"
              onDomainChange={this.handleSelectionChange.bind(this)}
              selectedDomain={this.state.selectedDomain}
            />
          }
        >
          <VictoryGroup data={data}>
            <VictoryLine/>
          </VictoryGroup>
       </VictoryChart>
      </div>
    );
  }
}

export default App;
