import React from 'react';
import * as Victory from 'victory';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...Victory,
};

export default ReactLiveScope;