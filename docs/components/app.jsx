import React from "react";
import Radium, { Style } from "radium";

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
          {/*-- Begin ecology.md here: --*/}
          <div className="Row">
            <h2 className="u-textCenter">Modular</h2>
            <p className="Copy">
              Victory is a small and growing ecosystem of data visualization components written for React.
            </p>
          </div>
          <div className="Row">
            <h2 className="u-textCenter">Powerful</h2>
            <p className="Copy">
              The modular, componentized nature of React has allowed us to write fully-contained, reusable data visualization elements that are responsible for their own styles and behaviors.
            </p>
          </div>
          <div className="Row">
            <h2 className="u-textCenter">Effortless</h2>
            <p className="Copy">
              The use of sensible default props makes getting started very easy, without sacrificing flexiblity. Victory also leverages React lifecycle methods and DOM diffing to create a lightweight animation wrapper.
            </p>
          </div>
          <div className="Row">
            <h2 className="u-textCenter">Victorious</h2>
            <p className="Copy">
              When combined, these features result in a set of components that are easy to use, and compose into more complicated visualizations.
            </p>
          </div>
          <div className="Row">
            <div className="u-textCenter">
              <ul style={{listStyle: "none", margin: 0, padding: 0}}>
                <li><a href="http://projects.formidablelabs.com/victory-axis/">Victory Axis</a></li>
                <li><a href="http://projects.formidablelabs.com/victory-bar/">Victory Bar</a></li>
                <li><a href="http://projects.formidablelabs.com/victory-chart/">Victory Chart</a></li>
                <li><a href="http://projects.formidablelabs.com/victory-line/">Victory Line</a></li>
                <li><a href="http://projects.formidablelabs.com/victory-pie/">Victory Pie</a></li>
                <li><a href="http://projects.formidablelabs.com/victory-scatter/">Victory Scatter</a></li>
              </ul>
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
