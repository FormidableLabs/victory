/* eslint no-unused-expressions: 0 */
/* eslint-disable max-nested-callbacks */
/* global sinon */
import {
  getDataWithBaseline
} from "packages/victory-chart/src/components/victory-area/helper-methods";
import { Data } from "packages/victory-core";

describe("victory-area/helper-methods", () => {
  describe("getDataWithBaseline", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.stub(Data, "getData", (props) => props.data);
    });

    afterEach(() => {
      sandbox.restore();
    });

    const data = [
      { _x: 1, _y: 1 }, { _x: 2, _y: 1 }
    ];
    const stackedData = [
      { _x: 1, _y: 1, _y0: 1, _y1: 2 }, { _x: 2, _y: 1, _y0: 1, _y1: 2 }
    ];
    const defaultDomain = { _x: [0, 10], y: [0, 10] };
    const nonZeroDomain = { x: [0, 10], y: [1, 10] };
    const negativeDomain = { x: [0, 10], y: [-1, 10] };
    const scale = (domain) => {
      return {
        x: { domain: () => domain.x },
        y: { domain: () => domain.y }
      };
    };

    it("should return the minimum if yOffset is not present", () => {
      const props = { data };
      const result = getDataWithBaseline(props, scale(defaultDomain));
      const expectedResult = [
        { _y0: 0, _y1: 1, _x: 1, _y: 1 }, { _y0: 0, _y1: 1, _x: 2, _y: 1 }
      ];
      expect(result).to.eql(expectedResult);
    });

    it("should return the domain minimum when it is greater than zero", () => {
      const props = { data };
      const result = getDataWithBaseline(props, scale(nonZeroDomain));
      const expectedResult = [
        { _y0: 1, _y1: 1, _x: 1, _y: 1 }, { _y0: 1, _y1: 1, _x: 2, _y: 1 }
      ];
      expect(result).to.eql(expectedResult);
    });

    it("should return zero when the domain minimum is negative", () => {
      const props = { data };
      const result = getDataWithBaseline(props, scale(negativeDomain));
      const expectedResult = [
        { _y0: 0, _y1: 1, _x: 1, _y: 1 }, { _y0: 0, _y1: 1, _x: 2, _y: 1 }
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
