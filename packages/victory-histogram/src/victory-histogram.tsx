import React from "react";
import { Bar } from "victory-bar";
import {
  Helpers,
  VictoryLabel,
  VictoryContainer,
  VictoryTheme,
  addEvents,
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
import {
  getBaseProps,
  getData,
  getDomain,
  getFormattedData,
} from "./helper-methods";

export type VictoryHistogramTargetType = "data" | "labels" | "parent";

export interface VictoryHistogramProps
  extends Omit<VictoryCommonProps, "polar">,
    Omit<VictoryDatableProps, "y" | "y0">,
    VictoryMultiLabelableProps {
  binSpacing?: number;
  bins?: number | number[] | Date[];
  cornerRadius?:
    | NumberOrCallback
    | {
        top?: NumberOrCallback;
        topLeft?: NumberOrCallback;
        topRight?: NumberOrCallback;
        bottom?: NumberOrCallback;
        bottomLeft?: NumberOrCallback;
        bottomRight?: NumberOrCallback;
      };
  events?: EventPropTypeInterface<
    VictoryHistogramTargetType,
    number | string | number[] | string[]
  >[];
  eventKey?: StringOrNumberOrCallback;
  horizontal?: boolean;
  style?: VictoryStyleInterface;
}

const fallbackProps: Partial<VictoryHistogramProps> = {
  width: 450,
  height: 300,
  padding: 50,
};

const defaultData = [];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VictoryHistogramBase
  extends EventsMixinClass<VictoryHistogramProps> {}

/**
 * Draw SVG histogram charts with React. VictoryHistogram is a composable component, so it doesn't include axes
 * Check out VictoryChart for complete histogram charts and more.
 */
class VictoryHistogramBase extends React.Component<VictoryHistogramProps> {
  static animationWhitelist = [
    "data",
    "domain",
    "height",
    "padding",
    "style",
    "width",
  ];

  static displayName = "VictoryHistogram";

  static role = "histogram";

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

  static getFormattedData(...args: any) {
    return getFormattedData(...args);
  }

  static defaultProps: VictoryHistogramProps = {
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

  static getDomain(props, axis) {
    return getDomain(props, axis);
  }
  static getData(props) {
    return getData(props);
  }
  static getBaseProps(props: VictoryHistogramProps) {
    return getBaseProps(props, fallbackProps);
  }
  static expectedComponents: Partial<keyof VictoryHistogramProps>[] = [
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
    const { animationWhitelist, role } = VictoryHistogramBase;
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

export const VictoryHistogram = addEvents(VictoryHistogramBase);
