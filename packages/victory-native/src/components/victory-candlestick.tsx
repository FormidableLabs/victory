import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import { VictoryLabel } from "./victory-label";
import { VictoryContainer } from "./victory-container";
import { Candle } from "./victory-primitives/candle";
import {
  VictoryCandlestick as VictoryCandlestickBase,
  VictoryCandlestickProps,
} from "victory-candlestick/es";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

export const VictoryCandlestick = wrapCoreComponent<VictoryCandlestickProps>({
  Component: VictoryCandlestickBase,
  defaultProps: {
    ...VictoryCandlestickBase.defaultProps,
    dataComponent: <Candle />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width,
  },
});
