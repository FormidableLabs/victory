import Ecology from "ecology";
import _ from "lodash";
import Radium, { Style } from "radium";
import React from "react";
import ReactDOM from "react-dom";
import symbolData from "./symbol-data";
import * as docgen from "react-docgen";
import { VictoryScatter } from "../../src/index";
import { VictoryTheme } from "formidable-landers";

@Radium
class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../../src/components/victory-scatter/victory-scatter"))}
          scope={{_, React, ReactDOM, symbolData, VictoryScatter}}
          playgroundtheme="elegant" />
        <Style rules={VictoryTheme}/>
      </div>
    )
  }
}

export default Docs;
