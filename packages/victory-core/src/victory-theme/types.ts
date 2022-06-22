import * as React from "react";
import {
  VictoryCommonThemeProps,
  VictoryDatableProps,
} from "../victory-util/common-props";
import {
  NumberOrCallback,
  OrientationOrCallback,
  PaddingOrCallback,
  StringOrNumberOrCallback,
} from "../types/callbacks";

export type BlockProps = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};
export type PaddingProps = number | BlockProps;
export type OrientationTypes = "top" | "bottom" | "left" | "right";
export type VictoryStyleObject = {
  [K in keyof React.CSSProperties]: StringOrNumberOrCallback;
};
export type LabelProps = React.CSSProperties & {
  angle?: number;
  verticalAnchor?: VerticalAnchorType;
};
export type VictoryLabelStyleObject = {
  [K in keyof LabelProps]: StringOrNumberOrCallback;
};

/**
 * Style interface used in components/themeing
 */
export interface VictoryStyleInterface {
  parent?: VictoryStyleObject;
  data?: VictoryStyleObject;
  labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  border?: VictoryStyleObject;
}

export type TickProps = React.CSSProperties & { size?: number };
export type VictoryTickStyleObject = {
  [K in keyof TickProps]: StringOrNumberOrCallback;
};

export interface VictoryAxisCommonProps {
  axisComponent?: React.ReactElement;
  axisLabelComponent?: React.ReactElement;
  axisValue?: number | string | object | Date;
  dependentAxis?: boolean;
  disableInlineStyles?: boolean;
  gridComponent?: React.ReactElement;
  invertAxis?: boolean;
  style?: {
    parent?: VictoryStyleObject;
    axis?: VictoryStyleObject;
    axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    grid?: VictoryStyleObject;
    ticks?: VictoryTickStyleObject;
    tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  };
  tickComponent?: React.ReactElement;
  tickCount?: number;
  tickLabelComponent?: React.ReactElement;
  tickFormat?:
    | any[]
    | { (tick: any, index: number, ticks: any[]): string | number };
  tickValues?: any[];
}

export type VerticalAnchorType = "start" | "middle" | "end";
// #region Victory Theme
// Note: Many SVG attributes are missed in CSSProperties interface
export interface VictoryThemeDefinition {
  area?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps &
    VictoryDatableProps;
  axis?: {
    style?: {
      axis?: VictoryStyleObject;
      axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      grid?: VictoryStyleObject;
      ticks?: VictoryTickStyleObject;
      tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
    offsetX?: number;
    offsetY?: number;
  } & VictoryCommonThemeProps;
  bar?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps &
    VictoryDatableProps;
  boxplot?: {
    style?: {
      max?: VictoryStyleObject;
      maxLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      median?: VictoryStyleObject;
      medianLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      min?: VictoryStyleObject;
      minLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      q1?: VictoryStyleObject;
      q1Labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      q3?: VictoryStyleObject;
      q3Labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
    boxWidth?: number;
  } & VictoryCommonThemeProps;
  candlestick?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
    candleColors?: {
      positive?: string;
      negative?: string;
    };
  } & VictoryCommonThemeProps;
  chart?: VictoryCommonThemeProps;
  dependentAxis?: {
    style?: {
      axis?: VictoryStyleObject;
      axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      grid?: VictoryStyleObject;
      ticks?: VictoryTickStyleObject;
      tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
    offsetX?: number;
    offsetY?: number;
    orientation?: OrientationTypes;
  } & VictoryCommonThemeProps;
  errorbar?: {
    borderWidth?: number;
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps;
  group?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps;
  histogram?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps;
  independentAxis?: {
    style?: {
      axis?: VictoryStyleObject;
      axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      grid?: VictoryStyleObject;
      ticks?: VictoryTickStyleObject;
      tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
    offsetX?: number;
    offsetY?: number;
    orientation?: OrientationTypes;
  } & VictoryCommonThemeProps;
  legend?: {
    gutter?: number | BlockProps;
    rowGutter?: number | BlockProps;
    orientation?: string;
    titleOrientation?: string;
    style?: {
      data?: VictoryStyleObject & {
        type?: string;
      };
      border?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      title?: VictoryLabelStyleObject;
    };
    itemsPerRow?: number;
    x?: number;
    y?: number;
    centerTitle?: boolean;
    borderPadding?: number | BlockProps;
  } & VictoryCommonThemeProps;
  line?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps &
    VictoryDatableProps;
  pie?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps &
    VictoryDatableProps;
  polarAxis?: {
    style?: {
      axis?: VictoryStyleObject;
      axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      grid?: VictoryStyleObject;
      ticks?: VictoryTickStyleObject;
      tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps;
  polarDependentAxis?: {
    style?: {
      axis?: VictoryStyleObject;
      axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      grid?: VictoryStyleObject;
      ticks?: VictoryTickStyleObject;
      tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps;
  polarIndependentAxis?: {
    style?: {
      axis?: VictoryStyleObject;
      axisLabel?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      grid?: VictoryStyleObject;
      ticks?: VictoryTickStyleObject;
      tickLabels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps;
  scatter?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    };
  } & VictoryCommonThemeProps &
    VictoryDatableProps;
  stack?: VictoryCommonThemeProps;
  tooltip?: {
    style?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
    flyoutStyle?: VictoryStyleObject;
    cornerRadius?: NumberOrCallback;
    pointerLength?: NumberOrCallback;
    flyoutPadding?: PaddingOrCallback;
    flyoutWidth?: NumberOrCallback;
    flyoutHeight?: NumberOrCallback;
    orientation?: OrientationOrCallback;
    pointerOrientation?: OrientationOrCallback;
  };
  voronoi?: {
    style?: {
      data?: VictoryStyleObject;
      labels?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
      flyout?: VictoryStyleObject;
    };
  } & VictoryCommonThemeProps &
    VictoryDatableProps;
}
