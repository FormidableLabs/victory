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
      expect(Collection.containsStrings([{}, {a: "foo"}])).to.equal(false);
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
      expect(Collection.containsOnlyStrings([{}, {a: "foo"}])).to.equal(false);
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
});
