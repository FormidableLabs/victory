import React from "react";
import { Dimensions } from "react-native";
import { G } from "react-native-svg";
import VictoryLabel from "./victory-label";
import VictoryContainer from "./victory-container";
import Candle from "./victory-primitives/candle";
import { VictoryCandlestick } from "victory-candlestick/es";
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const NativeVictoryCandlestick = wrapCoreComponent({
  Component: VictoryCandlestick,
  defaultProps: Object.assign({}, VictoryCandlestick.defaultProps, {
    dataComponent: <Candle />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <G />,
    width: Dimensions.get("window").width
  })
});

export default NativeVictoryCandlestick;
