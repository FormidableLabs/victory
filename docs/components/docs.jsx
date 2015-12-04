import ga from "react-ga";
import Ecology from "ecology";
import Radium, { Style } from "radium";
import React from "react";
import ReactDOM from "react-dom";

import * as Victory from "../../src/index";
const { VictoryChart, VictoryLine, VictoryPie } = Victory;
const V = Victory;

import { Header, Footer, VictoryTheme } from "formidable-landers";

import Sidebar from "./sidebar";

@Radium
class Docs extends React.Component {

  componentWillMount() {
    ga.pageview("/victory/docs");
  }

  getDocsStyles() {
    return {
      margin: "1rem 0 0 0",
      padding: "1rem 0.5rem",
      "@media (min-width: 70em)": {
        flex: "1",
        margin: 0,
        padding: "60px 1rem"
      }
    };
  }

  getMainStyles() {
    return {
      display: "flex",
      flex: "1 0 auto",
      flexDirection: "column",
      margin: "0 auto",
      padding: "1rem",
      maxWidth: "70em",
      "@media (min-width: 70em)": {
        "flexDirection": "row"
      }
    };
  }

  /* eslint-disable max-len */
  render() {
    return (
      <div style={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
        <Header/>
        <main style={this.getMainStyles()}>
          <Sidebar/>
          <section style={this.getDocsStyles()}>
            <Ecology
              overview={require("!!raw!../ecology-getting-started.md")}
              scope={{React, ReactDOM, V, VictoryChart, VictoryLine, VictoryPie}}
              playgroundtheme="elegant" />
          </section>
        </main>
        <Footer/>
        <Style rules={VictoryTheme}/>
      </div>
    );
  }
  /* eslint-enable max-len */
}

export default Docs;
