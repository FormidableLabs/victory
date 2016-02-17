import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import Radium, { Style } from "radium";
import * as docgen from "react-docgen";
import { VictoryTheme } from "formidable-landers";

@Radium
class Docs extends React.Component {
  render() {
    return (
      <div>
        <Ecology
          overview={require("!!raw!./ecology.md")}
          source={docgen.parse(require("!!raw!../src/components/victory-label"))}
          scope={{React, ReactDOM, VictoryLabel: require("../src/components/victory-label")}}
          playgroundtheme="elegant" />
        <Style rules={VictoryTheme}/>
      </div>
    )
  }
}

if (typeof document !== "undefined") {
  const content = document.getElementById("content");
  ReactDOM.render(<Docs/>, content);
}

export default Docs;
