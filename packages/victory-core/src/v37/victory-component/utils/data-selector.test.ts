import { VictoryDatableProps } from "../../..";
import { DataSelector } from "./data-selector";
import * as Selectors from "./selectors";

const { selectDomains, selectNormalizedData, selectDomain } =
  spyOnAll(Selectors);

function spyOnAll<T>(obj: T) {
  Object.keys(obj).forEach((method) => {
    if (typeof obj[method] === "function") {
      jest.spyOn(obj, method as any);
    }
  });
  return jest.mocked(obj);
}

describe("DataSelector", () => {
  const generateData = <TRes>(
    length: number,
    factory: (x: number) => TRes,
  ): TRes[] => {
    return new Array(length).fill(null).map((_, i) => factory(i));
  };

  const props1: VictoryDatableProps = {
    data: generateData(5, (i) => ({ x: i, y: i * i })),
  };
  const props2: VictoryDatableProps = {
    data: generateData(10, (i) => ({
      xProp: i,
      yProp: i - 5,
    })),
    x: "xProp",
    y: "yProp",
  };

  let dataSelector: DataSelector;
  beforeEach(() => {
    jest.clearAllMocks();
    dataSelector = new DataSelector([props1, props2]);
  });

  it("should memoize the results", () => {
    expect(dataSelector.select(selectNormalizedData)).toBe(
      dataSelector.select(selectNormalizedData),
    );
    expect(dataSelector.select(selectDomains)).toBe(
      dataSelector.select(selectDomains),
    );
    expect(dataSelector.select(selectDomain)).toBe(
      dataSelector.select(selectDomain),
    );

    // These methods should only have been called once, even though they depend on each other:
    expect(selectNormalizedData).toHaveBeenCalledTimes(1);
    expect(selectDomains).toHaveBeenCalledTimes(1);
    expect(selectDomain).toHaveBeenCalledTimes(1);
  });

  describe("selectors", () => {
    it("normalizeData", () => {
      const result = dataSelector.select(selectNormalizedData);
      expect(result.map((props) => props.normalizedData))
        .toMatchInlineSnapshot(`
          Array [
            Array [
              Object {
                "_x": 0,
                "_y": 0,
                "x": 0,
                "y": 0,
              },
              Object {
                "_x": 1,
                "_y": 1,
                "x": 1,
                "y": 1,
              },
              Object {
                "_x": 2,
                "_y": 4,
                "x": 2,
                "y": 4,
              },
              Object {
                "_x": 3,
                "_y": 9,
                "x": 3,
                "y": 9,
              },
              Object {
                "_x": 4,
                "_y": 16,
                "x": 4,
                "y": 16,
              },
            ],
            Array [
              Object {
                "_x": 0,
                "_y": -5,
                "x": 0,
                "xProp": 0,
                "y": -5,
                "yProp": -5,
              },
              Object {
                "_x": 1,
                "_y": -4,
                "x": 1,
                "xProp": 1,
                "y": -4,
                "yProp": -4,
              },
              Object {
                "_x": 2,
                "_y": -3,
                "x": 2,
                "xProp": 2,
                "y": -3,
                "yProp": -3,
              },
              Object {
                "_x": 3,
                "_y": -2,
                "x": 3,
                "xProp": 3,
                "y": -2,
                "yProp": -2,
              },
              Object {
                "_x": 4,
                "_y": -1,
                "x": 4,
                "xProp": 4,
                "y": -1,
                "yProp": -1,
              },
              Object {
                "_x": 5,
                "_y": 0,
                "x": 5,
                "xProp": 5,
                "y": 0,
                "yProp": 0,
              },
              Object {
                "_x": 6,
                "_y": 1,
                "x": 6,
                "xProp": 6,
                "y": 1,
                "yProp": 1,
              },
              Object {
                "_x": 7,
                "_y": 2,
                "x": 7,
                "xProp": 7,
                "y": 2,
                "yProp": 2,
              },
              Object {
                "_x": 8,
                "_y": 3,
                "x": 8,
                "xProp": 8,
                "y": 3,
                "yProp": 3,
              },
              Object {
                "_x": 9,
                "_y": 4,
                "x": 9,
                "xProp": 9,
                "y": 4,
                "yProp": 4,
              },
            ],
          ]
        `);
    });
    it("selectDomains", () => {
      const domains = dataSelector.select(selectDomains);
      expect(domains).toMatchInlineSnapshot(`
        Array [
          Object {
            "x": Array [
              1,
              4,
            ],
            "y": Array [
              1,
              16,
            ],
          },
          Object {
            "x": Array [
              1,
              9,
            ],
            "y": Array [
              -5,
              4,
            ],
          },
        ]
      `);
    });
    it("selectDomain", () => {
      const domain = dataSelector.select(selectDomain);
      expect(domain).toMatchInlineSnapshot(`
        Object {
          "x": Array [
            1,
            9,
          ],
          "y": Array [
            -5,
            16,
          ],
        }
      `);
    });
  });
});
