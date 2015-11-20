import React from 'react';
import ReactDOM from 'react-dom';
import Ecology from 'ecology';
import Radium, { Style } from 'radium';

import theme from './theme';

// TODO: Extract these global Header/Footers into formidable-landers
// https://github.com/FormidableLabs/formidable-landers/issues/12
import Header from "./header";
import Footer from "./footer";

@Radium
class App extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', minHeight: '100vh', flexDirection: 'column'}}>
        <Header/>
        <main style={{flex: '1'}}>
          <header className="Header">
            <div className="Container">
              <div className="Row" style={{margin: '0 auto'}}>
                <h1 className="Logo u-textCenter">
                  <img width="230px" src="static/logo-victory.svg" alt="Victory" />
                </h1>
              </div>
            </div>
          </header>

          <div className="Container">
            <div className="Row">
              <p className="Headline Headline--major u-textCenter">Powerful, effortless data visualization</p>
              <p className="Copy">
                Victory is.
              </p>

            <div className="u-textCenter u-marginModule">
              <code className="Installer">npm install victory</code>
            </div>
            </div>
            <div className="Copy">
            </div>
          </div>
        </main>
        <Footer/>
        <Style rules={theme}/>
      </div>
    )
  }
}

if (typeof document !== "undefined") {
  const content = document.getElementById("content");
  ReactDOM.render(<App/>, content);
}

export default App;
