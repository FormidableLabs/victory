import { range } from "lodash";
import { fromJS } from "immutable";
import { getData, getDomain } from "victory-candlestick/lib/helper-methods";

const immutableGetDataTest = {
  createData: (x) => fromJS(x),
  testLabel: "with immutable data",
};
const getDataTest = {
  createData: (x) => x,
  testLabel: "with js data",
};

[getDataTest, immutableGetDataTest].forEach(({ createData, testLabel }) => {
  describe(`victory-candlestick/helper-methods ${testLabel}`, () => {
    describe("getData", () => {
      it("sorts data by sortKey", () => {
        const data = createData(
          range(5)
            .map((i) => ({ x: i, open: i, close: i, high: i, low: i }))
            .reverse(),
        );

        const dataResult = getData({
          data,
          x: "x",
          open: "open",
          close: "close",
          high: "high",
          low: "low",
          sortKey: "x",
        });

        expect(dataResult.map((datum) => datum.x)).toEqual([0, 1, 2, 3, 4]);
      });
    });

    describe("getDomain", () => {
      const dataSet = createData([
        { x: 5, open: 10, close: 20, high: 25, low: 5 },
        { x: 10, open: 15, close: 25, high: 30, low: 10 },
      ]);

      it("returns a domain array for the x axis", () => {
        const domainXResult = getDomain(
          {
            data: dataSet,
            x: "x",
            open: "open",
            close: "close",
            high: "high",
            low: "low",
          },
          "x",
        );
        expect(domainXResult).toEqual([5, 10]);
      });

      it("returns a domain array for the y axis", () => {
        const domainYResult = getDomain(
          {
            data: dataSet,
            open: "open",
            close: "close",
            high: "high",
            low: "low",
          },
          "y",
        );
        expect(domainYResult).toEqual([5, 30]);
      });
    });
  });
});
