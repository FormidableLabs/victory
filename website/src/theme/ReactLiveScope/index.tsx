import React from 'react';
import ReactDOM from "react-dom";
import * as Victory from "victory";
import {
  scaleDiscontinuous,
  discontinuitySkipWeekends,
} from "@d3fc/d3fc-discontinuous-scale";

import scopeMap from "./scope-map";

const ReactLiveScope = {
  ...Victory,
  ...scopeMap,
  scaleDiscontinuous,
  discontinuitySkipWeekends,
  React,
  ReactDOM,
};

export default ReactLiveScope;
