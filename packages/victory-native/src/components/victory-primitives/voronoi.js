import React from "react";
import Path from "./path";
import ClipPath from "./clip-path";
import Circle from "./circle";
import { G } from "react-native-svg";
import { Voronoi } from "victory-voronoi/es";

const NativeVoronoi = (props) => (
  <Voronoi
    pathComponent={<Path/>}
    groupComponent={<G/>}
    clipPathComponent={<ClipPath/>}
    circleComponent={<Circle/>}
    {...props}
  />
);

export default NativeVoronoi;
