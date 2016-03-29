/* eslint no-unused-expressions: 0 */
import Wrapper from "src/helpers/wrapper";

describe("helpers/wrapper", () => {
  describe("getY0", () => {
    const data = [
      [{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
      [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
      [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}]
    ];
    const mixedData = [
      [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
      [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}],
      [{x: 1, y: -1}, {x: 2, y: -1}, {x: 3, y: -1}],
      [{x: 1, y: -2}, {x: 2, y: -2}, {x: 3, y: -2}]
    ];
    it("returns the sum of the previous data sets", () => {
      const result = Wrapper.getY0({x: 2, y: 2}, 2, {datasets: data});
      expect(result).to.eql(1);
    });
    it("returns the sum of the previous data sets only when data is the same sign", () => {
      const result = Wrapper.getY0({x: 2, y: -2}, 3, {datasets: mixedData});
      expect(result).to.eql(-1);
    });
  });

  describe("getCategories", () => {
    it.skip("returns a set of categories from a component", () => {
      // const categoryResult = Wrapper.getCategories();
    });

    it.skip("returns undefined if no categories are defined", () => {

    });
  });

});
