import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import Radium from "radium";
import * as docgen from "react-docgen";
import { merge } from "lodash";
import { VictoryTheme } from "victory-core";
import { VictoryArea, VictoryStack, VictoryGroup, VictoryScatter,
VictoryBar, VictoryChart } from "../../src/index";
import { appendLinkIcon, ecologyPlaygroundLoading } from "formidable-landers";

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../../src/components/victory-area/victory-area"))}
          scope={{merge, React, ReactDOM, VictoryArea, VictoryStack, VictoryGroup, VictoryScatter,
            VictoryTheme, VictoryBar, VictoryChart}}
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
