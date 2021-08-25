import * as Collection from "./victory-util/collection";
import * as Data from "./victory-util/data";
import * as DefaultTransitions from "./victory-util/default-transitions";
import * as Domain from "./victory-util/domain";
import * as Events from "./victory-util/events";
import * as Helpers from "./victory-util/helpers";
import * as Immutable from "./victory-util/immutable";
import * as LabelHelpers from "./victory-util/label-helpers";
import * as Log from "./victory-util/log";
import * as PropTypes from "./victory-util/prop-types";
import * as Scale from "./victory-util/scale";
import * as Selection from "./victory-util/selection";
import * as Style from "./victory-util/style";
import * as TextSize from "./victory-util/textsize";
import * as Transitions from "./victory-util/transitions";
import * as CommonProps from "./victory-util/common-props";
import * as Wrapper from "./victory-util/wrapper";
import * as Axis from "./victory-util/axis";
import * as CustomHooks from "./victory-util/hooks";
// This rule doesn't play well with namespaced exports
/* eslint-disable import/export */
export { default as VictoryAccessibleGroup } from "./victory-accessible-group/victory-accessible-group";
export { default as VictoryAnimation } from "./victory-animation/victory-animation";
export { default as VictoryContainer } from "./victory-container/victory-container";
export { default as VictoryLabel } from "./victory-label/victory-label";
export { default as VictoryTransition } from "./victory-transition/victory-transition";
export { default as VictoryClipContainer } from "./victory-clip-container/victory-clip-container";
export { default as VictoryTheme } from "./victory-theme/victory-theme";
export { default as VictoryPortal } from "./victory-portal/victory-portal";
export { default as Portal } from "./victory-portal/portal";
export { default as Arc } from "./victory-primitives/arc";
export { default as Background } from "./victory-primitives/background";
export { default as Border, default as Box } from "./victory-primitives/border";
export { default as Circle } from "./victory-primitives/circle";
export { default as ClipPath } from "./victory-primitives/clip-path";
export { default as Line } from "./victory-primitives/line";
export { default as LineSegment } from "./victory-primitives/line-segment";
export { default as Path } from "./victory-primitives/path";
export { default as Point } from "./victory-primitives/point";
export { default as Rect } from "./victory-primitives/rect";
export { default as Text } from "./victory-primitives/text";
export { default as TSpan } from "./victory-primitives/tspan";
export { default as Whisker } from "./victory-primitives/whisker";
export { default as addEvents } from "./victory-util/add-events";
export { default as Timer } from "./victory-util/timer";
export { default as TimerContext } from "./victory-util/timer-context";
export { default as PortalContext } from "./victory-portal/portal-context";

export {
  Collection,
  Data,
  DefaultTransitions,
  Domain,
  Events,
  Helpers,
  Immutable,
  LabelHelpers,
  Log,
  PropTypes,
  Scale,
  Selection,
  Style,
  TextSize,
  Transitions,
  CommonProps,
  Wrapper,
  Axis,
  CustomHooks
};
