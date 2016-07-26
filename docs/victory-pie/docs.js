import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import Radium from "radium";
import * as docgen from "react-docgen";
import { merge, random, range } from "lodash";
import { VictoryPie } from "../../src/index";
import { appendLinkIcon, ecologyPlaygroundLoading } from "formidable-landers";

class Docs extends React.Component {
  render() {
    return (
      <Ecology
        overview={require("!!raw!./ecology.md")}
        source={docgen.parse(require("!!raw!../../src/components/victory-pie"))}
        scope={{merge, random, range, React, ReactDOM, VictoryPie}}
        playgroundtheme="elegant"
        customRenderers={merge(appendLinkIcon, ecologyPlaygroundLoading)}
        exportGist
        copyToClipboard
      />
    );
  }
}

export default Radium(Docs);
