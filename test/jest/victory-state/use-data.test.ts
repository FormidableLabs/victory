/* eslint-disable max-nested-callbacks */
import { renderHook } from "@testing-library/react-hooks";
import { range } from "lodash";
import { useData } from "victory-core";

describe("useData", () => {
  it("returns an empty array if no data is passed in", () => {
    const { result } = renderHook(() => useData({}));
    expect(result.current).toEqual([]);
  });

  it("returns formatted data", () => {
    const data = [
      { x: "kittens", y: 3 },
      { x: "cats", y: 5 }
    ];
    const { result } = renderHook(() => useData({ data }));
    expect(result.current).toMatchInlineSnapshot(`
      Array [
        Object {
          "_x": 1,
          "_y": 3,
          "x": "kittens",
          "xName": "kittens",
          "y": 3,
        },
        Object {
          "_x": 2,
          "_y": 5,
          "x": "cats",
          "xName": "cats",
          "y": 5,
        },
      ]
    `);
  });

  it("accepts date values", () => {
    const data = [
      {
        x: new Date(2022, 0, 1),
        y: 10
      },
      {
        x: new Date(2022, 0, 2),
        y: 20
      }
    ];
    const { result } = renderHook(() => useData({ data }));
    expect(result.current).toMatchInlineSnapshot(`
      Array [
        Object {
          "_x": 2022-01-01T08:00:00.000Z,
          "_y": 10,
          "x": 2022-01-01T08:00:00.000Z,
          "y": 10,
        },
        Object {
          "_x": 2022-01-02T08:00:00.000Z,
          "_y": 20,
          "x": 2022-01-02T08:00:00.000Z,
          "y": 20,
        },
      ]
    `);
  });

  it("filters data with null x and y values", () => {
    const data = [
      {
        x: null,
        y: 1
      },
      {
        y: 2,
        x: null
      },
      {
        x: 3,
        y: 3
      }
    ];
    const { result } = renderHook(() => useData({ data }));
    expect(result.current).toHaveLength(1);
  });

  it("returns formatted data with accessors", () => {
    const data = [
      { one: "kittens", two: 3 },
      { one: "cats", two: 5 }
    ];
    const { result } = renderHook(() => useData({ data, x: "one", y: "two" }));
    expect(result.current).toMatchInlineSnapshot(`
      Array [
        Object {
          "_x": 1,
          "_y": 3,
          "one": "kittens",
          "two": 3,
          "x": "kittens",
          "xName": "kittens",
          "y": 3,
        },
        Object {
          "_x": 2,
          "_y": 5,
          "one": "cats",
          "two": 5,
          "x": "cats",
          "xName": "cats",
          "y": 5,
        },
      ]
    `);
  });

  it("does not sort data by default", () => {
    const data = [
      { x: 2, y: 2 },
      { x: 1, y: 3 },
      { x: 3, y: 1 }
    ];
    const { result } = renderHook(() => useData({ data }));

    expect(result.current).toEqual([
      { _x: 2, x: 2, _y: 2, y: 2 },
      { _x: 1, x: 1, _y: 3, y: 3 },
      { _x: 3, x: 3, _y: 1, y: 1 }
    ]);
  });

  it("sorts data according to sort key", () => {
    const data = [
      { x: 1, y: 1, order: 2 },
      { x: 3, y: 3, order: 1 },
      { x: 2, y: 2, order: 3 }
    ];

    const { result } = renderHook(() => useData({ data, sortKey: "order" }));

    expect(result.current).toEqual([
      { _x: 3, x: 3, _y: 3, y: 3, order: 1 },
      { _x: 1, x: 1, _y: 1, y: 1, order: 2 },
      { _x: 2, x: 2, _y: 2, y: 2, order: 3 }
    ]);
  });

  it("sorts data according to sort key and sort order", () => {
    const data = [
      { x: 1, y: 1, order: 2 },
      { x: 3, y: 3, order: 1 },
      { x: 2, y: 2, order: 3 }
    ];

    const { result } = renderHook(() =>
      useData({ data, sortKey: "order", sortOrder: "descending" })
    );

    expect(result.current).toEqual([
      { _x: 2, x: 2, _y: 2, y: 2, order: 3 },
      { _x: 1, x: 1, _y: 1, y: 1, order: 2 },
      { _x: 3, x: 3, _y: 3, y: 3, order: 1 }
    ]);
  });

  it("formats deeply nested data", () => {
    const data = range(8).map((i) => ({ a: { b: [{ x: i, y: i }] } }));

    const { result } = renderHook(() =>
      useData({ data, x: "a.b[0].x", y: "a.b[0].y" })
    );

    expect(result.current).toHaveLength(8);
  });

  it("formats data from a range", () => {
    const data = range(3);

    const { result } = renderHook(() => useData({ data }));

    expect(result.current).toEqual([
      { _x: 0, x: 0, _y: 0, y: 0 },
      { _x: 1, x: 1, _y: 1, y: 1 },
      { _x: 2, x: 2, _y: 2, y: 2 }
    ]);
  });
});
