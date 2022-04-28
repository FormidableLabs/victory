import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryLine } from "victory-line";
import { VictoryContainer } from "victory-core/src";

class OuiaDemo extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };
    const chartStyle: { [key: string]: React.CSSProperties } = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" }
    };

    return (
      <div className="demo">
        <h1>Open UI Automation (OUIA)</h1>
        <div style={containerStyle}>
          <VictoryChart
            containerComponent={
              <VictoryContainer
                ouiaId="victory-container-ouia"
                ouiaType="Victory/container"
                ouiaSafe
              />
            }
            style={chartStyle}
          >
            <VictoryLine />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default OuiaDemo;
