import React from "react";
import {
  Helpers,
  VictoryLabel,
  addEvents,
  VictoryContainer,
  VictoryTheme,
  DefaultTransitions,
  Data,
  Domain,
  UserProps,
  EventPropTypeInterface,
  EventsMixinClass,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface,
} from "victory-core";
import { Voronoi } from "./voronoi";
import { getBaseProps } from "./helper-methods";

export type VictoryVoronoiSortOrderType = "ascending" | "descending";

export interface VictoryVoronoiProps
  extends Omit<VictoryCommonProps, "polar">,
    VictoryDatableProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  events?: EventPropTypeInterface<
    string,
    string | number | (string | number)[]
  >[];
  type?: number;
  sortOrder?: VictoryVoronoiSortOrderType;
  size?: number | { (data: any): number };
  style?: VictoryStyleInterface;
}

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface VictoryVoronoiBase extends EventsMixinClass<VictoryVoronoiProps> {}

class VictoryVoronoiBase extends React.Component<VictoryVoronoiProps> {
  static animationWhitelist: (keyof VictoryVoronoiProps)[] = [
    "data",
    "domain",
    "height",
    "padding",
    "samples",
    "size",
    "style",
    "width",
  ];

  static displayName = "VictoryVoronoi";
  static role = "voronoi";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static defaultProps: VictoryVoronoiProps = {
    containerComponent: <VictoryContainer />,
    dataComponent: <Voronoi />,
    labelComponent: <VictoryLabel />,
    groupComponent: <g role="presentation" />,
    samples: 50,
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale,
  };

  static getDomain = Domain.getDomain;
  static getData = Data.getData;
  static getBaseProps(props: VictoryVoronoiProps) {
    return getBaseProps(props, fallbackProps);
  }
  static expectedComponents: (keyof VictoryVoronoiProps)[] = [
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
    const { animationWhitelist, role } = VictoryVoronoi;
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

export const VictoryVoronoi = addEvents(VictoryVoronoiBase);
