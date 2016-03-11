import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import Radium, { Style } from "radium";
import * as docgen from "react-docgen";
import { VictoryTheme } from "formidable-landers";
import { VictoryLabel } from "../../src/index";

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../../src/victory-label/victory-label"))}
          scope={{React, ReactDOM, VictoryLabel}}
          playgroundtheme="elegant" />
        <Style rules={VictoryTheme}/>
      </div>
    )
  }
}

export default Radium(Docs);
