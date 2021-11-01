import React from "react";
import Line from "./line";
import Rect from "./rect";
import { G } from "react-native-svg";
import { Candle } from "victory-candlestick/es";

const NativeCandle = (props) => (
  <Candle
    lineComponent={<Line />}
    rectComponent={<Rect />}
    groupComponent={<G />}
    {...props}
  />
);

export default NativeCandle;
