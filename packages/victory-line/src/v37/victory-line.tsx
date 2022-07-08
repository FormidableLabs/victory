import PropTypes from "prop-types";
import React from "react";
import { Curve, CurveProps } from "../curve";
import {
  InterpolationPropType,
  useData,
  useDomain,
  useScale,
  VictoryClipContainer,
  VictoryClipContainerProps,
  VictoryCommonProps,
  VictoryContainer,
  VictoryDatableProps,
  VictoryLabel,
  VictoryLabelableProps,
  VictoryLabelProps,
  VictoryStyleInterface,
  VictoryTheme,
  withContainer,
} from "victory-core";

export interface VictoryLineProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryLabelableProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  interpolation?: InterpolationPropType | Function;
  samples?: number;
  style?: VictoryStyleInterface;
  animate?: boolean;
}

const Clone = <TProps,>(
  props: React.PropsWithChildren<
    {
      element: React.ReactElement<TProps>;
      children?: React.ReactNode | React.ReactNode[];
    } & TProps
  >,
) => {
  const { children, element, ...rest } = props;
  return React.cloneElement(element, rest as unknown as TProps, children);
};

export const VictoryLineBase = (props: VictoryLineProps) => {
  const data = useData();
  const scale = useScale();
  const domain = useDomain();
  const dataProps = { ...props, data, scale, domain };

  return (
    <Clone element={props.groupComponent}>
      <Clone element={props.dataComponent} {...dataProps} />
    </Clone>
  );
};

const defaultProps: Pick<
  VictoryLineProps,
  | "data"
  | "containerComponent"
  | "dataComponent"
  | "labelComponent"
  | "groupComponent"
  | "samples"
  | "sortKey"
  | "sortOrder"
  | "standalone"
  | "theme"
> = {
  data: [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
  ],
  containerComponent: <VictoryContainer />,
  dataComponent: (<Curve />) as React.ReactElement<CurveProps>,
  labelComponent: (
    <VictoryLabel renderInPortal />
  ) as React.ReactElement<VictoryLabelProps>,
  groupComponent: (
    <VictoryClipContainer />
  ) as React.ReactElement<VictoryClipContainerProps>,
  samples: 50,
  sortKey: "x",
  sortOrder: "ascending",
  standalone: true,
  theme: VictoryTheme.grayscale,
};

VictoryLineBase.defaultProps = defaultProps;

VictoryLineBase.propTypes = {
  interpolation: PropTypes.oneOfType([
    PropTypes.oneOf([
      "basis",
      "bundle",
      "cardinal",
      "catmullRom",
      "linear",
      "monotoneX",
      "monotoneY",
      "natural",
      "step",
      "stepAfter",
      "stepBefore",
    ] as const),
    PropTypes.func,
  ]),
};

export const VictoryLine = withContainer(VictoryLineBase);
