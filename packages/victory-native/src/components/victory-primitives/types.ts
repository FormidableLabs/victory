import { VictoryPrimitiveShapeProps } from "victory-core/es";

export interface VictoryNativePrimitiveShapeProps
  extends Pick<
    VictoryPrimitiveShapeProps,
    "className" | "events" | "role" | "shapeRendering" | "desc" | "style"
  > {
  "aria-label"?: string;
}
