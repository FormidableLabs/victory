/* eslint no-unused-expressions: 0 */
/* eslint max-statements: 0 */
/* global sinon */

import { Collection } from "src/index";

describe("collections", () => {

  describe("isNonEmptyArray", () => {

    it("returns false for undefined argument", () => {
      expect(Collection.isNonEmptyArray()).to.equal(false);
    });

    it("returns false for empty array", () => {
      expect(Collection.isNonEmptyArray([])).to.equal(false);
    });

    it("returns true for non-empty array", () => {
      expect(Collection.isNonEmptyArray(["hello"])).to.equal(true);
    });
  });

  describe("containsStrings", () => {

    it("handles empty argument", () => {
      expect(Collection.containsStrings()).to.equal(false);
    });

    it("handles empty array", () => {
      expect(Collection.containsStrings([])).to.equal(false);
    });

    it("returns false for collections of non-strings", () => {
      expect(Collection.containsStrings([0, 1])).to.equal(false);
      expect(Collection.containsStrings([undefined, null, NaN])).to.equal(false);
      expect(Collection.containsStrings([{}, { a: "foo" }])).to.equal(false);
    });

    it("returns false for collections with strings", () => {
      expect(Collection.containsStrings(["hello"])).to.equal(true);
      expect(Collection.containsStrings(["hello", "there"])).to.equal(true);
      expect(Collection.containsStrings([0, "hello", {}, null])).to.equal(true);
    });
  });

  describe("containsOnlyStrings", () => {

    it("handles empty argument", () => {
      expect(Collection.containsOnlyStrings()).to.equal(false);
    });

    it("handles empty array", () => {
      expect(Collection.containsOnlyStrings([])).to.equal(false);
    });

    it("returns false for collections of non-strings", () => {
      expect(Collection.containsOnlyStrings([0, 1])).to.equal(false);
      expect(Collection.containsOnlyStrings([undefined, null, NaN])).to.equal(false);
      expect(Collection.containsOnlyStrings([{}, { a: "foo" }])).to.equal(false);
    });

    it("returns false for collections with some strings", () => {
      expect(Collection.containsOnlyStrings(["hello", 0])).to.equal(false);
      expect(Collection.containsOnlyStrings(["hello", ["not me"]])).to.equal(false);
      expect(Collection.containsOnlyStrings([0, "hello", {}, null])).to.equal(false);
    });

    it("returns true for collections with only strings", () => {
      expect(Collection.containsOnlyStrings(["hello"])).to.equal(true);
      expect(Collection.containsOnlyStrings(["hello", "there"])).to.equal(true);
    });
  });

  describe("isArrayOfArrays", () => {

    it("handles empty argument", () => {
      expect(Collection.isArrayOfArrays()).to.equal(false);
    });

    it("handles empty array", () => {
      expect(Collection.isArrayOfArrays([])).to.equal(false);
    });

    it("returns false for collections of non-arrays", () => {
      expect(Collection.isArrayOfArrays([1])).to.equal(false);
      expect(Collection.isArrayOfArrays([{}])).to.equal(false);
      expect(Collection.isArrayOfArrays(["a"])).to.equal(false);
    });

    it("returns false for mixed collections", () => {
      expect(Collection.isArrayOfArrays([[], 1, {}])).to.equal(false);
      expect(Collection.isArrayOfArrays([1, [], {}])).to.equal(false);
      expect(Collection.isArrayOfArrays([1, {}, []])).to.equal(false);
    });

    it("returns true for collections of arrays", () => {
      expect(Collection.isArrayOfArrays([ [] ])).to.equal(true);
      expect(Collection.isArrayOfArrays([ [{}] ])).to.equal(true);
      expect(Collection.isArrayOfArrays([ [ [] ] ])).to.equal(true);
      expect(Collection.isArrayOfArrays([ [], [] ])).to.equal(true);
    });
  });

  describe("removeUndefined", () => {

    it("handles empty array", () => {
      expect(Collection.removeUndefined([])).to.eql([]);
    });

    it("does not filter non-undefineds", () => {
      const testArray = [0, 1, "a", {}, false, null, NaN];
      expect(Collection.removeUndefined(testArray)).to.eql(testArray);
    });

    it("filters out undefineds", () => {
      const testArray = [undefined, 0, undefined, {}, false, null, NaN, undefined];
      const expectedArray = [0, {}, false, null, NaN];
      expect(Collection.removeUndefined(testArray)).to.eql(expectedArray);
    });
  });

  describe("getMaxValue", () => {

    it("returns a date if array contains dates", () => {
      const array = [new Date(2016, 3, 6), new Date(2017, 5, 3), 10];
      expect(Collection.getMaxValue(array)).to.eql(new Date(2017, 5, 3));
    });

    it("returns a number if array does not contain dates", () => {
      const array = [3, 8, 10];
      expect(Collection.getMaxValue(array)).to.eql(10);
    });

    it("allows values to be concated and returns the appropriate number", () => {
      const array = [3, 8, 10];
      expect(Collection.getMaxValue(array, 1, 20)).to.eql(20);
    });
  });

  describe("getMinValue", () => {

    it("returns a date if array contains dates", () => {
      const array = [new Date(2016, 3, 6), new Date(2017, 5, 3), new Date(2015, 11, 4)];
      expect(Collection.getMinValue(array)).to.eql(new Date(2015, 11, 4));
    });

    it("returns a number if array does not contain dates", () => {
      const array = [3, 8, 10];
      expect(Collection.getMinValue(array)).to.eql(3);
    });

    it("allows values to be concated and returns the appropriate number", () => {
      const array = [3, 8, 10];
      expect(Collection.getMinValue(array, 1, 20)).to.eql(1);
    });
  });

  describe("allSetsEqual", () => {

    it("returns true when all sets are equal", () => {
      const comparisons = [
        [1, 1],
        ["wow", "wow"],
        [{ stuff: 43 }, { stuff: 43 }]
      ];

      expect(Collection.allSetsEqual(comparisons)).to.eql(true);
    });

    it("returns false when not all sets are equal", () => {
      const comparisons = [
        [1, 1],
        ["wow", "wow"],
        [{ stuff: 1 }, { stuff: 43 }]
      ];

      expect(Collection.allSetsEqual(comparisons)).to.eql(false);
    });
  });


  describe("areVictoryPropsEqual", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
      sandbox.restore();
    });

    it("returns early when nested collections are strictly equal", () => {
      const a = { test: { nested: "a" } };
      const b = a;
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(true);
    });

    it("returns early when nested collections are not the same length", () => {
      const a = { test: { nested: "a" }, test2: { nested: "b" } };
      const b = { test: { nested: "a" } };
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(false);
    });

    it("returns early if values are not the same type", () => {
      const a = { test: { nested: "a" } };
      const b = { test: () => "a" };
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(false);
    });

    it("returns early when nested elements are empty", () => {
      const a = { a: [] };
      const b = { a: [] };
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(true);
    });

    it("returns false for mixed objects and arrays", () => {
      const a = { a: [] };
      const b = { a: {} };
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(false);
    });

    it("returns true if values are functions", () => {
      const a = { test: () => "a" };
      const b = { test: () => "b" };
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(true);
    });

    it("recursively checks equality for nested objects", () => {
      const a = { test: { nested: "a" }, test2: { nested: "a" } };
      const b = { test: { nested: "a" }, test2: { nested: "a" } };
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(true);
    });

    it("finds differences in deeply nested objects", () => {
      const a = { a: 1, b: 2, test: { nested: { deep: "a" } } };
      const b = { a: 1, b: 2, test: { nested: { deep: "b" } } };
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(false);
    });

    it("returns early when shallow differences are found in deeply nested objects", () => {
      const a = { a: 1, b: 2, test: { nested: { deep: "a" } } };
      const b = { a: 2, b: 2, test: { nested: { deep: "b" } } };
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(false);
    });

    it("recursively checks equality for nested arrays", () => {
      const a = [ 1, [2, "3", [4]]];
      const b = [ 1, [2, "3", [4]]];
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(true);
    });

    it("finds differences in deeply nested arrays", () => {
      const a = [ 1, [2, "3", [4]]];
      const b = [ 1, [2, "3", [5]]];
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(false);
    });

    it("returns early when shallow differences are found in deeply nested arrays", () => {
      const a = [ 1, [2, "3", [4]]];
      const b = [ 2, [2, "3", [5]]];
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(false);
    });

    it("recursively checks equality for mixed collections", () => {
      const a = [ 1, [2, "3", { a: 4 }]];
      const b = [ 1, [2, "3", { a: 4 }]];
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(true);
    });

    it("compares objects regardless of key order", () => {
      const a = { test2: { nested: "a" }, test: { nested: "b" } };
      const b = { test: { nested: "b" }, test2: { nested: "a" } };
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(true);
    });

    it("does not recursively check date objects", () => {
      const a = { test: new Date(2010, 2, 1), test2: new Date(2010, 1, 1) };
      const b = { test: new Date(2010, 2, 1), test2: new Date(2010, 1, 1) };
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(true);
    });

    it("returns equal for equivalent date objects", () => {
      const a = { test: new Date(2010, 1, 1) };
      const b = { test: new Date("Mon Feb 01 2010") };
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(true);
    });

    /*
      Tests for primitive comparisons are heavily influenced by tests for lodash isEqual
      https://github.com/lodash/lodash/blob/4.17.4/test/test.js#L9477
    */
    it("correctly compares numbers", () => {
      const pairs = [
        [1, 1, true], [1, 2, false], [-0, -0, true], [0, 0, true], [-0, 0, true], [-1, 1, false]
      ];
      pairs.forEach((vals) => {
        const a = vals[0];
        const b = vals[1];
        const expected = vals[2];
        expect(Collection.areVictoryPropsEqual(a, b)).to.equal(expected);
      });
    });

    it("correctly compares strings", () => {
      const pairs = [
         ["a", "a", true], ["a", "b", false], ["a", "A", false], [1, "1", false], [0, "0", false],
         ["a", ["a"], false]
      ];
      pairs.forEach((vals) => {
        const a = vals[0];
        const b = vals[1];
        const expected = vals[2];
        expect(Collection.areVictoryPropsEqual(a, b)).to.equal(expected);
      });
    });

    it("correctly distinguishes boolean values", () => {
      const pairs = [
         [true, true, true], [true, 1, false], [true, "a", false], [false, false, true],
         [false, 0, false], [false, "", false]
      ];
      pairs.forEach((vals) => {
        const a = vals[0];
        const b = vals[1];
        const expected = vals[2];
        expect(Collection.areVictoryPropsEqual(a, b)).to.equal(expected);
      });
    });

    it("does not hang on circular structures", () => {
      const obj = {};
      obj.self = obj;
      const a = { x: obj };
      const b = { x: obj };
      const c = { y: obj };
      expect(Collection.areVictoryPropsEqual(a, b)).to.equal(true);
      expect(Collection.areVictoryPropsEqual(a, c)).to.equal(false);
    });

    it("correctly distinguishes null, NaN and undefined", () => {
      const pairs = [
        // a, b, shouldAEqualB
        [null, null, true],
        [null, undefined, false],
        [null, {}, false],
        [null, "", false],
        [null, 0, false],
        [undefined, undefined, true],
        [undefined, null, false],
        [undefined, "", false],
        [NaN, "a", false],
        [NaN, Infinity, false]
      ];
      pairs.forEach((vals) => {
        const [a, b, expected] = vals;
        expect(Collection.areVictoryPropsEqual(a, b)).to.equal(expected);
      });
    });
  });
});
