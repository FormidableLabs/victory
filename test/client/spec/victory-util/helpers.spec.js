/* eslint no-unused-expressions: 0 */
import Helpers from "src/victory-util/helpers";

describe("helpers", () => {
  describe("evaluateProp", () => {
    const data = { x: 3, y: 2 };
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
    const data = { x: 3, y: 2 };
    it("evaluates functional styles, without altering others", () => {
      const style = {
        color: (datum) => datum.y > 0 ? "red" : "blue",
        size: 5
      };
      expect(Helpers.evaluateStyle(style, data)).to.deep.equal({ color: "red", size: 5 });
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
      parent: { border: "black" },
      data: { fill: "blue", stroke: "black" },
      labels: { fontSize: 10, fontFamily: "Helvetica" }
    };
    it("merges styles", () => {
      const style = { data: { fill: "red" }, labels: { fontSize: 12 } };
      const styles = Helpers.getStyles(style, defaultStyles);
      expect(styles.parent).to.deep.equal({ border: "black", width: "100%", height: "100%" });
      expect(styles.data).to.deep.equal({ fill: "red", stroke: "black" });
      expect(styles.labels).to.deep.equal({ fontSize: 12, fontFamily: "Helvetica" });
    });
  });

  describe("sanitizeStyleProps", () => {
    it("drop invalid svg attributes", () => {
      const data = { tree: "blue", stroke: "#c43a31" };
      expect(Helpers.sanitizeStyleProps(data)).to.deep.equal({ stroke: "#c43a31" });
    });
  });

  describe("getPadding", () => {
    it("sets padding from a single number", () => {
      const props = { padding: 40 };
      expect(Helpers.getPadding(props)).to.deep.equal({ top: 40, bottom: 40, left: 40, right: 40 });
    });
    it("sets padding from a complete object", () => {
      const props = {
        padding: { top: 20, bottom: 40, left: 60, right: 80 }
      };
      expect(Helpers.getPadding(props)).to.deep.equal(props.padding);
    });
    it("fills missing values with 0", () => {
      const props = {
        padding: { top: 40, bottom: 40 }
      };
      expect(Helpers.getPadding(props)).to.deep.equal({ top: 40, bottom: 40, left: 0, right: 0 });
    });
  });

  describe("createAccessor", () => {
    it("creates a valid object accessor from a property key", () => {
      const accessor = Helpers.createAccessor("k");
      expect(accessor({ k: 42 })).to.eql(42);
    });

    it("creates a valid array accessor from an index", () => {
      const accessor = Helpers.createAccessor(2);
      expect(accessor([3, 4, 5])).to.eql(5);
    });

    it("creates a valid array accessor from a deeply nested path", () => {
      const accessor = Helpers.createAccessor("x.y[0].0.z");
      expect(accessor({ x: { y: [[{ z: 1987 }]] } })).to.eql(1987);
    });

    it("creates a value (passthrough) accessor from null/undefined", () => {
      const nullAccessor = Helpers.createAccessor(null);
      const undefinedAccessor = Helpers.createAccessor(undefined);
      expect(nullAccessor("ok")).to.eql("ok");
      expect(undefinedAccessor(14)).to.eql(14);
    });
  });

  describe("isVertical", () => {
    it("returns true when the orientation is vertical", () => {
      const props = { orientation: "left" };
      const verticalResult = Helpers.isVertical(props);
      expect(verticalResult).to.equal(true);
    });

    it("returns false when the orientation is horizontal", () => {
      const props = { orientation: "bottom" };
      const verticalResult = Helpers.isVertical(props);
      expect(verticalResult).to.equal(false);
    });
  });
});
