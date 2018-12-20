/* eslint no-unused-expressions: 0 */
/* eslint max-nested-callbacks: 0 */

import { Selection } from "packages/victory-core/src/index";
import * as d3Scale from "d3-scale";

describe("helpers/selection", () => {
  describe("getBounds", () => {
    it("returns min / max bounds", () => {
      const x1 = 10;
      const x2 = 5;
      const y1 = 0;
      const y2 = 1;
      const scale = { x: d3Scale.scaleLinear(), y: d3Scale.scaleLinear() };
      const props = { x1, x2, y1, y2, scale };
      const bounds = Selection.getBounds(props);
      expect(bounds).to.eql({ x: [x2, x1], y: [y1, y2] });
    });
  });

  describe("getDomainCoordinates", () => {
    it("returns coordinates corresponding to domain min max", () => {
      const scale = {
        x: d3Scale.scaleLinear(),
        y: d3Scale.scaleLinear()
      };
      const coords = Selection.getDomainCoordinates({ scale });
      expect(coords).to.eql({ x: [0, 1], y: [0, 1] });
    });
  });

  describe("getDataCoordinates", () => {
    it("returns coordinates corresponding to point x, y", () => {
      const scale = {
        x: d3Scale.scaleLinear(),
        y: d3Scale.scaleLinear()
      };
      const coords = Selection.getDataCoordinates({}, scale, 1, 1);
      expect(coords).to.eql({ x: 1, y: 1 });
    });
    it("returns polar coordinates corresponding to point x, y", () => {
      const scale = {
        x: d3Scale.scaleLinear().range([0, Math.PI * 2]),
        y: d3Scale.scaleLinear()
      };
      const x = Math.PI;
      const y = 0;
      const coords = Selection.getDataCoordinates({ polar: true }, scale, x, y);
      expect(coords).to.eql({ x: 0, y: Math.PI });
    });
  });
});
