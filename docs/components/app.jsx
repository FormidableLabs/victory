import React from 'react';
import ReactDOM from 'react-dom';
import Ecology from 'ecology';
import Radium, { Style } from 'radium';
import { Link } from 'react-router';

// Analytics
import ga from 'react-ga';

import theme from './theme';

// TODO: Extract these global Header/Footers into formidable-landers
// https://github.com/FormidableLabs/formidable-landers/issues/12
import Header from "./header";
import Footer from "./footer";

@Radium
class App extends React.Component {
  componentWillMount() {
    ga.pageview('/victory');
  }

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
              <p className="Headline Headline--major u-textCenter">Victory</p>
              <p className="Copy">
                Victory is a collection of composable React components you can use to build interactive data visualizations.
              </p>

              <div className="u-textCenter u-marginModule">
                <code className="Installer">npm install victory</code>
              </div>
            </div>
            <div className="Row">
              <h2 className="u-textCenter">Overarching benefits and motivations</h2>
              <div className="Copy">

                <p>
                  We built Victory because we wanted to bridge the gap between beginners (more likely to use Chart.js or Highcharts) and experts (more likely to use D3). This meant that we had to provide a gradient of customization, from none (just pass in data) to full (build your own visualization features). It also meant focusing on developer UX generally, and led us to provide interactive documentation to help developers get visualizations into their projects. We built <a href="https://github.com/FormidableLabs/ecology">ecology.js</a> for this, see <a href="http://projects.formidablelabs.com/victory-chart/">victory-chart</a> for an example.
                </p>

                <p>
                  Thanks to React’s expressiveness this had the lovely byproduct of making data visualizations first class citizens in the open source ecosystem. Victory components <em>each</em> have:
                </p>
                <ul>
                  <li>
                    Repos rather than gists
                    <ul>
                      <li>forking / issues / prs for continual improvement</li>
                    </ul>
                  </li>
                  <li><code>package.json</code> for dependencies</li>
                  <li>minified dists / umd builds for CDN</li>
                  <li>Babel for ES6</li>
                  <li>Webpack for builds</li>
                  <li><code>propTypes</code> for input validation</li>
                  <li>Hot Reloading</li>
                  <li>sourcemaps</li>
                  <li><code>eslintrc</code></li>
                  <li>Tests</li>
                </ul>
              </div>
            </div>
            <div className="Row">
              <h2 className="u-textCenter">Why React made Victory possible</h2>
              <div className="Copy">
                <ul>
                  <li>React’s DOM model</li>
                  <li>React’s component lifecycle management</li>
                  <li>React allows encapsulation of state + style + behavior in a reusable component</li>
                  <li>JSX syntax is awesome for component composition</li>
                  <li>Radium means components own their styles and style events, can compute them based on data</li>
                  <li>Components handle their own state, making it easier to share stateful visualizations (such as collapsible trees)</li>
                  <li><a href="http://projects.formidablelabs.com/component-playground/">Component playground</a> is the basis for <a href="https://github.com/FormidableLabs/ecology">ecology.js</a></li>
                </ul>

                <p>If you’d like to check out the difference in the animation models, head over to <a href="https://github.com/FormidableLabs/victory-animation">victory-animation</a>.</p>
              </div>
            </div>
            <div className="Row">
              <h2 className="u-textCenter">Where to go from here</h2>
              <div className="Copy">

                <p>Go check out the victory components!</p>
                  <ul>
                    <li><a href="http://projects.formidablelabs.com/victory-axis/">Victory Axis</a></li>
                    <li><a href="http://projects.formidablelabs.com/victory-bar/">Victory Bar</a></li>
                    <li><a href="http://projects.formidablelabs.com/victory-chart/">Victory Chart</a></li>
                    <li><a href="http://projects.formidablelabs.com/victory-line/">Victory Line</a></li>
                    <li><a href="http://projects.formidablelabs.com/victory-pie/">Victory Pie</a></li>
                    <li><a href="http://projects.formidablelabs.com/victory-scatter/">Victory Scatter</a></li>
                  </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer/>
        <Style rules={theme}/>
      </div>
    )
  }
}

export default App;
