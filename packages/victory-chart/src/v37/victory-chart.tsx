import * as React from "react";
import {
  CategoryPropType,
  DomainPropType,
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryStyleInterface,
  VictoryStyleObject,
} from "victory-core";
import {
  withContainer,
  useDomain,
  useScale,
  useData,
} from "victory-core/es/v37";
import { AxesType } from "..";
import { VictoryAxis, VictoryAxisProps } from "victory-axis";

interface VictoryChartProps extends VictoryCommonProps {
  backgroundComponent?: React.ReactElement;
  categories?: CategoryPropType;
  children?: React.ReactNode | React.ReactNode[];
  desc?: string;
  defaultAxes?: AxesType;
  defaultPolarAxes?: AxesType;
  domain?: DomainPropType;
  endAngle?: number;
  eventKey?: StringOrNumberOrCallback;
  events?: EventPropTypeInterface<
    string,
    string[] | number[] | string | number
  >[];
  innerRadius?: number;
  prependDefaultAxes?: boolean;
  startAngle?: number;
  style?: Pick<VictoryStyleInterface, "parent"> & {
    background?: VictoryStyleObject;
  };
  title?: string;
}

const DEFAULT_AXES = {
  independent: <VictoryAxis />,
  dependent: <VictoryAxis dependentAxis />,
};

// TODO: This does not accept data
const VictoryChart = ({
  defaultAxes = DEFAULT_AXES,
  groupComponent = <g />,
  children,
}: VictoryChartProps) => {
  const scale = useScale();
  const data = useData();
  const domain = useDomain();

  const axes = React.useMemo(() => {
    const { dependent, independent } = {
      ...defaultAxes,
      ...DEFAULT_AXES,
    };
    const axisProps: VictoryAxisProps = {
      data,
      domain,
      // @ts-expect-error we need to fix this scale type
      scale,
      standalone: false,
    };
    return [
      React.cloneElement(dependent, { ...axisProps, key: "dependent-axis" }),
      React.cloneElement(independent, {
        ...axisProps,
        key: "independent-axis",
      }),
    ];
  }, [defaultAxes, domain, scale, data]);

  const childComponents = React.Children.map(children, (child, index) => {
    // @ts-expect-error Why is this throwing a type error?
    return React.cloneElement(child, {
      key: `child-${index}`,
      index,
      standalone: false,
    });
  });

  return React.cloneElement(groupComponent, {}, axes, childComponents);
};

export default withContainer(VictoryChart);
