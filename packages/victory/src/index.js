import {
  Border,
  Box,
  ClipPath,
  LineSegment,
  Whisker,
  Circle,
  Rect,
  Line,
  Path,
  TSpan,
  Text,
  Point,
  VictoryAnimation,
  VictoryContainer,
  VictoryLabel,
  VictoryTheme,
  VictoryTransition,
  VictoryPortal,
  Portal,
  VictoryClipContainer,
  addEvents,
  Collection,
  Data,
  DefaultTransitions,
  Domain,
  Events,
  Helpers,
  Log,
  PropTypes,
  Scale,
  Style,
  TextSize,
  Transitions,
  Selection,
  LabelHelpers,
  Axis,
  Wrapper
} from "victory-core";

import { VictoryChart } from "victory-chart";
import { VictoryGroup } from "victory-group";
import { VictoryStack } from "victory-stack";
import { VictoryPie, Slice } from "victory-pie";
import { VictoryArea, Area } from "victory-area";
import { VictoryBar, Bar } from "victory-bar";
import { VictoryCandlestick, Candle } from "victory-candlestick";
import { VictoryErrorBar, ErrorBar } from "victory-errorbar";
import { VictoryLine, Curve } from "victory-line";
import { VictoryScatter } from "victory-scatter";
import { VictoryBoxPlot } from "victory-box-plot";
import { VictoryVoronoi, Voronoi } from "victory-voronoi";
import { VictoryBrushLine } from "victory-brush-line";
import { VictoryBrushContainer, BrushHelpers, brushContainerMixin } from "victory-brush-container";
import {
  VictoryCursorContainer,
  CursorHelpers,
  cursorContainerMixin
} from "victory-cursor-container";
import {
  VictorySelectionContainer,
  SelectionHelpers,
  selectionContainerMixin
} from "victory-selection-container";
import {
  VictoryVoronoiContainer,
  VoronoiHelpers,
  voronoiContainerMixin
} from "victory-voronoi-container";
import {
  VictoryZoomContainer,
  ZoomHelpers,
  zoomContainerMixin,
  RawZoomHelpers
} from "victory-zoom-container";
import {
  combineContainerMixins,
  makeCreateContainerFunction,
  createContainer
} from "victory-create-container";

import { VictoryTooltip, Flyout } from "victory-tooltip";
import { VictoryLegend } from "victory-legend";
import { VictorySharedEvents } from "victory-shared-events";
import { VictoryAxis } from "victory-axis";
import { VictoryPolarAxis } from "victory-polar-axis";

export {
  Area,
  Bar,
  Border,
  Box,
  Candle,
  ClipPath,
  Curve,
  ErrorBar,
  LineSegment,
  Point,
  Slice,
  Voronoi,
  Flyout,
  Whisker,
  Circle,
  Rect,
  Line,
  Path,
  TSpan,
  Text,
  VictoryAnimation,
  VictoryArea,
  VictoryAxis,
  VictoryPolarAxis,
  VictoryBar,
  VictoryBoxPlot,
  VictoryCandlestick,
  VictoryChart,
  VictoryErrorBar,
  VictoryGroup,
  VictoryLine,
  VictoryLabel,
  VictoryLegend,
  VictoryPie,
  VictoryScatter,
  VictoryStack,
  VictoryTheme,
  VictoryTransition,
  VictorySharedEvents,
  VictoryTooltip,
  VictoryVoronoi,
  VictoryPortal,
  Portal,
  VictoryContainer,
  VictoryClipContainer,
  VictoryZoomContainer,
  ZoomHelpers,
  zoomContainerMixin,
  RawZoomHelpers,
  VictorySelectionContainer,
  SelectionHelpers,
  selectionContainerMixin,
  VictoryBrushContainer,
  BrushHelpers,
  brushContainerMixin,
  VictoryCursorContainer,
  CursorHelpers,
  cursorContainerMixin,
  VictoryVoronoiContainer,
  VoronoiHelpers,
  voronoiContainerMixin,
  combineContainerMixins,
  makeCreateContainerFunction,
  createContainer,
  VictoryBrushLine,
  addEvents,
  Collection,
  Data,
  DefaultTransitions,
  Domain,
  Events,
  Helpers,
  Log,
  PropTypes,
  Scale,
  Style,
  TextSize,
  Transitions,
  Selection,
  LabelHelpers,
  Axis,
  Wrapper
};
