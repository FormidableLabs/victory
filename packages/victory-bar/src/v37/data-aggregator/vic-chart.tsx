import React from "react";
import { mapChildren } from "./helpers";
import { VicDataAggregator } from "./vic-data-aggregator";
export type VicChartProps = {
  children: React.ReactNode;
};
export const VicChart = (props: VicChartProps) => {
  return <VicDataAggregator>{props.children}</VicDataAggregator>;
};
