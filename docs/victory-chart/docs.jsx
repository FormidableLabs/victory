import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import Radium, { Style } from "radium";
import * as docgen from "react-docgen";
import {
  VictoryChart, VictoryLine, VictoryAxis, VictoryBar, VictoryScatter
} from "../../src/index";
import {VictoryTheme} from "formidable-landers";

@Radium
class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../../src/components/victory-chart/victory-chart"))}
          scope={{
            React, ReactDOM, VictoryScatter, VictoryLine, VictoryAxis, VictoryBar, VictoryChart
          }}
          playgroundtheme="elegant" />
        <Style rules={VictoryTheme}/>
      </div>
    )
  }
}

export default Docs;
