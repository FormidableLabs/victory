/* eslint new-cap:0 no-unused-vars:0 */
'use strict';

var React = require('react/addons');
var Playground = require('component-playground');
var {VictoryScatter} = require('victory-scatter');
var Radium = require('radium');

require('./styles/syntax.css');
require('./styles/codemirror.css');

var scatterExample = require("raw!./examples/scatter.example");

var Index = React.createClass({
  render() {
    return (
      <div className="Interactive">
        <Playground
          codeText={scatterExample}
          scope={{React: React, VictoryScatter: VictoryScatter, Radium: Radium}}/>
      </div>
    );
  }
});

React.render(<Index/>, document.getElementById('playground'));
