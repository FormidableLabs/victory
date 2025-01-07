import { AreaExamples } from "./area";
import { AxisExamples } from "./axis";
import { BarExamples } from "./bar";
import { BoxPlotExamples } from "./box-plot";
import { CandlestickExamples } from "./candlestick";
import { ErrorBarExamples } from "./errorbar";
import { GroupExamples } from "./group";
import { HistogramExamples } from "./histogram";
import { LineExamples } from "./line";
import { PieExamples } from "./pie";
import { PolarAxisExamples } from "./polar-axis";
import { PolarAxisDependentExamples } from "./polar-axis-dependent";
import { ScatterExamples } from "./scatter";
import { StackExamples } from "./stack";
import { VoronoiExamples } from "./voronoi";

// NOTE: these are ordered specifically for the previews
//       to show the most common examples first
export const AllExamples = [
  ...AreaExamples,
  ...BarExamples,
  ...GroupExamples,
  ...LineExamples,
  ...PieExamples,
  ...StackExamples,
  ...BoxPlotExamples,
  ...CandlestickExamples,
  ...ErrorBarExamples,
  ...HistogramExamples,
  ...ScatterExamples,
  ...VoronoiExamples,
  ...AxisExamples,
  ...PolarAxisExamples,
  ...PolarAxisDependentExamples,
];

export * from "./area";
export * from "./axis";
export * from "./bar";
export * from "./box-plot";
export * from "./candlestick";
export * from "./errorbar";
export * from "./example";
export * from "./group";
export * from "./histogram";
export * from "./legend";
export * from "./line";
export * from "./pie";
export * from "./polar-axis";
export * from "./polar-axis-dependent";
export * from "./scatter";
export * from "./stack";
export * from "./voronoi";
