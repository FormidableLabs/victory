import * as VictoryCore from "./index";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/named */ // We don't need eslint to validate imports; TypeScript handles that for us.

// Import EVERYTHING from 'victory-core' to ensure it's getting exported correctly:
import {
  // @ts-expect-error TEST_EXPORTS should not be defined, so it should error!
  TEST_EXPORTS,
  AnimatePropTypeInterface,
  AnimationData,
  AnimationEasing,
  AnimationInfo,
  AnimationStyle,
  Arc,
  ArcProps,
  Axis,
  Background,
  BackgroundProps,
  BlockProps,
  Border,
  BorderProps,
  Box,
  CallbackArgs,
  CategoryPropType,
  Circle,
  ClipPath,
  ClipPathProps,
  Collection,
  ColorScalePropType,
  CoordinatesPropType,
  D3Scale,
  Data,
  DataGetterPropType,
  DefaultTransitions,
  Domain,
  DomainPaddingPropType,
  DomainPropType,
  DomainTuple,
  EventCallbackInterface,
  EventPropTypeInterface,
  Events,
  Helpers,
  Hooks,
  Immutable,
  InterpolationPropType,
  LabelHelpers,
  LabelOrientationType,
  LabelProps,
  Line,
  LineHelpers,
  LineSegment,
  LineSegmentProps,
  Log,
  NumberOrCallback,
  OrientationOrCallback,
  OrientationTypes,
  OriginType,
  PaddingOrCallback,
  PaddingProps,
  PaddingType,
  Path,
  Point,
  PointPathHelpers,
  PointProps,
  Portal,
  PortalContext,
  PortalContextValue,
  PortalOutlet,
  PortalOutletProps,
  PortalProvider,
  PortalProviderProps,
  PortalProps,
  RangePropType,
  RangeTuple,
  Rect,
  SVGCoordinateBounds,
  SVGCoordinateType,
  Scale,
  ScaleName,
  ScalePropType,
  ScaleXYPropType,
  ScatterSymbolType,
  Selection,
  SliceNumberOrCallback,
  SortOrderPropType,
  StringOrCallback,
  StringOrNumberOrCallback,
  StringOrNumberOrList,
  Style,
  TSpan,
  Text,
  TextAnchorType,
  TextProps,
  TextSize,
  TextSizeStyleInterface,
  TickProps,
  Timer,
  TimerContext,
  Transitions,
  UserProps,
  VerticalAnchorType,
  VictoryAccessibleGroup,
  VictoryAccessibleGroupProps,
  VictoryAnimation,
  VictoryAnimationProps,
  VictoryAnimationState,
  VictoryAxisCommonProps,
  VictoryClipContainer,
  VictoryClipContainerProps,
  VictoryCommonPrimitiveProps,
  VictoryCommonProps,
  VictoryCommonThemeProps,
  VictoryContainer,
  useVictoryContainer,
  VictoryContainerProps,
  VictoryDatableProps,
  VictoryLabel,
  VictoryLabelProps,
  VictoryLabelStyleObject,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryNumberCallback,
  VictoryOrientationCallback,
  VictoryPaddingCallback,
  VictoryPortal,
  VictoryPortalProps,
  VictoryPrimitiveShapeProps,
  VictorySingleLabelableProps,
  VictoryStringCallback,
  VictoryStringOrNumberCallback,
  VictoryStyleInterface,
  VictoryStyleObject,
  VictoryTheme,
  VictoryThemeDefinition,
  VictoryTickStyleObject,
  VictoryTransition,
  Whisker,
  WhiskerAxes,
  WhiskerProps,
  Wrapper,
  addEvents,
  mergeRefs,
  usePortalContext,
} from "./index";
import { pick } from "lodash";

describe("victory-core", () => {
  it("exports addEvents", () => {
    // This test exists to ensure we don't have an "unused import" error
    expect(addEvents).toBeInstanceOf(Function);
  });
  it("should export everything", () => {
    expect(Object.keys(VictoryCore).sort()).toMatchInlineSnapshot(`
      [
        "Arc",
        "Axis",
        "Background",
        "Border",
        "Box",
        "Circle",
        "ClipPath",
        "Collection",
        "Data",
        "DefaultTransitions",
        "Domain",
        "Events",
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
        "PortalOutlet",
        "PortalProvider",
        "Rect",
        "Scale",
        "Selection",
        "Style",
        "TSpan",
        "Text",
        "TextSize",
        "Timer",
        "TimerContext",
        "Transitions",
        "UserProps",
        "VictoryAccessibleGroup",
        "VictoryAnimation",
        "VictoryClipContainer",
        "VictoryContainer",
        "VictoryLabel",
        "VictoryPortal",
        "VictoryTheme",
        "VictoryTransition",
        "Whisker",
        "Wrapper",
        "addEvents",
        "mergeRefs",
        "usePortalContext",
        "useVictoryContainer",
      ]
    `);
  });

  describe("namespaces", () => {
    // These "namespaces" represent when we use `export * as`
    const namespaces = [
      "Axis",
      "Collection",
      "Data",
      "DefaultTransitions",
      "Domain",
      "Events",
      "Helpers",
      "Hooks",
      "Immutable",
      "LabelHelpers",
      "LineHelpers",
      "Log",
      "PointPathHelpers",
      "Scale",
      "Selection",
      "Style",
      "TextSize",
      "Transitions",
      "UserProps",
      "Wrapper",
    ];

    it("should export all namespaces", () => {
      expect(pick(VictoryCore, namespaces)).toMatchInlineSnapshot(`
        {
          "Axis": {
            "findAxisComponents": [Function],
            "getAxis": [Function],
            "getAxisComponent": [Function],
            "getAxisComponentsWithParent": [Function],
            "getAxisValue": [Function],
            "getDomain": [Function],
            "getOrigin": [Function],
            "getOriginSign": [Function],
            "getTickFormat": [Function],
            "getTicks": [Function],
            "isVertical": [Function],
            "modifyProps": [Function],
            "stringTicks": [Function],
          },
          "Collection": {
            "containsDates": [Function],
            "containsNumbers": [Function],
            "containsOnlyStrings": [Function],
            "containsStrings": [Function],
            "difference": [Function],
            "getMaxValue": [Function],
            "getMinValue": [Function],
            "isArrayOfArrays": [Function],
            "removeUndefined": [Function],
          },
          "Data": {
            "createStringMap": [Function],
            "downsample": [Function],
            "formatData": [Function],
            "formatDataFromDomain": [Function],
            "generateData": [Function],
            "getCategories": [Function],
            "getData": [Function],
            "getStringsFromAxes": [Function],
            "getStringsFromCategories": [Function],
            "getStringsFromData": [Function],
            "isDataComponent": [Function],
          },
          "DefaultTransitions": {
            "continuousPolarTransitions": [Function],
            "continuousTransitions": [Function],
            "discreteTransitions": [Function],
          },
          "Domain": {
            "createDomainFunction": [Function],
            "formatDomain": [Function],
            "getDomain": [Function],
            "getDomainFromCategories": [Function],
            "getDomainFromData": [Function],
            "getDomainFromMinMax": [Function],
            "getDomainFromProps": [Function],
            "getDomainWithZero": [Function],
            "getMaxFromProps": [Function],
            "getMinFromProps": [Function],
            "getSymmetricDomain": [Function],
            "isDomainComponent": [Function],
          },
          "Events": {
            "emulateReactEvent": [Function],
            "getComponentEvents": [Function],
            "getEventState": [Function],
            "getEvents": [Function],
            "getExternalMutation": [Function],
            "getExternalMutations": [Function],
            "getExternalMutationsWithChildren": [Function],
            "getGlobalEventNameFromKey": [Function],
            "getGlobalEvents": [Function],
            "getPartialEvents": [Function],
            "getScopedEvents": [Function],
            "omitGlobalEvents": [Function],
          },
          "Helpers": {
            "createAccessor": [Function],
            "degreesToRadians": [Function],
            "evaluateProp": [Function],
            "evaluateStyle": [Function],
            "getCurrentAxis": [Function],
            "getDefaultStyles": [Function],
            "getPadding": [Function],
            "getPoint": [Function],
            "getPolarOrigin": [Function],
            "getRadius": [Function],
            "getRange": [Function],
            "getStyles": [Function],
            "invert": [Function],
            "isFunction": [Function],
            "isHorizontal": [Function],
            "isNil": [Function],
            "isTooltip": [Function],
            "mapValues": [Function],
            "modifyProps": [Function],
            "omit": [Function],
            "radiansToDegrees": [Function],
            "range": [Function],
            "reduceChildren": [Function],
            "scalePoint": [Function],
          },
          "Hooks": {
            "useAnimationState": [Function],
            "usePreviousProps": [Function],
          },
          "Immutable": {
            "IMMUTABLE_ITERABLE": "@@__IMMUTABLE_ITERABLE__@@",
            "IMMUTABLE_LIST": "@@__IMMUTABLE_LIST__@@",
            "IMMUTABLE_MAP": "@@__IMMUTABLE_MAP__@@",
            "IMMUTABLE_RECORD": "@@__IMMUTABLE_RECORD__@@",
            "isImmutable": [Function],
            "isIterable": [Function],
            "isList": [Function],
            "isMap": [Function],
            "isRecord": [Function],
            "shallowToJS": [Function],
          },
          "LabelHelpers": {
            "getDegrees": [Function],
            "getPolarAngle": [Function],
            "getPolarTextAnchor": [Function],
            "getPolarVerticalAnchor": [Function],
            "getProps": [Function],
            "getText": [Function],
          },
          "LineHelpers": {
            "getInterpolationFunction": [Function],
            "getLineFunction": [Function],
          },
          "Log": {
            "warn": [Function],
          },
          "PointPathHelpers": {
            "circle": [Function],
            "cross": [Function],
            "diamond": [Function],
            "minus": [Function],
            "plus": [Function],
            "square": [Function],
            "star": [Function],
            "triangleDown": [Function],
            "triangleUp": [Function],
          },
          "Scale": {
            "getBaseScale": [Function],
            "getDefaultScale": [Function],
            "getScaleFromName": [Function],
            "getScaleFromProps": [Function],
            "getScaleType": [Function],
            "getType": [Function],
            "validScale": [Function],
          },
          "Selection": {
            "getBounds": [Function],
            "getDataCoordinates": [Function],
            "getDomainCoordinates": [Function],
            "getParentSVG": [Function],
            "getSVGEventCoordinates": [Function],
          },
          "Style": {
            "getColorScale": [Function],
            "toTransformString": [Function],
          },
          "TextSize": {
            "_approximateTextSizeInternal": {
              "impl": [Function],
            },
            "approximateTextSize": [Function],
            "convertLengthToPixels": [Function],
          },
          "Transitions": {
            "getInitialTransitionState": [Function],
            "getTransitionPropsFactory": [Function],
          },
          "UserProps": {
            "assert": [Function],
            "getSafeUserProps": [Function],
            "withSafeUserProps": [Function],
          },
          "Wrapper": {
            "addBinsToParentPropsIfHistogram": [Function],
            "getAllEvents": [Function],
            "getCategories": [Function],
            "getCategoryAndAxisStringsFromChildren": [Function],
            "getChildStyle": [Function],
            "getColor": [Function],
            "getData": [Function],
            "getDataFromChildren": [Function],
            "getDefaultDomainPadding": [Function],
            "getDomain": [Function],
            "getDomainFromChildren": [Function],
            "getScale": [Function],
            "getStringsFromChildren": [Function],
            "getStringsFromChildrenCategories": [Function],
            "getStringsFromData": [Function],
            "getStyle": [Function],
            "getWidth": [Function],
          },
        }
      `);
    });
  });
});
