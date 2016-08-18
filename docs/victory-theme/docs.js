import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import Radium from "radium";
import { merge, range } from "lodash";
import { VictoryTheme } from "victory-core";
import { VictoryArea, VictoryStack, VictoryGroup, VictoryScatter,
VictoryBar, VictoryChart, VictoryCandlestick, VictoryAxis, VictoryLine } from "../../src/index";
import { appendLinkIcon, ecologyPlaygroundLoading } from "formidable-landers";

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          scope={{merge, range, React, ReactDOM, VictoryArea, VictoryStack, VictoryGroup,
            VictoryScatter, VictoryTheme, VictoryBar, VictoryChart, VictoryCandlestick, VictoryAxis,
            VictoryLine}}
          playgroundtheme="elegant"
          customRenderers={merge(ecologyPlaygroundLoading, appendLinkIcon)}
          exportGist
          copyToClipboard
        />
      </div>
    );
  }
}

export default Radium(Docs);
