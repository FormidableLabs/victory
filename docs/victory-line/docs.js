import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import { merge, random } from "lodash";
import Radium, { Style } from "radium";
import * as docgen from "react-docgen";
import { VictoryLine, VictoryScatter } from "../../src/index";
import { VictoryTheme, appendLinkIcon } from "formidable-landers";

class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../../src/components/victory-line/victory-line"))}
          scope={{ merge, random, React, ReactDOM, VictoryLine, VictoryScatter }}
          playgroundtheme="elegant"
          customRenderers={appendLinkIcon}
        />
        <Style rules={VictoryTheme}/>
      </div>
    );
  }
}

export default Radium(Docs);
