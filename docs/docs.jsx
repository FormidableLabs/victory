import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import Radium, { Style } from "radium";
import * as docgen from "react-docgen";
import { VictoryTheme } from "formidable-landers";
import { VictoryPie } from "../src/index";

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../src/components/victory-pie"))}
          scope={{React, ReactDOM, VictoryPie}}
          playgroundtheme="elegant" />
        <Style rules={VictoryTheme}/>
      </div>
    )
  }
}

export default Radium(Docs);
