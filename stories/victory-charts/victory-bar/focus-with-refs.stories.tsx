/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useCallback, useRef } from "react";
import type { Meta } from "../../utils/types";

import {
  Bar,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const FocusWithRefs: Story = {
  args: {},
  render: (props) => {
    const barsRef = useRef(new Map());

    const focusOnBar = (id) => {
      const map = barsRef.current;
      const node = map.get(id);
      node.focus();
    };

    useEffect(() => {
      if (barsRef.current) {
        focusOnBar("Bar 1");
      }
    }, []);

    // Bars are keyed by their `aria-label` (from `ariaLabel` below). Victory
    // no longer writes an `index` attribute to the DOM (38.0.0).
    const setRef = useCallback((node) => {
      const map = barsRef.current;
      if (node) {
        map.set(node.getAttribute("aria-label"), node);
      }
    }, []);

    return (
      <>
        <VictoryChart
          horizontal
          theme={VictoryTheme[props.themeKey]}
          domainPadding={10}
        >
          <VictoryBar
            {...props}
            data={getData(5)}
            labels={({ datum }) => `x: ${datum.x}`}
            labelComponent={<VictoryTooltip active />}
            dataComponent={
              <Bar
                tabIndex={0}
                ariaLabel={({ index }) => `Bar ${index}`}
                ref={setRef}
              />
            }
          />
        </VictoryChart>
      </>
    );
  },
};

export default meta;
