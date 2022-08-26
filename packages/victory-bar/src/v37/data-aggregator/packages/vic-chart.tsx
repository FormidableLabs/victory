import React from "react";
import { VicDataAggregator } from "../core/vic-data-aggregator";
export type VicChartProps = {
  children: React.ReactNode;
};
export const VicChart = (props: VicChartProps) => {
  return <VicDataAggregator>{props.children}</VicDataAggregator>;
};
