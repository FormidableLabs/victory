import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import Radium, { Style } from "radium";
import _ from "lodash";
import * as docgen from "react-docgen";
import { VictoryBar, VictoryGroup, VictoryStack} from "../../src/index";
import { VictoryLabel } from "victory-core";
import { VictoryTheme } from "formidable-landers";

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../../src/components/victory-bar/victory-bar"))}
          scope={{_, React, ReactDOM, VictoryLabel, VictoryBar, VictoryGroup, VictoryStack}}
          playgroundtheme="elegant"
        />
        <Style rules={VictoryTheme}/>
      </div>
    );
  }
}

export default Radium(Docs);
