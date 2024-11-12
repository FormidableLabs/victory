import React from "react";
import ReactDOM from "react-dom";

import scopeMap from "./scope-map";

const ReactLiveScope = {
  ...scopeMap,
  React,
  ReactDOM,
};

export default ReactLiveScope;
