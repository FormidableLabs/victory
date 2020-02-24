/* eslint-disable no-undef */
/* eslint-disable no-magic-numbers */
import React from "react";
import { VictoryChart, VictoryBar, VictoryGroup, VictoryStack } from "victory";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barData: this.getBarData()
    };
  }

  // componentDidMount() {
  //   /* eslint-disable react/no-did-mount-set-state */
  //   this.setStateInterval = window.setInterval(() => {
  //     this.setState({
  //       barData: this.getBarData()
  //     });
  //   }, 2000);
  // }

  // componentWillUnmount() {
  //   window.clearInterval(this.setStateInterval);
  // }

  getBarData() {
    return [1, 2, 3, 4, 5].map((d) => {
      return [{ x: 1, y: Math.random() }, { x: 2, y: Math.random() }, { x: 3, y: Math.random() }];
    });
  }

  render() {
    return (
      <div style={{ height: "500px", width: "500px", margin: "0 auto" }}>
        <VictoryChart domainPadding={{ x: 50 }} animate>
          <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
            <VictoryStack colorScale={"red"}>
              {this.state.barData.map((data, index) => {
                return <VictoryBar key={index} data={data} />;
              })}
            </VictoryStack>
            <VictoryStack colorScale={"green"}>
              {this.state.barData.map((data, index) => {
                return <VictoryBar key={index} data={data} />;
              })}
            </VictoryStack>
            <VictoryStack colorScale={"blue"}>
              {this.state.barData.map((data, index) => {
                return <VictoryBar key={index} data={data} />;
              })}
            </VictoryStack>
          </VictoryGroup>
        </VictoryChart>
      </div>
    );
  }
}

export default App;
