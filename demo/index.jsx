/* eslint new-cap:0 no-unused-vars:0 */
'use strict';

var React = require('react/addons');
var Playground = require('component-playground');
var Radium = require('radium');

var {VictoryPie} = require('victory-pie');
var {VictoryScatter} = require('victory-scatter');

require('./styles/syntax.css');
require('./styles/codemirror.css');

var scatterExample = require("raw!./examples/scatter.example");
// var pieExample = require("raw!./examples/pie.example");

var scatterDocs = require("./docs/scatter.md");
// var pieDocs = require("./docs/pie.md");

var Index = React.createClass({
  render() {
    return (
      <div>


        <div className="Interactive">
          <Playground
            codeText={scatterExample}
            scope={{React: React, VictoryScatter: VictoryScatter, Radium: Radium}}
            theme="base16-ocean-dark"/>
        </div>

        <div className="Copy">
          {scatterDocs}
        </div>
      </div>
    );
  }
});

React.render(<Index/>, document.getElementById('playground'));
