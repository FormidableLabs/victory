import { getChildComponents } from "victory-chart/lib/helper-methods";
import React from "react";
import { VictoryAxis } from "victory-axis";
import { VictoryLine } from "victory-line";

describe("victory-chart/helpers-methods", () => {
  const getVictoryLine = (props) => React.createElement(VictoryLine, props);
  const getVictoryAxis = (props) => React.createElement(VictoryAxis, props);

  describe("getChildComponents", () => {
    const defaultAxes = {
      independent: getVictoryAxis({}),
      dependent: getVictoryAxis({ dependentAxis: true })
    };

    it("returns a pair of default axes when no children are given", () => {
      const children = [];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).toHaveLength(2);
      expect(result).toEqual([defaultAxes.independent, defaultAxes.dependent]);
    });

    it("adds default axes when none of the children are axis components", () => {
      const line = getVictoryLine({});
      const children = [line];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).toHaveLength(3);
      expect(result).toContain(defaultAxes.independent);
      expect(result).toContain(defaultAxes.dependent);
    });

    it("does not add default axes if axis any axis components exist in children", () => {
      const axis = getVictoryAxis({});
      const children = [axis];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).toHaveLength(1);
      expect(result[0].props).toEqual(axis.props);
    });
  });
});
