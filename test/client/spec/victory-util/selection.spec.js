/* eslint no-unused-expressions: 0 */
/* eslint max-nested-callbacks: 0 */
/* global sinon */

import { Data, Selection, VictoryLabel } from "src/index";
import React from "react";

describe("helpers/selection", () => {
  describe("getDatasets", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Data, "getData");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns data from props", () => {
      const data = [{ x: 1, y: 3 }, { x: 2, y: 5 }];
      const props = { data };
      const dataset = Selection.getDatasets(props);
      expect(Data.getData).not.called;
      expect(dataset).to.eql([{ data }]);
    });

    it("returns data from children", () => {
      const data = [{ eventKey: 0, x: 1, y: 3 }, { eventKey: 1, x: 2, y: 5 }];
      const expectedReturn = [
        { eventKey: 0, x: 1, _x: 1, y: 3, _y: 3 }, { eventKey: 1, x: 2, _x: 2, y: 5, _y: 5 }
      ];
      const name = "points";
      const children = [React.createElement(VictoryLabel, { name, data })];
      const props = { children };
      const dataset = Selection.getDatasets(props);
      expect(Data.getData).calledOnce.and.returned(expectedReturn);
      expect(dataset).to.eql([{ childName: name, data: expectedReturn }]);
    });
  });

  describe("getBounds", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.stub(Selection, "getDataCoordinates", (scale, x, y) => {
        return { x, y };
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns min / max bounds", () => {
      const x1 = 10;
      const x2 = 5;
      const y1 = 0;
      const y2 = 1;
      const props = { x1, x2, y1, y2 };
      const bounds = Selection.getBounds(props);
      expect(Selection.getDataCoordinates).calledTwice.and.returned({ x: x1, y: y1 });
      expect(bounds).to.eql({ x: [x2, x1], y: [y1, y2] });
    });
  });

  describe("filterDatasets", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Selection, "getSelectedData");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns null when no datasets are within bounds", () => {
      const datasets = [
        { childName: "a", data: [{ eventKey: 0, _x: 1, _y: 3 }, { eventKey: 1, _x: 2, _y: 5 }] }
      ];
      const bounds = { x: [0, 1], y: [10, 15] };
      const filteredData = Selection.filterDatasets(datasets, bounds);
      expect(Selection.getSelectedData).calledWith(datasets[0].data, bounds).and.returned(null);
      expect(filteredData).to.equal(null);
    });

    it("returns data points within bounds", () => {
      const data = [{ eventKey: 0, _x: 1, _y: 3 }, { eventKey: 1, _x: 2, _y: 5 }];
      const childName = "a";
      const datasets = [{ childName, data }];
      const bounds = { x: [0, 1], y: [0, 10] };
      const filteredData = Selection.filterDatasets(datasets, bounds);
      const expected = { eventKey: [0], data: [data[0]] };
      expect(Selection.getSelectedData).calledWith(datasets[0].data, bounds)
        .and.returned(expected);
      expect(filteredData).to.eql([Object.assign({ childName }, expected)]);
    });
  });
});
