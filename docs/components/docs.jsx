import ga from "react-ga";
import Ecology from "ecology";
import Radium, { Style } from "radium";
import React from "react";
import ReactDOM from "react-dom";


import * as Victory from "../../src/index";
const { VictoryChart, VictoryLine, VictoryPie } = Victory;
const V = Victory;

import theme from "./theme";

// Child components

// TODO: Extract these global Header/Footers into formidable-landers
// https://github.com/FormidableLabs/formidable-landers/issues/12
import Footer from "./footer";
import Header from "./header";

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
      "@media (min-width: 768px)": {
        flex: "1",
        margin: 0,
        padding: "40px 1rem",
        maxWidth: "640px" // Can the copy be this width & code + playground be wider?
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
      "@media (min-width: 768px)": {
        "flexDirection": "row"
      }
    };
  }

  // H4X GO HERE
  _getPlaygroundTheme() {
    return {
      mediaQueries: {
        "only screen and (min-width: 10em)": {
          ".Interactive .playground .playgroundCode": {
            display: "block" // to no avail :(
          }
        }
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
            <Style rules={this._getPlaygroundTheme()}/>
          </section>
        </main>
        <Footer/>
        <Style rules={theme}/>
      </div>
    );
  }
  /* eslint-enable max-len */
}

export default Docs;
