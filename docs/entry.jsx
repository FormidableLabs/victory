import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router";
import App from "./app";
import AnimationDocs from "./victory-animation/docs";
import LabelDocs from "./victory-label/docs";

const content = document.getElementById("content");

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="animation" component={AnimationDocs}/>
      <Route path="label" component={LabelDocs}/>
    </Route>
  </Router>
), content);
