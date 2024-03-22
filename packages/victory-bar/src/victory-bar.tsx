import React from "react";
import { getBaseProps } from "./helper-methods";
import { Bar } from "./bar";
import {
  Helpers,
  VictoryLabel,
  VictoryContainer,
  VictoryTheme,
  addEvents,
  Data,
  Domain,
  UserProps,
  EventPropTypeInterface,
  NumberOrCallback,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface,
  EventsMixinClass,
} from "victory-core";

export type VictoryBarCornerRadiusKey =
  | "top"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

export type VictoryBarCornerRadiusObject = Partial<
  Record<VictoryBarCornerRadiusKey, NumberOrCallback>
>;

export type VictoryBarTTargetType = "data" | "labels" | "parent";

export type VictoryBarAlignmentType = "start" | "middle" | "end";

export interface VictoryBarProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabelableProps {
  alignment?: VictoryBarAlignmentType;
  barRatio?: number;
  barWidth?: NumberOrCallback;
  cornerRadius?: NumberOrCallback | VictoryBarCornerRadiusObject;
  events?: EventPropTypeInterface<
    VictoryBarTTargetType,
    number | string | number[] | string[]
  >[];
  eventKey?: StringOrNumberOrCallback;
  getPath?: (props: VictoryBarProps) => string;
  horizontal?: boolean;
  style?: VictoryStyleInterface;
}

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
};

const defaultData = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VictoryBarBase extends EventsMixinClass<VictoryBarProps> {}

/**
 * Draw SVG bar charts with React. VictoryBar is a composable component, so it doesn"t include axes
 * Check out VictoryChart for complete bar charts and more.
 */
class VictoryBarBase extends React.Component<VictoryBarProps> {
  static animationWhitelist: (keyof VictoryBarProps)[] = [
    "data",
    "domain",
    "height",
    "padding",
    "style",
    "width",
  ];

  static displayName = "VictoryBar";

  static role = "bar";

  static defaultTransitions = {
    onLoad: {
      duration: 2000,
      before: () => ({ _y: 0, _y1: 0, _y0: 0 }),
      after: (datum) => ({ _y: datum._y, _y1: datum._y1, _y0: datum._y0 }),
    },
    onExit: {
      duration: 500,
      before: () => ({ _y: 0, yOffset: 0 }),
    },
    onEnter: {
      duration: 500,
      before: () => ({ _y: 0, _y1: 0, _y0: 0 }),
      after: (datum) => ({ _y: datum._y, _y1: datum._y1, _y0: datum._y0 }),
    },
  };

  static defaultProps: VictoryBarProps = {
    containerComponent: <VictoryContainer />,
    data: defaultData,
    dataComponent: <Bar />,
    groupComponent: <g role="presentation" />,
    labelComponent: <VictoryLabel />,
    samples: 50,
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale,
  };

  static getDomain = Domain.getDomainWithZero;
  static getData = Data.getData;
  static getBaseProps(props: VictoryBarProps) {
    return getBaseProps(props, fallbackProps);
  }
  static expectedComponents: (keyof VictoryBarProps)[] = [
    "dataComponent",
    "labelComponent",
    "groupComponent",
    "containerComponent",
  ];

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  render(): React.ReactElement {
    const { animationWhitelist, role } = VictoryBar;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const children = this.renderData(props);

    const component = props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : children;

    return UserProps.withSafeUserProps(component, props);
  }
}

export const VictoryBar = addEvents(VictoryBarBase);
