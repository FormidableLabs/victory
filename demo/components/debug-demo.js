/*eslint-disable no-magic-numbers */
import React from "react";
import {
  VictoryChart, VictoryLine, VictoryGroup, VictoryZoomContainer
} from "../../src/index";

const edata = [
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
    this.state = { data: edata.slice(3) };
  }


  handleDomainChange(domain) {
    this.setState({ selectedDomain: domain });
  }
  changeDataSet(data) {
    this.setState({
      data,
      selectedDomain: { x: [data[0].x, data[data.length - 1].x] }
    });
  }

  render() {
    return (
      <div style={{ width: 300 }}>
        <button onClick={() => this.changeDataSet(edata.slice(3))}>Part</button>
        <button onClick={() => this.changeDataSet(edata)}>All</button>
        <VictoryChart
          containerComponent={
            <VictoryZoomContainer
              dimension="x"
              onDomainChange={this.handleDomainChange.bind(this)}
              zoomDomain={this.state.selectedDomain}
            />
          }
          style={{ parent: { cursor: "pointer" } }}
        >
            <VictoryGroup

              data={this.state.data}
            >
              <VictoryLine/>
            </VictoryGroup>
         </VictoryChart>
         <p>
           currentDomain (domain),
           domain,
           cachedZoomDomain
         </p>
      </div>
    );
  }
}

export default App;
