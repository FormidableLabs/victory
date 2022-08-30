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
  it("should be type-safe", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function typeChecks() {
      // @ts-expect-error "Expected 2-3 arguments"
      memo(multiply)();
      // @ts-expect-error "Expected 2-3 arguments"
      memo(multiply)(2);
      // @ts-expect-error "Expected 2-3 arguments"
      memo(multiply)(2, 3, 4, 5);
      // @ts-expect-error "'string' is not assignable to 'number'"
      memo(multiply)("2", "3");
      // @ts-expect-error "'number' is not assignable to 'string'"
      const res: string = memo(multiply)(2, 3);
    }
  });
});
