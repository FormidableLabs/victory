/* eslint no-unused-expressions: 0 */
/* global sinon */

import Helpers from "src/components/victory-bar/helper-methods";
import Scale from "src/helpers/scale";
import Domain from "src/helpers/domain";

describe("victory-bar/helper-methods", () => {
  describe("getDomain", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Domain, "getDomainFromGroupedData");
    });

    afterEach(() => {
      sandbox.restore();
    });
    const data = [
      [{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
      [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
      [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}]
    ];
    const noZero = [
      [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
      [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
      [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}]
    ];
    const mixedData = [
      [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
      [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}],
      [{x: 1, y: -1}, {x: 2, y: -1}, {x: 3, y: -1}],
      [{x: 1, y: -2}, {x: 2, y: -2}, {x: 3, y: -2}]
    ];

    it("calculates a domain from props", () => {
      const props = {domain: {x: [1, 2], y: [2, 3]}};
      const domainResultX = Helpers.getDomain(props, "x");
      expect(Domain.getDomainFromGroupedData).notCalled;
      expect(domainResultX).to.eql([1, 2]);
      const domainResultY = Helpers.getDomain(props, "y");
      expect(Domain.getDomainFromGroupedData).notCalled;
      expect(domainResultY).to.eql([2, 3]);
    });

    it("calculates a domain from data", () => {
      const props = {data, grouped: true, x: "x", y: "y"};
      const domainResultX = Helpers.getDomain(props, "x");
      expect(Domain.getDomainFromGroupedData).calledWith(props, "x")
        .and.returned([1, 3]);
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = Helpers.getDomain(props, "y");
      expect(Domain.getDomainFromGroupedData).calledWith(props, "y")
        .and.returned([0, 2]);
      expect(domainResultY).to.eql([0, 2]);
    });

    it("calculates a domain from data with negative and positive values", () => {
      const props = {data: mixedData, grouped: true, x: "x", y: "y"};
      const domainResultX = Helpers.getDomain(props, "x");
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = Helpers.getDomain(props, "y");
      expect(domainResultY).to.eql([-2, 3]);
    });

    it("the domain of the dependent axis should always contain zero", () => {
      const props = {data: noZero, grouped: true, x: "x", y: "y"};
      const domainResultX = Helpers.getDomain(props, "x");
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = Helpers.getDomain(props, "y");
      expect(domainResultY).to.eql([0, 3]);
    });

    it("calculates a stacked domain", () => {
      const props = {data, stacked: true, x: "x", y: "y"};
      const domainResultX = Helpers.getDomain(props, "x");
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = Helpers.getDomain(props, "y");
      expect(domainResultY).to.eql([0, 3]);
    });

    it("calculates a stacked domain from data with negative and positive values", () => {
      const props = {data: mixedData, stacked: true, x: "x", y: "y"};
      const domainResultX = Helpers.getDomain(props, "x");
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = Helpers.getDomain(props, "y");
      expect(domainResultY).to.eql([-3, 4]);
    });
  });

  describe("getBarPosition", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Helpers, "getYOffset");
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
      expect(Helpers.getYOffset).not.called;
      expect(Helpers.adjustX).calledWith(data, index.seriesIndex, calculatedProps).and.returned(1);
      expect(barPosition).to.eql({independent: 10, dependent0: 0, dependent1: 10});
    });

    it("should not adjustX if the data is stacked and doesn't contain categories", () => {
      const calculatedProps = {scale, domain, range, style, datasets, stacked: true};
      const data = {x: 1, y: 2};
      const index = {seriesIndex: 2, barIndex: 0};
      const barPosition = Helpers.getBarPosition(data, index, calculatedProps);
      expect(Helpers.adjustX).notCalled;
      expect(Helpers.getYOffset).calledWith(data, index, calculatedProps).and.returned(1);
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
