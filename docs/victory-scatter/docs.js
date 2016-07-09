import Ecology from "ecology";
import { merge, random, range } from "lodash";
import Radium, { Style } from "radium";
import React from "react";
import ReactDOM from "react-dom";
import symbolData from "./symbol-data";
import * as docgen from "react-docgen";
import { VictoryScatter } from "../../src/index";
import { VictoryTheme, appendLinkIcon, ecologyPlaygroundLoading } from "formidable-landers";

class Docs extends React.Component {
  render() {
    const victoryScatterSource = docgen.parse(
      require("!!raw!../../src/components/victory-scatter/victory-scatter")
    );

    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={victoryScatterSource}
          scope={{merge, range, random, React, ReactDOM, symbolData, VictoryScatter}}
          playgroundtheme="elegant"
          customRenderers={merge(appendLinkIcon, ecologyPlaygroundLoading)}
        />
        <Style rules={VictoryTheme}/>
      </div>
    );
  }
}

export default Radium(Docs);
