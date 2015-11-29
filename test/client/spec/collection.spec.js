import { isArrayOfArrays } from "src/collection";

describe("isArrayOfArrays", () => {
  it("handles empty argument", () => {
    expect(isArrayOfArrays()).to.equal(false);
  });

  it("handles empty array", () => {
    expect(isArrayOfArrays([])).to.equal(false);
  });

  it("returns false for collections of non-arrays", () => {
    expect(isArrayOfArrays([1])).to.equal(false);
    expect(isArrayOfArrays([{}])).to.equal(false);
    expect(isArrayOfArrays(['a'])).to.equal(false);
  });

  it("returns false for mixed collections", () => {
    expect(isArrayOfArrays([[], 1, {}])).to.equal(false);
    expect(isArrayOfArrays([1, [], {}])).to.equal(false);
    expect(isArrayOfArrays([1, {}, []])).to.equal(false);
  });

  it("returns true for collections of arrays", () => {
    expect(isArrayOfArrays([ [] ])).to.equal(true);
    expect(isArrayOfArrays([ [{}] ])).to.equal(true);
    expect(isArrayOfArrays([ [ [] ] ])).to.equal(true);
    expect(isArrayOfArrays([ [], [] ])).to.equal(true);
  });
});
