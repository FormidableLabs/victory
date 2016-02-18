import {
  allOfType,
  nonNegative,
  integer,
  domain,
  scale,
  homogeneousArray
} from "src/prop-types";

describe("prop-types", () => {

  describe("allOfType", () => {
    const validate = function (prop) {
      return allOfType([nonNegative, integer])({testProp: prop}, "testProp", "TestComponent");
    };

    it("returns an error if the first validator is false", () => {
      const result = validate(-1);
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
          "`testProp` in `TestComponent` must be non-negative."
      );
    });

    it("returns an error if the second validator is false", () => {
      const result = validate(1.3);
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
          "`testProp` in `TestComponent` must be an integer."
      );
    });

    it("does not return an error if both validators are true", () => {
      const result = validate(3);
      expect(result).not.to.be.an.instanceOf(Error);
    });
  });

  describe("nonNegative", () => {
    const validate = function (prop) {
      return nonNegative({testProp: prop}, "testProp", "TestComponent");
    };

    it("returns an error for non numeric values", () => {
      const result = validate("a");
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
        "`string` supplied to `TestComponent`, expected `number`."
      );
    });

    it("returns an error for negative numeric values", () => {
      const result = validate(-1);
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).to.contain(
        "`testProp` in `TestComponent` must be non-negative."
      );
    });

    it("does not return an error for positive numeric values", () => {
      const result = validate(1);
      expect(result).not.to.be.an.instanceOf(Error);
    });

    it("does not return an error for zero", () => {
      const result = validate(0);
      expect(result).not.to.be.an.instanceOf(Error);
    });
  });

  describe("integer", () => {
    const validate = function (prop) {
      return integer({testProp: prop}, "testProp", "TestComponent");
    };

    it("returns an error for non numeric values", () => {
      const result = validate("a");
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
          "`string` supplied to `TestComponent`, expected `number`."
      );
    });

    it("returns an error for non-integer numeric values", () => {
      const result = validate(2.4);
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).to.contain(
          "`testProp` in `TestComponent` must be an integer."
      );
    });

    it("does not return an error for integers", () => {
      let result = validate(3);
      expect(result).not.to.be.an.instanceOf(Error);
      result = validate(-3);
      expect(result).not.to.be.an.instanceOf(Error);
      result = validate(0);
      expect(result).not.to.be.an.instanceOf(Error);
    });
  });

  describe("domain", () => {
    const validate = function (prop) {
      return domain({testProp: prop}, "testProp", "TestComponent");
    };

    it("returns an error for non array values", () => {
      const result = validate("a");
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
        "`string` supplied to `TestComponent`, expected `array`."
      );
    });

    it("returns an error when the length of the array is not two", () => {
      const result = validate([1]);
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
        "`testProp` in `TestComponent` must be an array of two unique numeric values."
      );
    });

    it("returns an error when the values of the array are equal", () => {
      const result = validate([1, 1]);
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
        "`testProp` in `TestComponent` must be an array of two unique numeric values."
      );
    });

    it("does not return an error for two element ascending arrays", () => {
      const result = validate([0, 1]);
      expect(result).not.to.be.an.instanceOf(Error);
    });

    it("does not return an error for two element descending arrays", () => {
      const result = validate([1, 0]);
      expect(result).not.to.be.an.instanceOf(Error);
    });

    it("does not return an error arrays of dates", () => {
      const result = validate([new Date(1980, 1, 1), new Date(1990, 1, 1)]);
      expect(result).not.to.be.an.instanceOf(Error);
    });
  });

  describe("scale", () => {
    const validate = function (prop) {
      return scale({testProp: prop}, "testProp", "TestComponent");
    };

    it("returns an error for non function values", () => {
      const result = validate("a");
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
        "`testProp` in `TestComponent` must be a d3 scale."
      );
    });

    it("returns an error when the function does not have a domain, range, and copy methods", () => {
      const testFunc = () => {"oops";};
      const result = validate(testFunc);
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
        "`testProp` in `TestComponent` must be a d3 scale."
      );
    });

    it.skip("does not return an error when the function is a d3 scale", () => {
      // const testFunc = d3.scale.linear; TODO: Mock this rather than depending on d3
      // const result = validate(testFunc);
      // expect(result).not.to.be.an.instanceOf(Error);
    });
  });

  describe("homogeneousArray", () => {
    const validate = function (prop) {
      return homogeneousArray({testProp: prop}, "testProp", "TestComponent");
    };

    it("returns an error for non array values", () => {
      const result = validate("a");
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
        "`string` supplied to `TestComponent`, expected `array`."
      );
    });

    it("returns an error when the array has elements of different types", () => {
      const result = validate([1, "a"]);
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
        "Expected `testProp` in `TestComponent` to be a homogeneous array, but found " +
        "types `Number` and `String`."
      );
    });

    it("does not return an error for empty arrays", () => {
      const result = validate([]);
      expect(result).not.to.be.an.instanceOf(Error);
    });

    it("does not return an error for arrays where all elements are the same type", () => {
      const result = validate([1, 0]);
      expect(result).not.to.be.an.instanceOf(Error);
    });
  });
});
