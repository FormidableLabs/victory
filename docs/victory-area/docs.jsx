import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import _ from "lodash";
import Radium, { Style } from "radium";
import * as docgen from "react-docgen";
import { VictoryArea, VictoryStack, VictoryGroup } from "../../src/index";
import { VictoryTheme } from "formidable-landers";

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../../src/components/victory-area/victory-area"))}
          scope={{_, React, ReactDOM, VictoryArea, VictoryStack, VictoryGroup}}
          playgroundtheme="elegant"
        />
        <Style rules={VictoryTheme}/>
      </div>
    );
  }
}

export default Radium(Docs);
