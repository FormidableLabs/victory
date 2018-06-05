/* eslint no-unused-expressions: 0 */
import Helpers from "src/victory-util/helpers";

describe("victory-util/helpers", () => {
  describe("omit", () => {
    const data = { x: 3, y: 2, z: 1 };
    it("removes omitted keys and preserves all others", () => {
      const newData = Helpers.omit(data, ["x"]);
      expect(newData.x).to.be.undefined;
      expect(newData.y).to.equal(2);
      expect(newData.z).to.equal(1);
    });
    it("creates a copy of the original object", () => {
      const newData = Helpers.omit(data, []);
      newData.x = 10;
      expect(data.x).to.equal(3);
      expect(newData.x).to.equal(10);
    });
    it("defaults to an empty object", () => {
      const newData = Helpers.omit();
      expect(newData).to.eql({});
    });
    it("defaults to simple shallow copy", () => {
      const newData = Helpers.omit(data);
      expect(newData).to.eql(data);
    });
  });

  describe("modifyProps", () => {
    it("defaults to an empty object", () => {
      expect(Helpers.modifyProps({})).to.eql({});
    });
    it("removes the theme role's style", () => {
      const role = "legend";
      const props = {
        theme: {
          legend: {
            style: {
              color: "blue"
            },
            data: 42
          }
        }
      };
      const fallbackProps = {};
      const modifiedProps = {
        ...props,
        data: 42
      };
      expect(Helpers.modifyProps(props, fallbackProps, role)).to.eql(modifiedProps);
    });
    it("uses fallbackProps", () => {
      const props = { x: 2, y: 3 };
      const fallbackProps = { x: 12, y: 13, z: 14 };
      const modifiedProps = { x: 2, y: 3, z: 14 };
      expect(Helpers.modifyProps(props, fallbackProps)).to.eql(modifiedProps);
    });
  });

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
});
