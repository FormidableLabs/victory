import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import Radium, { Style, StyleRoot } from "radium";
import * as docgen from "react-docgen";
import { VictoryTheme } from "formidable-landers";
import { VictoryPie } from "../src/index";

class Docs extends React.Component {
  render() {
    return (
      <StyleRoot>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../src/components/victory-pie"))}
          scope={{React, ReactDOM, VictoryPie}}
          playgroundtheme="elegant" />
        <Style rules={VictoryTheme}/>
      </StyleRoot>
    )
  }
}

export default Radium(Docs);
