import React from "react";
import { VictoryAxis } from "victory-axis";
import { Wrapper } from "victory-core";
import { VictoryLine } from "victory-line";

describe("helpers/wrapper", () => {
  describe("getDomain", () => {
    const victoryLine = <VictoryLine domain={[0, 3]} />;
    const xAxis = <VictoryAxis dependentAxis={false} />;
    const yAxis = <VictoryAxis dependentAxis />;
    const childComponents = [victoryLine, xAxis, yAxis];

    it("calculates a domain from props", () => {
      const props = { domain: { x: [1, 2], y: [2, 3] } };
      const domainResultX = Wrapper.getDomain(props, "x", childComponents);
      expect(domainResultX).toEqual([1, 2]);
    });

    it("calculates a domain from child components", () => {
      const props = { children: childComponents };
      const domainResultX = Wrapper.getDomain(props, "x", childComponents);
      expect(domainResultX).toEqual(victoryLine.props.domain);
    });
  });

  describe("getStringsFromData", () => {
    it("returns an array of strings from a data prop", () => {
      const props = {
        data: [
          { x: "one", y: 1 },
          { x: "red", y: 2 },
          { x: "cat", y: 3 },
        ],
      };
      const childComponents = [<VictoryLine key={0} {...props} />];
      const dataStrings = Wrapper.getStringsFromData(childComponents).x;
      expect(dataStrings).toEqual(["one", "red", "cat"]);
    });

    it("returns an array of strings from array-type data", () => {
      const props = {
        data: [
          ["one", 1],
          ["red", 2],
          ["cat", 3],
        ],
        x: 0,
        y: 1,
      };
      const childComponents = [<VictoryLine key={0} {...props} />];
      const dataStrings = Wrapper.getStringsFromData(childComponents).x;
      expect(dataStrings).toEqual(["one", "red", "cat"]);
    });

    it("only returns strings, if data is mixed", () => {
      const props = {
        data: [
          { x: 1, y: 1 },
          { x: "three", y: 3 },
        ],
      };
      const childComponents = [<VictoryLine key={0} {...props} />];
      expect(Wrapper.getStringsFromData(childComponents).x).toEqual(["three"]);
    });

    it("returns an empty array when no strings are present", () => {
      const props = {
        data: [
          { x: 1, y: 1 },
          { x: 3, y: 3 },
        ],
      };
      const childComponents = [<VictoryLine key={0} {...props} />];
      expect(Wrapper.getStringsFromData(childComponents).x).toEqual([]);
    });

    it("returns an empty array when no children are given", () => {
      expect(Wrapper.getStringsFromData([])).toEqual({ x: [], y: [] });
    });
  });
});
