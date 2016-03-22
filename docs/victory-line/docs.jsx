import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import _ from "lodash";
import Radium, { Style } from "radium";
import * as docgen from "react-docgen";
import { VictoryLine } from "../../src/index";
import { VictoryTheme } from "formidable-landers";

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../../src/components/victory-line/victory-line"))}
          scope={{_, React, ReactDOM, VictoryLine}}
          playgroundtheme="elegant"
        />
        <Style rules={VictoryTheme}/>
      </div>
    );
  }
}

export default Radium(Docs);
