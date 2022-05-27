import * as React from "react";
import { OriginType } from "../victory-label/victory-label";
import { VictoryThemeDefinition } from "../victory-theme/victory-theme";
import { D3Scale } from "../index";

export interface VictoryContainerProps {
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
  containerId?: number | string;
  containerRef?: React.Ref<HTMLElement>;
  desc?: string;
  events?: React.DOMAttributes<any>;
  height?: number;
  name?: string;
  origin?: OriginType;
  ouiaId?: number | string;
  ouiaSafe?: boolean;
  ouiaType?: string;
  polar?: boolean;
  portalComponent?: React.ReactElement;
  portalZIndex?: number;
  preserveAspectRatio?: string;
  responsive?: boolean;
  role?: string;
  scale?: {
    x?: D3Scale;
    y?: D3Scale;
  };
  style?: React.CSSProperties;
  tabIndex?: number;
  theme?: VictoryThemeDefinition;
  title?: string;
  width?: number;
}

export class VictoryContainer extends React.Component<
  VictoryContainerProps,
  any
> {}
