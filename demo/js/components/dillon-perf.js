/* eslint-disable no-invalid-this */
/* eslint-disable func-style */
/* eslint-disable no-use-before-define */
/* eslint-disable no-magic-numbers */
/* eslint-disable react/no-multi-comp */
import React from "react";
import { VictoryBar, VictoryChart, VictoryGroup, VictoryStack } from "victory";

export const VictoryExample = () => {
  return (
    <>
      <VictoryChart height={1000} width={500} horizontal>
        <VictoryGroup standalone={false} offset={20} style={{ data: { width: 10 } }} horizontal>
          {[...Array(10).keys()].map((index) => (
            <VictoryStack key={index} colorScale={"blue"} horizontal>
              {[...Array(10).keys()].map((idx) => (
                <VictoryBar key={idx} data={generateFakeData(10, 5)} />
              ))}
            </VictoryStack>
          ))}
        </VictoryGroup>
      </VictoryChart>
    </>
  );
};

const generateFakeData = (n, range) =>
  [...Array(n).keys()].map((index) => ({
    x: index + 1,
    y: Math.random() * range
  }));

class ShowChartButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  render = () => (
    <>
      <div>
        <input
          type={"button"}
          value={"show the chart"}
          onClick={() => this.setState({ show: !this.state.show })}
        />
      </div>
      {this.state.show && <VictoryExample />}
    </>
  );
}
function App() {
  return (
    <div style={{ height: "500px", width: "500px", margin: "0 auto" }}>
      <ShowChartButton />
    </div>
  );
}

export default App;
