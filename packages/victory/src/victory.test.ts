/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Victory from "victory";
import {
  Arc,
  ArcProps,
  Area,
  AreaProps,
  Axis,
  Background,
  BackgroundProps,
  Bar,
  BarProps,
  Border,
  BorderProps,
  Box,
  BoxProps,
  BrushHelpers,
  Candle,
  CandleProps,
  CanvasBar,
  CanvasBarProps,
  CanvasCurve,
  CanvasCurveProps,
  CanvasGroup,
  CanvasGroupProps,
  CanvasPoint,
  CanvasPointProps,
  Circle,
  ClipPath,
  ClipPathProps,
  Collection,
  ContainerType,
  CursorHelpers,
  Curve,
  CurveProps,
  Data,
  DefaultTransitions,
  Domain,
  ErrorBar,
  ErrorBarProps,
  Events,
  Flyout,
  FlyoutProps,
  Helpers,
  LabelHelpers,
  Line,
  LineSegment,
  LineSegmentProps,
  Log,
  Path,
  Point,
  PointProps,
  Portal,
  RawZoomHelpers,
  Rect,
  Scale,
  Selection,
  SelectionHelpers,
  Slice,
  SliceProps,
  Style,
  TSpan,
  Text,
  TextPath,
  TextProps,
  TextSize,
  Transitions,
  UserProps,
  VictoryAccessibleGroup,
  VictoryAccessibleGroupProps,
  VictoryAnimation,
  VictoryAnimationProps,
  VictoryArea,
  VictoryAreaProps,
  VictoryAxis,
  VictoryAxisProps,
  VictoryBar,
  VictoryBarProps,
  VictoryBoxPlot,
  VictoryBoxPlotProps,
  VictoryBrushContainer,
  VictoryBrushContainerProps,
  VictoryBrushLine,
  VictoryBrushLineProps,
  VictoryCandlestick,
  VictoryCandlestickProps,
  VictoryChart,
  VictoryChartProps,
  VictoryClipContainer,
  VictoryClipContainerProps,
  VictoryContainer,
  VictoryContainerProps,
  VictoryCursorContainer,
  VictoryCursorContainerProps,
  VictoryErrorBar,
  VictoryErrorBarProps,
  VictoryGroup,
  VictoryGroupProps,
  VictoryHistogram,
  VictoryHistogramProps,
  VictoryLabel,
  VictoryLabelProps,
  VictoryLegend,
  VictoryLegendProps,
  VictoryLine,
  VictoryLineProps,
  VictoryPie,
  VictoryPieProps,
  VictoryPolarAxis,
  VictoryPolarAxisProps,
  VictoryPortal,
  VictoryPortalProps,
  VictoryScatter,
  VictoryScatterProps,
  VictorySelectionContainer,
  VictorySelectionContainerProps,
  VictorySharedEvents,
  VictorySharedEventsProps,
  VictoryStack,
  VictoryStackProps,
  VictoryTheme,
  VictoryThemeDefinition,
  VictoryTooltip,
  VictoryTooltipProps,
  VictoryTransition,
  VictoryVoronoi,
  VictoryVoronoiContainer,
  VictoryVoronoiContainerProps,
  VictoryVoronoiProps,
  VictoryZoomContainer,
  VictoryZoomContainerProps,
  Voronoi,
  VoronoiHelpers,
  VoronoiProps,
  Whisker,
  WhiskerProps,
  Wrapper,
  ZoomHelpers,
  addEvents,
  brushContainerMixin,
  combineContainerMixins,
  createContainer,
  cursorContainerMixin,
  makeCreateContainerFunction,
  selectionContainerMixin,
  useCanvasContext,
  voronoiContainerMixin,
  zoomContainerMixin,
} from "victory";

describe("victory", () => {
  it("ensure it has named exports", () => {
    expect(Area).toBeInstanceOf(Function);
  });
  it("ensure all components have valid types", () => {
    /*
     * See https://github.com/FormidableLabs/victory/issues/2411
     * It's easy for some of our Components to accidentally get typed as 'any'.
     * This seems to be due to our use of mixins, especially `addEvents`.
     *
     * This test is designed to catch those errors, so that we can be sure
     * that all of our components are exported with the proper types.
     */

    let shouldNotBeTypedAsAny: { SHOULD_NOT_BE_TYPED_AS_ANY: true };

    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryAccessibleGroup;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryAccessibleGroupProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryAnimation;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryAnimationProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryArea;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryAreaProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryAxis;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryAxisProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryBar;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryBarProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryBoxPlot;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryBoxPlotProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryBrushContainer;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryBrushContainerProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryBrushLine;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryBrushLineProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryCandlestick;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryCandlestickProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryChart;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryChartProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryClipContainer;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryClipContainerProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryContainer;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryContainerProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryCursorContainer;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryCursorContainerProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryErrorBar;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryErrorBarProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryGroup;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryGroupProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryHistogram;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryHistogramProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryLabel;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryLabelProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryLegend;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryLegendProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryLine;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryLineProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryPie;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryPieProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryPolarAxis;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryPolarAxisProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryPortal;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryPortalProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryScatter;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryScatterProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictorySelectionContainer;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictorySelectionContainerProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictorySharedEvents;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictorySharedEventsProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryStack;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryStackProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryTheme;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryThemeDefinition;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryTooltip;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryTooltipProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryTransition;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryVoronoi;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryVoronoiContainer;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryVoronoiContainerProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryVoronoiProps;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryZoomContainer;
    // @ts-expect-error This will fail if the component is typed as 'any':
    shouldNotBeTypedAsAny = VictoryZoomContainerProps;
  });
  it("ensure everything is exported correctly", () => {
    expect(Object.keys(Victory).sort()).toMatchInlineSnapshot(`
      Array [
        "Arc",
        "Area",
        "Axis",
        "Background",
        "Bar",
        "Border",
        "Box",
        "BrushHelpers",
        "Candle",
        "CanvasBar",
        "CanvasCurve",
        "CanvasGroup",
        "CanvasPoint",
        "Circle",
        "ClipPath",
        "Collection",
        "CursorHelpers",
        "Curve",
        "CurvedLabel",
        "Data",
        "DefaultTransitions",
        "Domain",
        "ErrorBar",
        "Events",
        "Flyout",
        "Helpers",
        "Hooks",
        "Immutable",
        "LabelHelpers",
        "Line",
        "LineHelpers",
        "LineSegment",
        "Log",
        "Path",
        "Point",
        "PointPathHelpers",
        "Portal",
        "PortalContext",
        "RawZoomHelpers",
        "Rect",
        "Scale",
        "Selection",
        "SelectionHelpers",
        "Slice",
        "Style",
        "TSpan",
        "Text",
        "TextPath",
        "TextSize",
        "Timer",
        "TimerContext",
        "Transitions",
        "UserProps",
        "VictoryAccessibleGroup",
        "VictoryAnimation",
        "VictoryArea",
        "VictoryAxis",
        "VictoryBar",
        "VictoryBoxPlot",
        "VictoryBrushContainer",
        "VictoryBrushLine",
        "VictoryCandlestick",
        "VictoryChart",
        "VictoryClipContainer",
        "VictoryContainer",
        "VictoryCursorContainer",
        "VictoryErrorBar",
        "VictoryGroup",
        "VictoryHistogram",
        "VictoryLabel",
        "VictoryLegend",
        "VictoryLine",
        "VictoryPie",
        "VictoryPolarAxis",
        "VictoryPortal",
        "VictoryScatter",
        "VictorySelectionContainer",
        "VictorySharedEvents",
        "VictoryStack",
        "VictoryTheme",
        "VictoryTooltip",
        "VictoryTransition",
        "VictoryVoronoi",
        "VictoryVoronoiContainer",
        "VictoryZoomContainer",
        "Voronoi",
        "VoronoiHelpers",
        "Whisker",
        "Wrapper",
        "ZoomHelpers",
        "addEvents",
        "brushContainerMixin",
        "combineContainerMixins",
        "createContainer",
        "cursorContainerMixin",
        "getBarPath",
        "getBarPosition",
        "getBarWidth",
        "getCornerRadius",
        "getCustomBarPath",
        "getHorizontalBarPath",
        "getPolarBarPath",
        "getStyle",
        "getVerticalBarPath",
        "getVerticalPolarBarPath",
        "makeCreateContainerFunction",
        "selectionContainerMixin",
        "useCanvasContext",
        "voronoiContainerMixin",
        "zoomContainerMixin",
      ]
    `);
  });
});
