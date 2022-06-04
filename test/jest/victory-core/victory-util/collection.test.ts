import { Collection } from "victory-core";

describe("victory-util/collection", () => {
  describe("containsStrings", () => {
    it("handles empty argument", () => {
      expect(Collection.containsStrings()).toEqual(false);
    });

    it("handles empty array", () => {
      expect(Collection.containsStrings([])).toEqual(false);
    });

    it("returns false for collections of non-strings", () => {
      expect(Collection.containsStrings([0, 1])).toEqual(false);
      expect(Collection.containsStrings([undefined, null, NaN])).toEqual(false);
      expect(Collection.containsStrings([{}, { a: "foo" }])).toEqual(false);
    });

    it("returns false for collections with strings", () => {
      expect(Collection.containsStrings(["hello"])).toEqual(true);
      expect(Collection.containsStrings(["hello", "there"])).toEqual(true);
      expect(Collection.containsStrings([0, "hello", {}, null])).toEqual(true);
    });
  });

  describe("containsOnlyStrings", () => {
    it("handles empty argument", () => {
      expect(Collection.containsOnlyStrings()).toEqual(false);
    });

    it("handles empty array", () => {
      expect(Collection.containsOnlyStrings([])).toEqual(false);
    });

    it("returns false for collections of non-strings", () => {
      expect(Collection.containsOnlyStrings([0, 1])).toEqual(false);
      expect(Collection.containsOnlyStrings([undefined, null, NaN])).toEqual(
        false
      );
      expect(Collection.containsOnlyStrings([{}, { a: "foo" }])).toEqual(false);
    });

    it("returns false for collections with some strings", () => {
      expect(Collection.containsOnlyStrings(["hello", 0])).toEqual(false);
      expect(Collection.containsOnlyStrings(["hello", ["not me"]])).toEqual(
        false
      );
      expect(Collection.containsOnlyStrings([0, "hello", {}, null])).toEqual(
        false
      );
    });

    it("returns true for collections with only strings", () => {
      expect(Collection.containsOnlyStrings(["hello"])).toEqual(true);
      expect(Collection.containsOnlyStrings(["hello", "there"])).toEqual(true);
    });
  });

  describe("isArrayOfArrays", () => {
    it("handles empty argument", () => {
      expect(Collection.isArrayOfArrays()).toEqual(false);
    });

    it("handles empty array", () => {
      expect(Collection.isArrayOfArrays([])).toEqual(false);
    });

    it("returns false for collections of non-arrays", () => {
      expect(Collection.isArrayOfArrays([1])).toEqual(false);
      expect(Collection.isArrayOfArrays([{}])).toEqual(false);
      expect(Collection.isArrayOfArrays(["a"])).toEqual(false);
    });

    it("returns false for mixed collections", () => {
      expect(Collection.isArrayOfArrays([[], 1, {}])).toEqual(false);
      expect(Collection.isArrayOfArrays([1, [], {}])).toEqual(false);
      expect(Collection.isArrayOfArrays([1, {}, []])).toEqual(false);
    });

    it("returns true for collections of arrays", () => {
      expect(Collection.isArrayOfArrays([[]])).toEqual(true);
      expect(Collection.isArrayOfArrays([[{}]])).toEqual(true);
      expect(Collection.isArrayOfArrays([[[]]])).toEqual(true);
      expect(Collection.isArrayOfArrays([[], []])).toEqual(true);
    });
  });

  describe("removeUndefined", () => {
    it("handles empty array", () => {
      expect(Collection.removeUndefined([])).toEqual([]);
    });

    it("does not filter non-undefineds", () => {
      const testArray = [0, 1, "a", {}, false, null, NaN];
      expect(Collection.removeUndefined(testArray)).toEqual(testArray);
    });

    it("filters out undefineds", () => {
      const testArray = [
        undefined,
        0,
        undefined,
        {},
        false,
        null,
        NaN,
        undefined
      ];
      const expectedArray = [0, {}, false, null, NaN];
      expect(Collection.removeUndefined(testArray)).toEqual(expectedArray);
    });
  });

  describe("getMaxValue", () => {
    it("returns a date if array contains dates", () => {
      const array = [new Date(2016, 3, 6), new Date(2017, 5, 3), 10];
      expect(Collection.getMaxValue(array)).toEqual(new Date(2017, 5, 3));
    });

    it("returns a number if array does not contain dates", () => {
      const array = [3, 8, 10];
      expect(Collection.getMaxValue(array)).toEqual(10);
    });

    it("allows values to be concated and returns the appropriate number", () => {
      const array = [3, 8, 10];
      expect(Collection.getMaxValue(array, 1, 20)).toEqual(20);
    });
  });

  describe("getMinValue", () => {
    it("returns a date if array contains dates", () => {
      const array = [
        new Date(2016, 3, 6),
        new Date(2017, 5, 3),
        new Date(2015, 11, 4)
      ];
      expect(Collection.getMinValue(array)).toEqual(new Date(2015, 11, 4));
    });

    it("returns a number if array does not contain dates", () => {
      const array = [3, 8, 10];
      expect(Collection.getMinValue(array)).toEqual(3);
    });

    it("allows values to be concated and returns the appropriate number", () => {
      const array = [3, 8, 10];
      expect(Collection.getMinValue(array, 1, 20)).toEqual(1);
    });
  });
});
