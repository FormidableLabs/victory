import React from "react";
import Path from "./path";
import ClipPath from "./clip-path";
import Circle from "./circle";
import { G } from "react-native-svg";
import { Voronoi, VoronoiProps } from "victory-voronoi/es";

const NativeVoronoi = (props: VoronoiProps) => (
  <Voronoi
    pathComponent={<Path />}
    groupComponent={<G />}
    clipPathComponent={<ClipPath />}
    circleComponent={<Circle />}
    {...props}
  />
);

export default NativeVoronoi;
