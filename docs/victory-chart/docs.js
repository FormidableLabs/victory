import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import { merge, random, range } from "lodash";
import Radium from "radium";
import * as docgen from "react-docgen";
import {
  VictoryChart, VictoryLine, VictoryAxis, VictoryBar, VictoryScatter, VictoryStack
} from "../../src/index";
import { appendLinkIcon, ecologyPlaygroundLoading } from "formidable-landers";
import DatasetDropdown from "../dataset-dropdown";
import dataset from "./dataset";

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../../src/components/victory-chart/victory-chart"))}
          scope={{
            merge, range, random, React, ReactDOM, VictoryScatter, VictoryLine,
            VictoryAxis, VictoryBar, VictoryChart, VictoryStack, DatasetDropdown, dataset
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
