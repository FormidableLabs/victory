/* eslint no-unused-expressions: 0 */
/* global sinon */

import LayoutHelpers from "src/components/victory-bar/layout-helpers";
import Scale from "src/helpers/scale";

describe("layout-helpers", () => {
  describe("getBarPosition", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(LayoutHelpers, "getYOffset");
      sandbox.spy(LayoutHelpers, "adjustX");
    });

    afterEach(() => {
      sandbox.restore();
    });
    const domain = {x: [0, 10], y: [0, 10]};
    const range = {x: [0, 100], y: [0, 100]};
    const scale = {
      x: Scale.getBaseScale({scale: "linear"}, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale({scale: "linear"}, "y").domain(domain.y).range(range.y)
    };
    const style = {data: {width: 10, padding: 10}};
    const datasets = [
      {data: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}], attrs: {name: "one"}},
      {data: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}], attrs: {name: "two"}},
      {data: [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}], attrs: {name: "three"}}
    ];

    it("should not calculate an yOffset if the data is not stacked", () => {
      const calculatedProps = {scale, domain, range, style, datasets, stacked: false};
      const data = {x: 1, y: 1};
      const index = {seriesIndex: 1, barIndex: 0};
      const barPosition = LayoutHelpers.getBarPosition(data, index, calculatedProps);
      expect(LayoutHelpers.getYOffset).not.called;
      expect(LayoutHelpers.adjustX).calledWith(data, index.seriesIndex, calculatedProps)
        .and.returned(1);
      expect(barPosition).to.eql({independent: 10, dependent0: 0, dependent1: 10});
    });

    it("should not adjustX if the data is stacked and doesn't contain categories", () => {
      const calculatedProps = {scale, domain, range, style, datasets, stacked: true};
      const data = {x: 1, y: 2};
      const index = {seriesIndex: 2, barIndex: 0};
      const barPosition = LayoutHelpers.getBarPosition(data, index, calculatedProps);
      expect(LayoutHelpers.adjustX).notCalled;
      expect(LayoutHelpers.getYOffset).calledWith(data, index, calculatedProps)
        .and.returned(1);
      expect(barPosition).to.eql({independent: 10, dependent0: 10, dependent1: 30});
    });
  });

  describe("shouldPlotLabel", () => {
    const datasets = [
      {data: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}], attrs: {name: "one"}},
      {data: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}], attrs: {name: "two"}},
      {data: [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}], attrs: {name: "three"}}
    ];
    const labels = ["one", "two", "three"];
    it("only plots a label above the center series when bars are not stacked", () => {
      const props = {labels};
      expect(LayoutHelpers.shouldPlotLabel(0, props, datasets)).to.be.false;
      expect(LayoutHelpers.shouldPlotLabel(1, props, datasets)).to.be.true;
      expect(LayoutHelpers.shouldPlotLabel(2, props, datasets)).to.be.false;
    });

    it("only plots a label above the last series when bars are stacked", () => {
      const props = {labels, stacked: true};
      expect(LayoutHelpers.shouldPlotLabel(0, props, datasets)).to.be.false;
      expect(LayoutHelpers.shouldPlotLabel(1, props, datasets)).to.be.false;
      expect(LayoutHelpers.shouldPlotLabel(2, props, datasets)).to.be.true;
    });
  });

  describe("getLabelIndex", () => {
    it.skip("determines the label index", () => {
    });
  });

});
