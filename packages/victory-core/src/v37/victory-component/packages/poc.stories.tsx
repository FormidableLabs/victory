import React, { useMemo, useState } from "react";
import {
  VicDataAggregator,
  useAggregateData,
} from "../core/vic-data-aggregator";
import { VicLine, VicLineProps } from "./vic-line";
import { VicGroup } from "./vic-group";
import { DataSelector } from "../utils/data-selector";

export default {
  title: "v37/VicDataAggregator",
  component: VicDataAggregator,
};

/* eslint-disable react/no-multi-comp */

// eslint-disable-next-line no-magic-numbers
function fromEquation(eq: (x: number) => number, count = 10) {
  return new Array(count).fill(null).map((_, i) => eq(i));
}

const data1 = fromEquation((x) => x);
const data2 = fromEquation((x) => x * x);
const data3 = fromEquation((x) => Math.log2(x + 1));

export const Example = () => {
  const [polar, setPolar] = useState(false);
  return (
    <VicDataAggregator>
      <VicLine data={data1} />
      <VicLine data={data2} polar={polar} />
      <VicGroup>
        <VicLine data={data3} />
      </VicGroup>
      <DebugDisplay />
    </VicDataAggregator>
  );
};

function selectHasPolar(aggregator: DataSelector) {
  return aggregator.propsAs<{ polar: boolean }>().some((p) => p.polar);
}

function DebugDisplay() {
  const aggData = useAggregateData();
  const hasPolar = aggData.select(selectHasPolar);

  return <pre>{JSON.stringify(aggData.dump(), null, 2)}</pre>;
}
