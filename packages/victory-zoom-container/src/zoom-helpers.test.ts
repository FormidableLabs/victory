import { RawZoomHelpers } from "./zoom-helpers";

describe("RawZoomHelpers.getMinimumDomain", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should be calculating the minimum domain", () => {
    jest.spyOn(RawZoomHelpers, "getDomain").mockImplementation(() => ({
      x: [0, 100],
    }));
    expect(
      RawZoomHelpers.getMinimumDomain(30, { minimumZoom: true }, "x"),
    ).toStrictEqual([29.95, 30.05]);
  });
});

describe("RawZoomHelpers.getScaledDomain", () => {
  it("should scale the domain correctly with a zoom in factor", () => {
    expectToBeCloseToArray(
      RawZoomHelpers.getScaledDomain([0, 100], 0.9, 0.5),
      [5, 95],
    );
  });
  it("should scale the domain correctly with a zoom out factor", () => {
    expectToBeCloseToArray(
      RawZoomHelpers.getScaledDomain([0, 100], 1.1, 0.5),
      [-5, 105],
    );
  });
});

describe("RawZoomHelpers.scale", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should get the correct domain", () => {
    jest.spyOn(RawZoomHelpers, "getDomain").mockImplementation(() => ({
      x: [0, 100],
    }));
    jest.spyOn(RawZoomHelpers, "getScalePercent").mockImplementation(() => 0.5);
    jest
      .spyOn(RawZoomHelpers, "getMinimumDomain")
      .mockImplementation(() => [29.955, 30.045]);

    expectToBeCloseToArray(
      RawZoomHelpers.scale([0, 100], { deltaY: -1 }, {}, "x"),
      [0.166, 99.833],
    );
  });

  it("should't change the domain when zooming out with max zoom out", () => {
    jest.spyOn(RawZoomHelpers, "getDomain").mockImplementation(() => ({
      x: [0, 100],
    }));
    jest.spyOn(RawZoomHelpers, "getScalePercent").mockImplementation(() => 0.1);
    jest
      .spyOn(RawZoomHelpers, "getMinimumDomain")
      .mockImplementation(() => [29.955, 30.045]);

    expectToBeCloseToArray(
      RawZoomHelpers.scale([0, 100], { deltaY: 1 }, {}, "x"),
      [0, 100],
    );
  });

  it("should't change the domain when zooming out with max zoom out with the cursor outside the container boundary", () => {
    jest.spyOn(RawZoomHelpers, "getDomain").mockImplementation(() => ({
      x: [0, 100],
    }));
    jest
      .spyOn(RawZoomHelpers, "getScalePercent")
      .mockImplementation(() => -0.1);
    jest
      .spyOn(RawZoomHelpers, "getMinimumDomain")
      .mockImplementation(() => [29.955, 30.045]);

    expectToBeCloseToArray(
      RawZoomHelpers.scale([0, 100], { deltaY: 1 }, {}, "x"),
      [0, 100],
    );
  });
});

function expectToBeCloseToArray(actual, expected) {
  expect(actual.length).toBe(expected.length);
  actual.forEach((x, i) => expect(x).toBeCloseTo(expected[i]));
}
