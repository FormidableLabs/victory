import React from "react";
import { VictoryFlyout } from "../src/index";

export default class App extends React.Component {


  render() {
    const svgProps = {
      viewBox: "0 0 150 150",
      width: 150,
      height: 150,
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
      x: 75, y: 75, cornerRadius: 3
    };

    return (
      <div className="demo" style={containerStyle}>
        <svg {...svgProps}>
          <VictoryFlyout {...baseFlyoutProps} text={"what up?\nnot much, you?"}/>
          <circle cx="75" cy="75" r="2" fill="red"/>
        </svg>

        <svg {...svgProps}>
          <VictoryFlyout {...baseFlyoutProps} text={"o shit\nwaddup"}/>
          <circle cx="75" cy="75" r="2" fill="red"/>
        </svg>

        <svg {...svgProps}>
          <VictoryFlyout {...baseFlyoutProps} text={"o shit\nwaddup"} orientation="bottom"/>
          <circle cx="75" cy="75" r="2" fill="red"/>
        </svg>

        <svg {...svgProps}>
          <VictoryFlyout {...baseFlyoutProps} text={"o shit\nwaddup"} orientation="right"/>
          <circle cx="75" cy="75" r="2" fill="red"/>
        </svg>

        <svg {...svgProps}>
          <VictoryFlyout {...baseFlyoutProps} text={"o shit\nwaddup"} orientation="left"/>
          <circle cx="75" cy="75" r="2" fill="red"/>
        </svg>
      </div>
    );
  }
}
