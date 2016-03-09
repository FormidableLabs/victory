/* eslint no-unused-expressions: 0 */
/* global sinon */

import Helpers from "src/components/victory-area/helper-methods";
import Layout from "src/helpers/layout";


describe("victory-area/helper-methods", () => {
  describe("getBaseline", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Layout, "getY0");
    });

    afterEach(() => {
      sandbox.restore();
    });
    const datasets = [
      { data: [{x: 1, y: 1}, {x: 2, y: 1}] },
      { data: [{x: 1, y: 2}, {x: 2, y: 3}] }
    ];
    const domain = {x: [0, 10], y: [0, 10]};
    const nonZeroDomain = {x: [0, 10], y: [1, 10]};
    const negativeDomain = {x: [0, 10], y: [-1, 10]};

    it("should return the minimum if data is not stacked", () => {
      const calculatedProps = {domain, stacked: false};
      const result = Helpers.getBaseline(datasets, calculatedProps, 1);
      const expectedResult = [{y0: 0, x: 1, y: 2}, {y0: 0, x: 2, y: 3}];
      expect(result).to.eql(expectedResult);
    });

    it("should return the minimum if the index is zero", () => {
      const calculatedProps = {domain, stacked: true};
      const result = Helpers.getBaseline(datasets, calculatedProps, 0);
      const expectedResult = [{y0: 0, x: 1, y: 1}, {y0: 0, x: 2, y: 1}];
      expect(result).to.eql(expectedResult);
    });

    it("should return the domain minimum when it is greater than zero", () => {
      const calculatedProps = {domain: nonZeroDomain, stacked: true};
      const result = Helpers.getBaseline(datasets, calculatedProps, 0);
      const expectedResult = [{y0: 1, x: 1, y: 1}, {y0: 1, x: 2, y: 1}];
      expect(result).to.eql(expectedResult);
    });

    it("should return zero when the domain minimum is negative", () => {
      const calculatedProps = {domain: negativeDomain, stacked: true};
      const result = Helpers.getBaseline(datasets, calculatedProps, 0);
      const expectedResult = [{y0: 0, x: 1, y: 1}, {y0: 0, x: 2, y: 1}];
      expect(result).to.eql(expectedResult);
    });

    it("should return the previous y values for stacked data", () => {
      const calculatedProps = {domain, stacked: true};
      const result = Helpers.getBaseline(datasets, calculatedProps, 1);
      const expectedResult = [{y0: 1, x: 1, y: 2}, {y0: 1, x: 2, y: 3}];
      expect(result).to.eql(expectedResult);
    });
  });
});
