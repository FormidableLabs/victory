import React from "react";
import { VictoryTooltip } from "../src/index";

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

    const baseTooltipProps = {
      x: 75, y: 75, cornerRadius: 3, active: true
    };

    return (
      <div className="demo" style={containerStyle}>
        <svg {...svgProps}>
          <VictoryTooltip {...baseTooltipProps} text={"what up?\nnot much, you?"}/>
          <circle cx="75" cy="75" r="2" fill="red"/>
        </svg>

        <svg {...svgProps}>
          <VictoryTooltip {...baseTooltipProps} text={"o shit\nwaddup"}/>
          <circle cx="75" cy="75" r="2" fill="red"/>
        </svg>

        <svg {...svgProps}>
          <VictoryTooltip {...baseTooltipProps}
            text={["o shit", "waddup"]}
            style={[{fill: "red"}, {fill: "blue"}]}
            orientation="bottom"
          />
          <circle cx="75" cy="75" r="2" fill="red"/>
        </svg>

        <svg {...svgProps}>
          <VictoryTooltip {...baseTooltipProps} text={"o shit\nwaddup"} orientation="right"/>
          <circle cx="75" cy="75" r="2" fill="red"/>
        </svg>

        <svg {...svgProps}>
          <VictoryTooltip {...baseTooltipProps} text={"o shit\nwaddup"} orientation="left"/>
          <circle cx="75" cy="75" r="2" fill="red"/>
        </svg>

        <svg {...svgProps}>
          <VictoryTooltip {...baseTooltipProps} text={"o shit\nwaddup"} dy={10} dx={10}/>
          <circle cx="75" cy="75" r="2" fill="red"/>
        </svg>
      </div>
    );
  }
}
