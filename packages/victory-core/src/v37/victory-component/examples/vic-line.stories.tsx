import React from "react";
import { VicLine } from "./vic-line";
import { VicChart } from "./vic-chart";

/* eslint-disable no-magic-numbers,react/no-multi-comp */

export default {
  title: "v37/Core/Examples/VicLine",
};

const genData = <T,>(factory: (index: number) => T, count = 4) =>
  new Array(count).fill(null).map((_, i) => factory(i));
const linear = (x) => ({ x, y: x });
const power = (x) => ({ x, y: x * x });

export const Simple = () => <VicLine />;
export const LotsaData = () => <VicLine data={genData(power, 100)} />;

export const WithChart = () => (
  <VicChart>
    <VicLine />
  </VicChart>
);
export const Multiple = () => (
  <VicChart>
    <VicLine data={genData(linear)} />
    <VicLine data={genData(power)} />
  </VicChart>
);
