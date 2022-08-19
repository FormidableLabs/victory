import { getRange } from "victory-core/lib/v37/victory-state/helpers/get-range";

describe("getRange", () => {
  it("returns a range from props", () => {
    const props = {
      range: [0, 1],
    };
    expect(getRange(props, "x")).toEqual([0, 1]);
  });

  it("returns a range based on props and axis", () => {
    const props = {
      width: 100,
      height: 200,
      padding: 0,
    };
    const x = getRange(props, "x");
    expect(Array.isArray(x)).toBe(true);
    expect(x).toHaveLength(2);
    expect(x).toEqual([0, 100]);

    const y = getRange(props, "y");
    expect(Array.isArray(y)).toBe(true);
    expect(y).toHaveLength(2);
    expect(y).toEqual([200, 0]);
  });
});
