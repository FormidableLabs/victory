import Ecology from "ecology";
import { merge, random, range } from "lodash";
import Radium from "radium";
import React from "react";
import ReactDOM from "react-dom";
import * as docgen from "react-docgen";
import {
  VictoryVoronoiTooltip, VictoryGroup, VictoryLine, VictoryBar, VictoryChart
} from "../../src/index";
import { VictoryTooltip } from "victory-core";
import { appendLinkIcon, ecologyPlaygroundLoading } from "formidable-landers";

class Docs extends React.Component {
  render() {
    const victoryVoronoiTooltipSource = docgen.parse(
      require("!!raw!../../src/components/victory-voronoi-tooltip/victory-voronoi-tooltip")
    );

    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={victoryVoronoiTooltipSource}
          scope={{
            range, random, React, ReactDOM, VictoryTooltip, VictoryVoronoiTooltip,
            VictoryGroup, VictoryLine, VictoryBar, VictoryChart
          }}
          playgroundtheme="elegant"
          customRenderers={merge(appendLinkIcon, ecologyPlaygroundLoading)}
          exportGist
          copyToClipboard
        />
      </div>
    );
  }
}

export default Radium(Docs);
