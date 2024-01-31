import React from "react";
import { Path } from "./path";
import { ClipPath } from "./clip-path";
import { Circle } from "./circle";
import { G } from "react-native-svg";
import { Voronoi as VoronoiBase, VoronoiProps } from "victory-voronoi/es";

export const Voronoi = (props: VoronoiProps) => (
  <VoronoiBase
    pathComponent={<Path />}
    groupComponent={<G />}
    clipPathComponent={<ClipPath />}
    circleComponent={<Circle />}
    {...props}
  />
);
