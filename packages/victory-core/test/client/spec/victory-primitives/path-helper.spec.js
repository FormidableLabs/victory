/* eslint no-unused-expressions: 0 */
import PathHelpers from "src/victory-primitives/path-helpers";

describe("path-helpers", () => {
  const x = 0;
  const y = 0;
  const size = 1;
  describe("circle", () => {
    it("draws a path for a circle at the correct location", () => {
      const pathResult = PathHelpers.circle(x, y, size);
      expect(pathResult).to.contain(`M ${x}, ${y}`);
    });
  });

  describe("square", () => {
    it("draws a path for a square at the correct location", () => {
      const pathResult = PathHelpers.square(x, y, size);
      const baseSize = 0.87 * size;
      expect(pathResult).to.contain(`M ${x - baseSize}, ${y + baseSize}`);
    });
  });

  describe("diamond", () => {
    it("draws a path for a diamond at the correct location", () => {
      const pathResult = PathHelpers.diamond(0, 0, 1);
      const baseSize = 0.87 * size;
      const length = Math.sqrt(2 * (baseSize * baseSize));
      expect(pathResult).to.contain(`M ${Math.round(x)}, ${Math.round(y + length)}`);
    });
  });

  describe("triangleUp", () => {
    it("draws a path for a triangleUp at the correct location", () => {
      const pathResult = PathHelpers.triangleUp(0, 0, 1);
      expect(pathResult).to.contain(`M ${x - size}, ${y + size}`);
    });
  });

  describe("triangleDown", () => {
    it("draws a path for a triangleDown at the correct location", () => {
      const pathResult = PathHelpers.triangleDown(0, 0, 1);
      expect(pathResult).to.contain(`M ${x - size}, ${y - size}`);
    });
  });

  describe("plus", () => {
    it("draws a path for a plus at the correct location", () => {
      const pathResult = PathHelpers.plus(0, 0, 1);
      const baseSize = 1.1 * size;
      const distance = baseSize / 1.5;
      expect(pathResult).to.contain(
        `M ${(x - (distance / 2))}, ${(y + baseSize)}`
      );
    });
  });

  describe("minus", () => {
    it("draws a path for a minus at the correct location", () => {
      const pathResult = PathHelpers.minus(0, 0, 1);
      const baseSize = 1.1 * size;
      const lineHeight = baseSize - baseSize * 0.3;
      expect(pathResult).to.contain(
        `M ${(x - (baseSize))}, ${(y + lineHeight / 2)}`
      );
    });
  });

  describe("star", () => {
    it("draws a path for a star at the correct location", () => {
      const pathResult = PathHelpers.star(0, 0, 1);
      const angle = Math.PI / 5;
      const baseSize = 1.35 * size;
      expect(pathResult).to.contain(`M ${(baseSize) * Math.sin(angle) + x},
        ${(baseSize) * Math.cos(angle) + y}`);
    });
  });
});
