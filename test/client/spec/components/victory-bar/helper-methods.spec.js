/* eslint no-unused-expressions: 0 */
/* global sinon */

import Helpers from "src/components/victory-bar/helper-methods";
import Layout from "src/helpers/layout";
import Scale from "src/helpers/scale";

describe("victory-bar/helper-methods", () => {
  describe("getBarPosition", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Layout, "getY0");
      sandbox.spy(Helpers, "adjustX");
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
      const barPosition = Helpers.getBarPosition(data, index, calculatedProps);
      expect(Layout.getY0).not.called;
      expect(Helpers.adjustX).calledWith(data, index.seriesIndex, calculatedProps).and.returned(1);
      expect(barPosition).to.eql({independent: 10, dependent0: 0, dependent1: 10});
    });

    it("should not adjustX if the data is stacked and doesn't contain categories", () => {
      const calculatedProps = {scale, domain, range, style, datasets, stacked: true};
      const data = {x: 1, y: 2};
      const index = {seriesIndex: 2, barIndex: 0};
      const barPosition = Helpers.getBarPosition(data, index, calculatedProps);
      expect(Helpers.adjustX).notCalled;
      expect(Layout.getY0).calledWith(datasets, data, index.seriesIndex).and.returned(1);
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
      expect(Helpers.shouldPlotLabel(0, props, datasets)).to.be.false;
      expect(Helpers.shouldPlotLabel(1, props, datasets)).to.be.true;
      expect(Helpers.shouldPlotLabel(2, props, datasets)).to.be.false;
    });

    it("only plots a label above the last series when bars are stacked", () => {
      const props = {labels, stacked: true};
      expect(Helpers.shouldPlotLabel(0, props, datasets)).to.be.false;
      expect(Helpers.shouldPlotLabel(1, props, datasets)).to.be.false;
      expect(Helpers.shouldPlotLabel(2, props, datasets)).to.be.true;
    });
  });

  describe("getLabelIndex", () => {
    it.skip("determines the label index", () => {
    });
  });

});
