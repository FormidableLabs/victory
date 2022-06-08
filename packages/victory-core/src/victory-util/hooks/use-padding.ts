import { PaddingProps } from "../../victory-theme/victory-theme-definition";

export interface Padding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const DEFAULT_PADDING = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

export function usePadding(padding: PaddingProps = {}): Padding {
  if (typeof padding === "number") {
    return {
      top: padding,
      bottom: padding,
      left: padding,
      right: padding
    };
  }
  return {
    ...DEFAULT_PADDING,
    ...padding
  };
}
