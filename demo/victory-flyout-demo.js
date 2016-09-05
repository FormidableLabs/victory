import React from "react";
import { VictoryFlyout } from "../src/index";

export default class App extends React.Component {


  render() {
    const svgProps = {
      viewBox: "0 0 300 300",
      width: 300,
      height: 300,
      style: {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"}
    };

    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    const baseFlyoutProps = {
      x: 150, y: 150, cornerRadius: 5
    }
    return (
      <div className="demo" style={containerStyle}>
        <svg {...svgProps}>
          <VictoryFlyout {...baseFlyoutProps} text={"yo dog\nwhat up?\nnot much, you?"}/>
          <circle cx="150" cy="150" r="2" fill="red"/>
        </svg>

        <svg {...svgProps}>
          <VictoryFlyout {...baseFlyoutProps} text={"hi"}/>
          <circle cx="150" cy="150" r="2" fill="red"/>
        </svg>
      </div>
    );
  }
}
