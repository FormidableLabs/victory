import React from "react";
import ReactDOM from "react-dom";
import d3Scale from "d3-scale";
import Ecology from "ecology";
import Radium, { Style } from "radium";
import {VictoryAxis} from "victory-axis";
import {VictoryBar} from "victory-bar";
import {VictoryLine} from "victory-line";
import {VictoryScatter} from "victory-scatter";
import * as docgen from "react-docgen";

import {VictoryTheme} from "formidable-landers";

@Radium
class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../src/components/victory-chart"))}
          scope={{
            React,
            ReactDOM,
            d3Scale,
            VictoryScatter,
            VictoryLine,
            VictoryAxis,
            VictoryBar,
            VictoryChart: require("../src/components/victory-chart")}}
          playgroundtheme="elegant" />
        <Style rules={VictoryTheme}/>
      </div>
    )
  }
}

export default Docs;
