import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link } from "react-router";
import AnimationDocs from "./victory-animation/docs";
import LabelDocs from "./victory-label/docs";

const content = document.getElementById("content");

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element
  },

  render() {
    return (
      <StyleRoot>
        <ul>
          <li><Link to="/animation">Victory Animation Docs</Link></li>
          <li><Link to="/label">Victory Label Docs</Link></li>
        </ul>
        {this.props.children}
      </StyleRoot>
    );
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="animation" component={AnimationDocs}/>
      <Route path="label" component={LabelDocs}/>
    </Route>
  </Router>
), content);
