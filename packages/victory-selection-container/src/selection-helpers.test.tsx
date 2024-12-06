import React from "react";
import { VictoryBar } from "victory-bar";
import * as d3Scale from "d3-scale";

import { SelectionHelpers } from "./selection-helpers";

const scale = { x: d3Scale.scaleLinear(), y: d3Scale.scaleLinear() };

describe("helpers/selection", () => {
  describe("getDatasets", () => {
    it("returns data from props", () => {
      const data = [
        { x: 1, y: 3 },
        { x: 2, y: 5 },
      ];
      const props = { data };
      const dataset = SelectionHelpers.getDatasets(props);
      expect(dataset).toEqual([{ data }]);
    });

    it("returns data from children", () => {
      const data = [
        { eventKey: 0, x: 1, y: 3 },
        { eventKey: 1, x: 2, y: 5 },
      ];
      const expectedReturn = [
        { eventKey: 0, x: 1, _x: 1, y: 3, _y: 3 },
        { eventKey: 1, x: 2, _x: 2, y: 5, _y: 5 },
      ];
      const name = "points";
      const children = [React.createElement(VictoryBar, { name, data })];
      const props = { children };
      const dataset = SelectionHelpers.getDatasets(props);
      expect(dataset).toEqual([{ childName: name, data: expectedReturn }]);
    });
  });

  describe("filterDatasets", () => {
    it("returns null when no datasets are within bounds", () => {
      const datasets = [
        {
          childName: "a",
          data: [
            { eventKey: 0, _x: 1, _y: 3 },
            { eventKey: 1, _x: 2, _y: 5 },
          ],
        },
      ];
      const props = { scale, x1: 0, y1: 0, x2: 0.5, y2: 0.5 };
      const filteredData = SelectionHelpers.filterDatasets(props, datasets);
      expect(filteredData).toBeNull();
    });

    it("returns data points within bounds", () => {
      const data = [
        { eventKey: 0, _x: 0, _y: 0 },
        { eventKey: 1, _x: 2, _y: 5 },
      ];
      const childName = "a";
      const datasets = [{ childName, data }];
      const props = { scale, x1: 0, y1: 0, x2: 0.5, y2: 0.5 };
      const filteredData = SelectionHelpers.filterDatasets(props, datasets);
      const expected = { eventKey: [0], data: [data[0]] };
      expect(filteredData).toEqual([Object.assign({ childName }, expected)]);
    });
  });
});
