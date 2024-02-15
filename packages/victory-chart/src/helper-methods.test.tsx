import React from "react";
import { VictoryAxis } from "victory-axis";

import { getChildComponents } from "./helper-methods";

const MockVictoryLine = () => <div data-testid="victory-line" />;

describe("victory-chart/helpers-methods", () => {
  describe("getChildComponents", () => {
    const defaultAxes = {
      independent: <VictoryAxis />,
      dependent: <VictoryAxis dependentAxis />,
    };

    it("returns a pair of default axes when no children are given", () => {
      const children = [];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).toHaveLength(2);
      expect(result).toEqual([defaultAxes.independent, defaultAxes.dependent]);
    });

    it("adds default axes when none of the children are axis components", () => {
      const line = <MockVictoryLine />;
      const children = [line];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).toHaveLength(3);
      expect(result).toContain(defaultAxes.independent);
      expect(result).toContain(defaultAxes.dependent);
    });

    it("does not add default axes if axis any axis components exist in children", () => {
      const axis = <VictoryAxis />;
      const children = [axis];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).toHaveLength(1);
      expect((result[0] as typeof axis).props).toEqual(axis.props);
    });
  });
});
