import { createMemo } from "./create-memo";

describe("createMemo", () => {
  const multiply = jest.fn((a: number, b: number, c = 1) => a * b * c);

  let memo = createMemo();
  beforeEach(() => {
    memo = createMemo();
  });
  it("should memoize a function and the results", () => {
    expect(memo(multiply)).toBe(memo(multiply));

    expect(memo(multiply)(2, 3)).toEqual(6);
    expect(memo(multiply)(2, 3)).toEqual(6);
    expect(multiply).toHaveBeenCalledTimes(1);

    expect(memo(multiply)(3, 4)).toEqual(12);
    expect(memo(multiply)(3, 4)).toEqual(12);
    expect(memo(multiply)(2, 3)).toEqual(6);
    expect(memo(multiply)(2, 3)).toEqual(6);
    expect(multiply).toHaveBeenCalledTimes(2);

    // Number of parameters matters too:
    multiply.mockClear();
    expect(memo(multiply)(5, 6)).toEqual(30);
    expect(memo(multiply)(5, 6, undefined)).toEqual(30);
    expect(memo(multiply)(5, 6, 7)).toEqual(210);
    expect(memo(multiply)(5, 6, 7)).toEqual(210);
    expect(multiply).toHaveBeenCalledTimes(3);
  });
});
