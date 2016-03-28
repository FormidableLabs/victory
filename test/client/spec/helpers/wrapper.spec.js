/* eslint no-unused-expressions: 0 */
import Layout from "src/helpers/wrapper";

describe("helpers/wrapper", () => {
  describe("getY0", () => {
    const data = [
      {data: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}]},
      {data: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}]},
      {data: [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}]}
    ];
    const mixedData = [
      {data: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}]},
      {data: [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}]},
      {data: [{x: 1, y: -1}, {x: 2, y: -1}, {x: 3, y: -1}]},
      {data: [{x: 1, y: -2}, {x: 2, y: -2}, {x: 3, y: -2}]}
    ];
    it("returns the sum of the previous data sets", () => {
      const result = Layout.getY0(data, {x: 2, y: 2}, 2);
      expect(result).to.eql(1);
    });
    it("returns the sum of the previous data sets only when data is the same sign", () => {
      const result = Layout.getY0(mixedData, {x: 2, y: -2}, 3);
      expect(result).to.eql(-1);
    });
  });
});
