import * as Helpers from "./helpers";

describe("victory-util/helpers", () => {
  describe("invert", () => {
    it("inverts a given object", () => {
      const data = { x: 3, y: "2", z: 1 };
      const invertedData = Helpers.invert(data);
      expect(invertedData).toEqual({ 3: "x", 2: "y", 1: "z" });
    });

    it("handles duplicate values by taking the last key", () => {
      const data = { x: 3, y: 2, z: 1, a: 2 };
      const invertedData = Helpers.invert(data);
      expect(invertedData).toEqual({ 3: "x", 2: "a", 1: "z" });
    });
  });

  describe("omit", () => {
    const data = { x: 3, y: 2, z: 1 };

    it("removes omitted keys and preserves all others", () => {
      const newData = Helpers.omit(data, ["x"]);
      // @ts-expect-error This property is deleted, as expected
      expect(newData.x).toBeUndefined();
      expect(newData.y).toEqual(2);
      expect(newData.z).toEqual(1);
    });

    it("creates a copy of the original object", () => {
      const newData = Helpers.omit(data, []);
      newData.x = 10;
      expect(data.x).toEqual(3);
      expect(newData.x).toEqual(10);
    });

    it("defaults to an empty object", () => {
      // @ts-expect-error This should complain
      const newData = Helpers.omit();
      expect(newData).toEqual({});
    });

    it("defaults to simple shallow copy", () => {
      const newData = Helpers.omit(data);
      expect(newData).toEqual(data);
    });
  });

  describe("modifyProps", () => {
    it("defaults to an empty object", () => {
      expect(Helpers.modifyProps({})).toEqual({});
    });

    it("removes the theme role's style", () => {
      const role = "legend";
      const props = {
        theme: {
          legend: {
            style: {
              color: "blue",
            },
            data: 42,
          },
        },
      };
      const fallbackProps = {};
      const modifiedProps = {
        ...props,
        data: 42,
      };
      expect(Helpers.modifyProps(props, fallbackProps, role)).toEqual(
        modifiedProps,
      );
    });

    it("uses fallbackProps", () => {
      const props = { x: 2, y: 3 };
      const fallbackProps = { x: 12, y: 13, z: 14 };
      const modifiedProps = { x: 2, y: 3, z: 14 };
      expect(Helpers.modifyProps(props, fallbackProps)).toEqual(modifiedProps);
    });
  });

  describe("evaluateProp", () => {
    const data = { x: 3, y: 2 };

    it("evaluates functional props", () => {
      const testProp = (datum) => (datum.y > 0 ? "red" : "blue");
      expect(Helpers.evaluateProp(testProp, data)).toEqual("red");
    });

    it("doesn't alter non-functional props", () => {
      const testProp = "blue";
      expect(Helpers.evaluateProp(testProp, data)).toEqual("blue");
    });
  });

  describe("evaluateStyle", () => {
    const data = { x: 3, y: 2 };

    it("evaluates functional styles, without altering others", () => {
      const style = {
        color: (datum) => (datum.y > 0 ? "red" : "blue"),
        size: 5,
      };
      expect(Helpers.evaluateStyle(style, data)).toEqual({
        color: "red",
        size: 5,
      });
    });

    it("returns no styles if disableInlineStyles is true", () => {
      const style = {
        color: "blue",
      };
      const props = {
        disableInlineStyles: true,
      };
      expect(Helpers.evaluateStyle(style, props)).toEqual({});
    });
  });

  describe("getRange", () => {
    const props = {
      width: 100,
      height: 200,
      padding: 0,
    };

    it("returns a range based on props and axis", () => {
      const x = Helpers.getRange(props, "x");
      expect(Array.isArray(x)).toBe(true);
      expect(x).toHaveLength(2);
      expect(x).toEqual([0, 100]);

      const y = Helpers.getRange(props, "y");
      expect(Array.isArray(y)).toBe(true);
      expect(y).toHaveLength(2);
      expect(y).toEqual([200, 0]);
    });
  });

  describe("getStyles", () => {
    const defaultStyles = {
      parent: { border: "black" },
      data: { fill: "blue", stroke: "black" },
      labels: { fontSize: 10, fontFamily: "Helvetica" },
    };

    it("merges styles", () => {
      const style = { data: { fill: "red" }, labels: { fontSize: 12 } };
      const styles = Helpers.getStyles(style, defaultStyles);
      expect(styles.parent).toEqual({
        border: "black",
        width: "100%",
        height: "100%",
      });
      expect(styles.data).toEqual({ fill: "red", stroke: "black" });
      expect(styles.labels).toEqual({
        fontSize: 12,
        fontFamily: "Helvetica",
      });
    });
  });

  describe("getPadding", () => {
    it("sets padding from a single number", () => {
      const props = { padding: 40 };
      expect(Helpers.getPadding(props.padding)).toEqual({
        top: 40,
        bottom: 40,
        left: 40,
        right: 40,
      });
    });

    it("sets padding from a complete object", () => {
      const props = {
        padding: { top: 20, bottom: 40, left: 60, right: 80 },
      };
      expect(Helpers.getPadding(props.padding)).toEqual(props.padding);
    });

    it("fills missing values with 0", () => {
      const props = {
        padding: { top: 40, bottom: 40 },
      };
      expect(Helpers.getPadding(props.padding)).toEqual({
        top: 40,
        bottom: 40,
        left: 0,
        right: 0,
      });
    });
  });

  describe("createAccessor", () => {
    it("creates a valid object accessor from a property key", () => {
      const accessor = Helpers.createAccessor("k");
      expect(accessor({ k: 42 })).toEqual(42);
    });

    it("creates a valid array accessor from an index", () => {
      const accessor = Helpers.createAccessor(2);
      expect(accessor([3, 4, 5])).toEqual(5);
    });

    it("creates a valid array accessor from a deeply nested path", () => {
      const accessor = Helpers.createAccessor("x.y[0].0.z");
      expect(accessor({ x: { y: [[{ z: 1987 }]] } })).toEqual(1987);
    });

    it("creates a value (passthrough) accessor from null/undefined", () => {
      const nullAccessor = Helpers.createAccessor(null);
      const undefinedAccessor = Helpers.createAccessor(undefined);
      expect(nullAccessor("ok")).toEqual("ok");
      expect(undefinedAccessor(14)).toEqual(14);
    });
  });

  describe("range", () => {
    it("returns an array of integers", () => {
      expect(Helpers.range(4)).toEqual([0, 1, 2, 3]);
    });

    it("returns an array of integers for negative n", () => {
      expect(Helpers.range(-4)).toEqual([0, -1, -2, -3]);
    });

    it("returns an array of integers from start to end", () => {
      expect(Helpers.range(1, 5)).toEqual([1, 2, 3, 4]);
    });

    it("returns an array of integers from negative start to end", () => {
      expect(Helpers.range(-5, 5)).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]);
    });

    it("returns an array of integers from start to negative end", () => {
      expect(Helpers.range(5, -5)).toEqual([5, 4, 3, 2, 1, 0, -1, -2, -3, -4]);
    });

    it("returns an array of integers using an increment", () => {
      expect(Helpers.range(0, 20, 5)).toEqual([0, 5, 10, 15]);
    });

    it("returns an array of integers using an increment and negative start", () => {
      expect(Helpers.range(-10, 20, 5)).toEqual([-10, -5, 0, 5, 10, 15]);
    });

    it("returns an array of numbers from a floating point increment", () => {
      expect(Helpers.range(0, 1, 0.2).length).toEqual(5);
    });

    it("should parse non-integer values", () => {
      expect(Helpers.range(4.7)).toEqual([0, 1, 2, 3, 4]);
    });

    it("should not throw on undefined start value", () => {
      expect(Helpers.range(undefined as any)).toEqual([]);
    });

    it("should not throw on NaN start value", () => {
      expect(Helpers.range(NaN as any)).toEqual([]);
    });
  });
});
