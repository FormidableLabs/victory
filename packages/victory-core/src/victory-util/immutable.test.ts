import { Immutable } from "victory-core";

describe("victory-util/immutable", () => {
  it("should have valid type guards", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    function noop(arg: unknown) {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function typeChecks() {
      const u: unknown = null;

      // @ts-expect-error "u is unknown"
      u.asImmutable();

      if (Immutable.isIterable(u)) {
        u.count();
      }
      if (Immutable.isList(u)) {
        u.asImmutable();
        u.countBy((x) => x);
      }
      if (Immutable.isMap(u)) {
        u.asImmutable();
        u.countBy((x) => x);
      }
      if (Immutable.isRecord(u)) {
        noop(u.ANYTHING);
      }
    }
  });
});
