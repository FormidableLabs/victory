import { components, headerText } from "../config";
import { Link } from "react-router";
import Radium, { Style } from "radium";
import React from "react";
import Ecology from "ecology";
import ReactDOM from "react-dom";
import { VictoryChart, VictoryLine, VictoryPie } from "../../src/index";
import { VictorySettings, VictoryTheme, Header, Footer} from "formidable-landers";
// Analytics
import ga from "react-ga";

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
        <Header backgroundColor={VictorySettings.palestSand} styleOverrides={{display: "block"}}>
          {headerText}
        </Header>
        <main className="Container" style={this.getMainStyles()}>

          <header className="Header">
            <div className="Row" style={{margin: "0 auto"}}>
              <h1 className="Logo u-textCenter">
                <img
                  src="static/logo-victory.svg"
                  alt="Victory"
                  width="230px"
                />
              </h1>
            </div>
          </header>

          <div className="Row">
            <p className="Headline Headline--major u-textCenter">
              Victory
              <span style={{
                fontFamily: VictorySettings.sansSerif,
                fontSize: "0.35em",
                verticalAlign: "1em"
              }}>&#8482;</span>
            </p>
            <div className="u-textCenter">
              <code className="Installer">npm install victory</code>
            </div>
          </div>

          <div className="Row">
            <p className="Headline Headline--minor u-textCenter">
              An ecosystem of modular data visualization components for React.
            </p>
          </div>

          <div>
            <Ecology
              overview={require("!!raw!../ecology.md")}
              scope={{React, ReactDOM, VictoryChart, VictoryLine, VictoryPie}}
              playgroundtheme="elegant"
            />
          </div>

          <div className="Row">
            <h2 className="u-textCenter">Friendly</h2>
            <p className="Copy">
              The modular, componentized nature of React has allowed us to write fully-contained, reusable data visualization elements that are responsible for their own styles and behaviors.
            </p>
          </div>

          <div className="Row">
            <h2 className="u-textCenter">Flexible</h2>
            <p className="Copy">
              The use of sensible default props makes getting started very easy, without sacrificing flexibility. Victory also leverages React lifecycle methods and DOM diffing to create a lightweight animation wrapper.
            </p>
          </div>

          <div className="Row">
            <h2 className="u-textCenter">Composable</h2>
            <p className="Copy">
              When combined, these features result in a set of components that are easy to use, and compose into more complicated visualizations.
            </p>
          </div>

          <div className="Row">
            <div className="Copy u-textCenter">
              <Link className="Button Button--spotlight" to="docs">Get Started</Link>
            </div>
          </div>

          <div className="Row">
            <h3 className="u-textCenter">Quick links:</h3>
            <p className="Copy">
              GitHub: <a href="https://github.com/FormidableLabs/victory">
                https://github.com/FormidableLabs/victory
              </a>
            </p>
            <p className="Copy">
              Gitter chatroom: <a href="https://gitter.im/FormidableLabs/victory">
                https://gitter.im/FormidableLabs/victory
              </a>
            </p>
            <p className="Copy">
              Roadmap: <a href="https://github.com/FormidableLabs/victory/blob/master/ROADMAP.md">
                ROADMAP.md
              </a>
            </p>
            <p className="Copy">Component docs:</p>
            <ul className="Copy">
              {components.map((component) => {
                return (
                  <li key={component.slug}>
                    <Link to={`docs/${component.slug}`}>
                      {component.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

        </main>
        <Footer backgroundColor={VictorySettings.palestSand}>
          <div style={{margin: "2em 0", fontSize: "0.8rem"}}>
            Victory is a trademark of Formidable Labs, Inc.
          </div>
        </Footer>
        <Style rules={VictoryTheme}/>
      </div>
    );
  }
  /* eslint-enable max-len */
}

export default Radium(App);
