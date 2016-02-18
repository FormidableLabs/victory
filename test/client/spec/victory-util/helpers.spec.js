/* eslint no-unused-expressions: 0 */
/* global sinon */
import Helpers from "src/helpers";

describe("helpers", () => {
  describe("evaluateProp", () => {
    const data = {x: 3, y: 2};
    it("evaluates functional props", () => {
      const testProp = (datum) => datum.y > 0 ? "red" : "blue";
      expect(Helpers.evaluateProp(testProp, data)).to.equal("red");
    });
    it("doesn't alter non-functional props", () => {
      const testProp = "blue";
      expect(Helpers.evaluateProp(testProp, data)).to.equal("blue");
    });
  });

  describe("evaluateStyle", () => {
    const data = {x: 3, y: 2};
    it("evaluates functional styles, without altering others", () => {
      const style = {
        color: (datum) => datum.y > 0 ? "red" : "blue",
        size: 5
      };
      expect(Helpers.evaluateStyle(style, data)).to.deep.equal({color: "red", size: 5});
    });
  });

  describe("getRange", () => {
    const props = {
      width: 100,
      height: 200,
      padding: 0
    };
    it("returns a range based on props and axis", () => {
      expect(Helpers.getRange(props, "x")).to.be.an("array")
        .and.to.have.length(2)
        .and.to.include.members([0, 100]);
      expect(Helpers.getRange(props, "y")).to.be.an("array")
        .and.to.have.length(2)
        .and.to.include.members([0, 200]);
    });
  });

  describe("getStyles", () => {
    const defaultStyles = {
      parent: {border: "black"},
      data: {fill: "blue", stroke: "black"},
      labels: {fontSize: 10, fontFamily: "Helvetica"}
    };
    it("merges styles", () => {
      const style = {data: {fill: "red"}, labels: {fontSize: 12}};
      const props = {style, width: 500, height: 500};
      const styles = Helpers.getStyles(props, defaultStyles);
      expect(styles.parent).to.deep.equal({border: "black", width: 500, height: 500});
      expect(styles.data).to.deep.equal({fill: "red", stroke: "black"});
      expect(styles.labels).to.deep.equal({fontSize: 12, fontFamily: "Helvetica"});
    });
  });

  describe("getPadding", () => {
    it("sets padding from a single number", () => {
      const props = {padding: 40};
      expect(Helpers.getPadding(props)).to.deep.equal({top: 40, bottom: 40, left: 40, right: 40});
    });
    it("sets padding from a complete object", () => {
      const props = {
        padding: {top: 20, bottom: 40, left: 60, right: 80}
      };
      expect(Helpers.getPadding(props)).to.deep.equal(props.padding);
    });
    it("fills missing values with 0", () => {
      const props = {
        padding: {top: 40, bottom: 40}
      };
      expect(Helpers.getPadding(props)).to.deep.equal({top: 40, bottom: 40, left: 0, right: 0});
    });
  });

  describe("getStringsFromData", () => {
    it("returns an array of strings from a data prop", () => {
      const props = {data: [{x: "one", y: 1}, {x: "red", y: 2}, {x: "cat", y: 3}]};
      const dataStrings = Helpers.getStringsFromData(props, "x");
      expect(dataStrings).to.eql(["one", "red", "cat"]);
    });

    it("returns an array of strings from array-type data", () => {
      const props = {data: [["one", 1], ["red", 2], ["cat", 3]], x: 0, y: 1};
      const dataStrings = Helpers.getStringsFromData(props, "x");
      expect(dataStrings).to.eql(["one", "red", "cat"]);
    });

    it("only returns strings, if data is mixed", () => {
      const props = {data: [{x: 1, y: 1}, {x: "three", y: 3}]};
      expect(Helpers.getStringsFromData(props, "x")).to.eql(["three"]);
    });

    it("returns an empty array when no strings are present", () => {
      const props = {data: [{x: 1, y: 1}, {x: 3, y: 3}]};
      expect(Helpers.getStringsFromData(props, "x")).to.eql([]);
    });

    it("returns an empty array when the data prop is undefined", () => {
      expect(Helpers.getStringsFromData({}, "x")).to.eql([]);
    });
  });

  describe("createAccessor", () => {
    it("creates a valid object accessor from a property key", () => {
      const accessor = Helpers.createAccessor("k");
      expect(accessor({k: 42})).to.eql(42);
    });

    it("creates a valid array accessor from an index", () => {
      const accessor = Helpers.createAccessor(2);
      expect(accessor([3, 4, 5])).to.eql(5);
    });

    it("creates a valid array accessor from a deeply nested path", () => {
      const accessor = Helpers.createAccessor("x.y[0].0.z");
      expect(accessor({x: {y: [[{z: 1987}]]}})).to.eql(1987);
    });

    it("creates a value (passthrough) accessor from null/undefined", () => {
      const nullAccessor = Helpers.createAccessor(null);
      const undefinedAccessor = Helpers.createAccessor(undefined);
      expect(nullAccessor("ok")).to.eql("ok");
      expect(undefinedAccessor(14)).to.eql(14);
    });
  });

  describe("formatData", () => {
    it("formats a single dataset", () => {
      const dataset = [{x: 1, y: 3}, {x: 2, y: 5}];
      const props = {};
      const formatted = Helpers.formatData(dataset, props);
      expect(formatted).to.be.an.array;
      expect(formatted[0]).to.have.keys(["x", "y"]);
    });
  });

  describe("getData", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Helpers, "formatData");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("formats and returns the data prop", () => {
      const data = [{x: "kittens", y: 3}, {x: "cats", y: 5}];
      const props = {data, x: "x", y: "y"};
      const expectedReturn = [{x: 1, xName: "kittens", y: 3}, {x: 2, xName: "cats", y: 5}];
      const returnData = Helpers.getData(props);
      expect(Helpers.formatData).calledOnce.and.returned(expectedReturn);
      expect(returnData).to.eql(expectedReturn);
    });
  });
});
