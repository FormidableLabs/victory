import React from "react";
import { VicLine } from "./vic-line";

/* eslint-disable no-magic-numbers,react/no-multi-comp */

export default {
  title: "v37/Core/Examples/VicLine",
};

const genData = <T,>(factory: (index: number) => T, count = 10) =>
  new Array(count).fill(null).map((_, i) => factory(i));

export const Simple = () => <VicLine />;
export const LotsaData = () => (
  <VicLine data={genData((i) => ({ x: i, y: i * 2 }), 100)} />
);
