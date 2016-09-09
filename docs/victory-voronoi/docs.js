import Ecology from "ecology";
import { merge, random, range } from "lodash";
import Radium from "radium";
import React from "react";
import ReactDOM from "react-dom";
import * as docgen from "react-docgen";
import { VictoryVoronoi } from "../../src/index";
import { appendLinkIcon, ecologyPlaygroundLoading } from "formidable-landers";

class Docs extends React.Component {
  render() {
    const victoryVoronoiSource = docgen.parse(
      require("!!raw!../../src/components/victory-voronoi/victory-voronoi")
    );

    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={victoryVoronoiSource}
          scope={{range, random, React, ReactDOM, VictoryVoronoi}}
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
