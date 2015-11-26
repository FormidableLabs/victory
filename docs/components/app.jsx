import Ecology from "ecology";
import React from "react";
import ReactDOM from "react-dom";
import Radium, { Style } from "radium";
import {VictoryChart, VictoryLine} from "../../src/index";

// Analytics
import ga from "react-ga";

import theme from "./theme";

// TODO: Extract these global Header/Footers into formidable-landers
// https://github.com/FormidableLabs/formidable-landers/issues/12
import Header from "./header";
import Footer from "./footer";

@Radium
class App extends React.Component {
  componentWillMount() {
    ga.pageview("/victory");
  }

  getMainStyles() {
    return {
      display: "flex",
      flex: "1 0 auto",
      flexDirection: "column",
      margin: "0 auto",
      padding: "1rem"
    };
  }

  /* eslint-disable max-len */
  render() {
    return (
      <div style={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
        <Header/>
        <main className="Container" style={this.getMainStyles()}>
          <header className="Header">
            <div className="Row" style={{margin: "0 auto"}}>
              <h1 className="Logo u-textCenter">
                <img src="static/logo-victory.svg" alt="Victory"
                  width="230px" />
              </h1>
            </div>
          </header>

          <div className="Row">
            <p className="Headline Headline--major u-textCenter">Victory</p>

            <div className="u-textCenter">
              <code className="Installer">npm install victory</code>
            </div>
          </div>

          <div>
            <Ecology
              overview={require("!!raw!../ecology.md")}
              scope={{React, ReactDOM, VictoryChart, VictoryLine}}
              playgroundtheme="elegant" />
            <Style rules={theme}/>
          </div>

          <div className="Row">
            <div className="Copy u-textCenter">
              <a className="Button Button--spotlight" href="/install">Get Started</a>
            </div>
          </div>

        </main>
        <Footer/>
        <Style rules={theme}/>
      </div>
    );
  }
  /* eslint-enable max-len */
}

export default App;
