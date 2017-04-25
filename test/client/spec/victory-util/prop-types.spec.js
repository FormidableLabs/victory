/* global sinon */
/* global console */
import {PropTypes} from "react";
import {PropTypes as CustomPropTypes} from "src/index";

describe("prop-types", () => {

  /* eslint-disable no-console */
  // Directly lifted from https://github.com/react-bootstrap/react-prop-types
  // And then adapted to work with our linter, and sinon sandbox
  describe("deprecated", () => {
    let sandbox;

    const shouldError = () => {
      sinon.assert.calledOnce(console.error);
    };

    const validate = (prop) => {
      return CustomPropTypes.deprecated(PropTypes.string, "Read more at link")({
        pName: prop
      }, "pName", "ComponentName");
    };

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.stub(console, "error");
    });

    afterEach(() => {
      console.error.restore();
      sandbox.reset();
    });

    it("Should warn about deprecation and validate OK", () => {

      const err = validate("value");
      shouldError("`pName` property of `ComponentName1 has been deprecated.\nRead more at link");
      expect(err).to.not.be.an.instanceOf(Error);
    });

    it(`Should warn about deprecation and throw validation error when property
       value is not OK`, () => {

      const err = validate({});
      shouldError("`pName` property of `ComponentName` has been deprecated.\nRead more at link");
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.include(
        "Invalid undefined `pName` of type `object` supplied to `ComponentName`");
    });
  });
  /* eslint-enable no-console */

  describe("allOfType", () => {
    const validate = function (prop) {
      return CustomPropTypes.allOfType(
        [CustomPropTypes.nonNegative, CustomPropTypes.integer]
      )({testProp: prop}, "testProp", "TestComponent");
    };

    it("returns an error if the first validator is false", () => {
      const result = validate(-1);
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
          "`testProp` in `TestComponent` must be a non-negative number."
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
      return CustomPropTypes.nonNegative({testProp: prop}, "testProp", "TestComponent");
    };

    it("returns an error for non numeric values", () => {
      const result = validate("a");
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
         "`testProp` in `TestComponent` must be a non-negative number."
      );
    });

    it("returns an error for negative numeric values", () => {
      const result = validate(-1);
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).to.contain(
         "`testProp` in `TestComponent` must be a non-negative number."
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
      return CustomPropTypes.integer({testProp: prop}, "testProp", "TestComponent");
    };

    it("returns an error for non numeric values", () => {
      const result = validate("a");
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
          "`testProp` in `TestComponent` must be an integer."
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

  describe("greaterThanZero", () => {
    const validate = function (prop) {
      return CustomPropTypes.greaterThanZero({testProp: prop}, "testProp", "TestComponent");
    };

    it("returns an error for non numeric values", () => {
      const result = validate("a");
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
          "`testProp` in `TestComponent` must be a number greater than zero."
      );
    });

    it("returns an error for zero", () => {
      const result = validate(0);
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).to.contain(
          "`testProp` in `TestComponent` must be a number greater than zero."
      );
    });

    it("returns an error for negative numbers", () => {
      const result = validate(-3);
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).to.contain(
          "`testProp` in `TestComponent` must be a number greater than zero."
      );
    });

    it("does not return an error for numbers greater than zero", () => {
      let result = validate(0.1);
      expect(result).not.to.be.an.instanceOf(Error);
      result = validate(5);
      expect(result).not.to.be.an.instanceOf(Error);
      result = validate(1);
      expect(result).not.to.be.an.instanceOf(Error);
    });
  });

  describe("domain", () => {
    const validate = function (prop) {
      return CustomPropTypes.domain({testProp: prop}, "testProp", "TestComponent");
    };

    it("returns an error for non array values", () => {
      const result = validate("a");
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
       "`testProp` in `TestComponent` must be an array of two unique numeric values."
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
      return CustomPropTypes.scale({testProp: prop}, "testProp", "TestComponent");
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
      return CustomPropTypes.homogeneousArray({testProp: prop}, "testProp", "TestComponent");
    };

    it("returns an error for non array values", () => {
      const result = validate("a");
      expect(result).to.be.an.instanceOf(Error);
      expect(result.message).contain(
         "`testProp` in `TestComponent` must be an array."
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

    it("does not return an error for arrays with one item", () => {
      const result = validate(["a"]);
      expect(result).not.to.be.an.instanceOf(Error);
    });

    it("does not return an error for arrays where all elements are the same type", () => {
      const result = validate([1, 0]);
      expect(result).not.to.be.an.instanceOf(Error);
    });
  });

  describe("matchDataLength", () => {
    const validate = function (prop, dataProp) {
      const props = {testProp: prop, data: dataProp};
      return CustomPropTypes.matchDataLength(props, "testProp", "TestComponent");
    };

    it("does not return an error when prop is undefined", () => {
      expect(validate()).to.not.be.an.instanceOf(Error);
    });

    it("does not return an error when prop has same length as data", () => {
      expect(validate([{}, {}], [1, 2])).to.not.be.an.instanceOf(Error);
    });

    it("returns an error when prop doesn't have same length as data", () => {
      expect(validate([{}], [1, 2]))
        .to.be.an.instanceOf(Error).and
        .to.have.property("message", "Length of data and testProp arrays must match.");
    });
  });
});
