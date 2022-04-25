/* eslint no-unused-expressions: 0 */
/* eslint-disable max-nested-callbacks */
/* global sinon */
import { getDataWithBaseline } from "victory-area/src/helper-methods";
import { Data } from "victory-core";
import * as d3Scale from "victory-vendor/d3-scale";

describe("victory-area/helper-methods", () => {
  describe("getDataWithBaseline", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.stub(Data, "getData").callsFake((props) => props.data);
    });

    afterEach(() => {
      sandbox.restore();
    });

    const data = [
      { _x: 1, _y: 1 },
      { _x: 2, _y: 1 }
    ];
    const stackedData = [
      { _x: 1, _x0: 0, _x1: 1, _y: 1, _y0: 1, _y1: 2 },
      { _x: 2, _x0: 0, _x1: 2, _y: 1, _y0: 1, _y1: 2 }
    ];
    const defaultDomain = { x: [0, 10], y: [0, 10] };
    const nonZeroDomain = { x: [0, 10], y: [1, 10] };
    const negativeDomain = { x: [0, 10], y: [-1, 10] };
    const scale = (domain) => {
      return {
        x: d3Scale.scaleLinear().domain(domain.x),
        y: d3Scale.scaleLinear().domain(domain.y)
      };
    };

    it("should return the minimum if yOffset is not present", () => {
      const props = { data };
      const result = getDataWithBaseline(props, scale(defaultDomain));
      const expectedResult = [
        { _y0: 0, _y1: 1, _y: 1, _x: 1, _x0: 0, _x1: 1 },
        { _y0: 0, _y1: 1, _y: 1, _x: 2, _x0: 0, _x1: 2 }
      ];
      expect(result).to.eql(expectedResult);
    });

    it("should return the domain minimum when it is greater than zero", () => {
      const props = { data };
      const result = getDataWithBaseline(props, scale(nonZeroDomain));
      const expectedResult = [
        { _y0: 1, _y1: 1, _y: 1, _x: 1, _x0: 0, _x1: 1 },
        { _y0: 1, _y1: 1, _y: 1, _x: 2, _x0: 0, _x1: 2 }
      ];
      expect(result).to.eql(expectedResult);
    });

    it("should return zero when the domain minimum is negative", () => {
      const props = { data };
      const result = getDataWithBaseline(props, scale(negativeDomain));
      const expectedResult = [
        { _y0: 0, _y1: 1, _y: 1, _x: 1, _x0: 0, _x1: 1 },
        { _y0: 0, _y1: 1, _y: 1, _x: 2, _x0: 0, _x1: 2 }
      ];
      expect(result).to.eql(expectedResult);
    });

    it("should return yOffset if present", () => {
      const props = { data: stackedData };
      const result = getDataWithBaseline(props, scale(defaultDomain));
      const expectedResult = stackedData;
      expect(result).to.eql(expectedResult);
    });
  });
});
