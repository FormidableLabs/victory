import React from "react";
import { Line } from "./line";
import { Rect } from "./rect";
import { G } from "react-native-svg";
import { Candle as CandleBase, CandleProps } from "victory-candlestick/es";

export const Candle = (props: CandleProps) => (
  <CandleBase
    lineComponent={<Line />}
    rectComponent={<Rect />}
    groupComponent={<G />}
    {...props}
  />
);
