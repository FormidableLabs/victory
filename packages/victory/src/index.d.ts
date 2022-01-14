// TODO: Add missing type definitions for all import/export
// items that are commented out.

declare module "victory" {
  import {
    Arc,
    ArcProps,
    Background,
    BackgroundProps,
    Border,
    BorderProps,
    Border as Box,
    BorderProps as BoxProps,
    ClipPath,
    ClipPathProps,
    LineSegment,
    LineSegmentProps,
    Whisker,
    WhiskerProps,
    Circle,
    Rect,
    Line,
    Path,
    TSpan,
    Text,
    TextProps,
    Point,
    PointProps,
    VictoryAnimation,
    VictoryAnimationProps,
    VictoryContainer,
    VictoryContainerProps,
    VictoryLabel,
    VictoryLabelProps,
    VictoryTheme,
    VictoryThemeDefinition,
    // VictoryTransition,
    VictoryPortal,
    VictoryPortalProps,
    Portal,
    VictoryClipContainer,
    VictoryClipContainerProps,
    // addEvents,
    // Collection,
    // Data,
    // DefaultTransitions,
    // Domain,
    // Events,
    // Helpers,
    // Log,
    // PropTypes,
    // Scale,
    // Style,
    TextSize,
    // Transitions,
    Selection
    // LabelHelpers,
    // Axis,
    // Wrapper
  } from "victory-core";

  import { VictoryChart, VictoryChartProps } from "victory-chart";
  import { VictoryGroup, VictoryGroupProps } from "victory-group";
  import { VictoryStack, VictoryStackProps } from "victory-stack";
  import { VictoryPie, Slice, VictoryPieProps, SliceProps } from "victory-pie";
  import { VictoryArea, Area, VictoryAreaProps, AreaProps } from "victory-area";
  import { VictoryBar, Bar, VictoryBarProps, BarProps } from "victory-bar";

  import {
    VictoryCandlestick,
    VictoryCandlestickProps,
    Candle,
    CandleProps
  } from "victory-candlestick";
  import {
    VictoryErrorBar,
    ErrorBar,
    VictoryErrorBarProps,
    ErrorBarProps
  } from "victory-errorbar";

  import {
    VictoryLine,
    Curve,
    VictoryLineProps,
    CurveProps
  } from "victory-line";
  import { VictoryHistogram, VictoryHistogramProps } from "victory-histogram";
  import { VictoryScatter, VictoryScatterProps } from "victory-scatter";
  import { VictoryBoxPlot, VictoryBoxPlotProps } from "victory-box-plot";
  import { VictoryBrushLine, VictoryBrushLineProps } from "victory-brush-line";
  import {
    Voronoi,
    VictoryVoronoi,
    VoronoiProps,
    VictoryVoronoiProps
  } from "victory-voronoi";

  import {
    VictoryBrushContainer,
    VictoryBrushContainerProps
    // BrushHelpers,
    // brushContainerMixin
  } from "victory-brush-container";
  import {
    VictoryCursorContainer,
    VictoryCursorContainerProps
    // CursorHelpers,
    // cursorContainerMixin
  } from "victory-cursor-container";

  import {
    VictorySelectionContainer,
    SelectionHelpers,
    selectionContainerMixin
  } from "victory-selection-container";

  import {
    VictoryVoronoiContainer,
    VictoryVoronoiContainerProps
    // VoronoiHelpers,
    // voronoiContainerMixin
  } from "victory-voronoi-container";
  import {
    VictoryZoomContainer,
    VictoryZoomContainerProps
    // ZoomHelpers,
    // zoomContainerMixin,
    // RawZoomHelpers
  } from "victory-zoom-container";
  import {
    // combineContainerMixins,
    // makeCreateContainerFunction,
    createContainer
  } from "victory-create-container";

  import {
    VictoryTooltip,
    Flyout,
    VictoryTooltipProps,
    FlyoutProps
  } from "victory-tooltip";
  import { VictoryLegend, VictoryLegendProps } from "victory-legend";

  // import { VictorySharedEvents } from "victory-shared-events";

  import { VictoryAxis, VictoryAxisProps } from "victory-axis";
  import { VictoryPolarAxis, VictoryPolarAxisProps } from "victory-polar-axis";

  export {
    Arc,
    ArcProps,
    Area,
    AreaProps,
    Background,
    BackgroundProps,
    Bar,
    BarProps,
    Border,
    BorderProps,
    Box,
    BoxProps,
    Candle,
    CandleProps,
    ClipPath,
    ClipPathProps,
    Curve,
    CurveProps,
    ErrorBar,
    ErrorBarProps,
    LineSegment,
    LineSegmentProps,
    Point,
    PointProps,
    Slice,
    SliceProps,
    Voronoi,
    VoronoiProps,
    Flyout,
    FlyoutProps,
    Whisker,
    WhiskerProps,
    Circle,
    Rect,
    Line,
    Path,
    TSpan,
    Text,
    TextProps,
    VictoryAnimation,
    VictoryAnimationProps,
    VictoryArea,
    VictoryAreaProps,
    VictoryAxis,
    VictoryAxisProps,
    VictoryPolarAxis,
    VictoryPolarAxisProps,
    VictoryBar,
    VictoryBarProps,
    VictoryBoxPlot,
    VictoryBoxPlotProps,
    VictoryCandlestick,
    VictoryCandlestickProps,
    VictoryChart,
    VictoryChartProps,
    VictoryErrorBar,
    VictoryErrorBarProps,
    VictoryHistogram,
    VictoryHistogramProps,
    VictoryGroup,
    VictoryGroupProps,
    VictoryLine,
    VictoryLineProps,
    VictoryLabel,
    VictoryLabelProps,
    VictoryLegend,
    VictoryLegendProps,
    VictoryPie,
    VictoryPieProps,
    VictoryScatter,
    VictoryScatterProps,
    VictoryStack,
    VictoryStackProps,
    VictoryTheme,
    VictoryThemeDefinition,
    // VictoryTransition,
    // VictorySharedEvents,
    VictoryTooltip,
    VictoryTooltipProps,
    VictoryVoronoi,
    VictoryVoronoiProps,
    VictoryPortal,
    VictoryPortalProps,
    Portal,
    VictoryContainer,
    VictoryContainerProps,
    VictoryClipContainer,
    VictoryClipContainerProps,
    VictoryZoomContainer,
    VictoryZoomContainerProps,
    // ZoomHelpers,
    // zoomContainerMixin,
    // RawZoomHelpers,
    VictorySelectionContainer,
    SelectionHelpers,
    selectionContainerMixin,
    VictoryBrushContainer,
    VictoryBrushContainerProps,
    // BrushHelpers,
    // brushContainerMixin,
    VictoryCursorContainer,
    VictoryCursorContainerProps,
    // CursorHelpers,
    // cursorContainerMixin,
    VictoryVoronoiContainer,
    VictoryVoronoiContainerProps,
    // VoronoiHelpers,
    // voronoiContainerMixin,
    // combineContainerMixins,
    // makeCreateContainerFunction,
    createContainer,
    VictoryBrushLine,
    VictoryBrushLineProps,
    // addEvents,
    // Collection,
    // Data,
    // DefaultTransitions,
    // Domain,
    // Events,
    // Helpers,
    // Log,
    // PropTypes,
    // Scale,
    // Style,
    TextSize,
    // Transitions,
    Selection
    // LabelHelpers,
    // Axis,
    // Wrapper
  };
}
