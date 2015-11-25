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

  /* eslint-disable max-len */
  render() {
    return (
      <div style={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
        <Header/>
        <main className="Container" style={{flex: "1"}}>
          <header className="Header">
            <div className="Row" style={{margin: "0 auto"}}>
              <h1 className="Logo u-textCenter">
                <img width="230px" src="static/logo-victory.svg" alt="Victory" />
              </h1>
            </div>
          </header>

          <div className="Row">
            <p className="Headline Headline--major u-textCenter">Victory</p>

            <div className="u-textCenter">
              <code className="Installer">npm install victory</code>
            </div>
          </div>
          <div className="Row">
            <h2 className="u-textCenter">Powerful, effortless data visualization</h2>
            <div className="Copy">
              <p>
                Victory is a small and growing ecosystem of data visualization components written for React.
              </p>
              <p>
                The modular, componentized nature of React has allowed us to write fully-contained, reusable data visualization elements that are responsible for their own styles and behaviors.
              </p>
              <p>
                The use of sensible default props makes getting started very easy, without sacrificing flexiblity. Victory also leverages React lifecycle methods and DOM diffing to create a lightweight animation wrapper.
              </p>
              <p>
                When combined, these features result in a set of components that are easy to use, and compose into more complicated visualizations.
              </p>
            </div>
            <div className="Copy u-textCenter">
              <button className="Button Button--large">Get Started</button>
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
