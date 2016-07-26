import React from "react";
import ReactDOM from "react-dom";
import { merge } from "lodash";
import Ecology from "ecology";
import Radium from "radium";
import * as docgen from "react-docgen";
import { appendLinkIcon, ecologyPlaygroundLoading } from "formidable-landers";
import { VictoryLabel } from "../../src/index";

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../../src/victory-label/victory-label"))}
          scope={{React, ReactDOM, VictoryLabel}}
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
