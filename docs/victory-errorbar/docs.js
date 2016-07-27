import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import Radium from "radium";
import { merge, random, range } from "lodash";
import * as docgen from "react-docgen";
import { VictoryErrorBar, VictoryChart, VictoryAxis} from "../../src/index";
import { VictoryLabel } from "victory-core";
import { appendLinkIcon, ecologyPlaygroundLoading } from "formidable-landers";

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require(
            "!!raw!../../src/components/victory-errorbar/victory-errorbar"
            ))}
          scope={{
            merge, range, random, React, ReactDOM, VictoryLabel,
            VictoryErrorBar, VictoryChart, VictoryAxis
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
