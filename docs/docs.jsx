import React from 'react';
import ReactDOM from 'react-dom';
import Ecology from 'ecology';
import Radium, { Style } from 'radium';

import theme from './theme';

@Radium
class Docs extends React.Component {
  render() {
    return (
      <div>
        <header className="Header">
          <div className="Container">
            <div className="Row">
              <h1 className="Logo">
                <img width="230px" src="img/logo-victory.svg" alt="Victory" />
              </h1>
            </div>
          </div>
        </header>

        <div className="Container">
          <div className="Row">
            <p className="Headline Headline--major u-textCenter">Powerful, effortless data visualization</p>
            <p className="Copy">
              Victory is a collection of chart components that swap out D3’s DOM model for ReactJS. It combines low level control of animations and transitions with chart reusability.
            </p>

          <div className="u-textCenter u-marginModule">
            <code className="Installer">npm install victory</code>
          </div>
          </div>
          <div className="Copy">
            Victory is a collection of chart components.
          </div>
          <Style rules={theme}/>
        </div>
      </div>
    )
  }
}

if (typeof document !== "undefined") {
  const content = document.getElementById("content");
  ReactDOM.render(<Docs/>, content);
}

export default Docs;
