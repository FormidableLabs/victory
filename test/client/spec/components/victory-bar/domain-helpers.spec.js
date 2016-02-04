/* eslint no-unused-expressions: 0 */
/* global sinon */
import DomainHelpers from "src/components/victory-bar/domain-helpers";

describe("domain-helpers", () => {
  describe("getDomain", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(DomainHelpers, "getDomainFromGroupedData");
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
      const domainResultX = DomainHelpers.getDomain(props, "x");
      expect(DomainHelpers.getDomainFromGroupedData).notCalled;
      expect(domainResultX).to.eql([1, 2]);
      const domainResultY = DomainHelpers.getDomain(props, "y");
      expect(DomainHelpers.getDomainFromGroupedData).notCalled;
      expect(domainResultY).to.eql([2, 3]);
    });

    it("calculates a domain from data", () => {
      const props = {data, grouped: true, x: "x", y: "y"};
      const domainResultX = DomainHelpers.getDomain(props, "x");
      expect(DomainHelpers.getDomainFromGroupedData).calledWith(props, "x")
        .and.returned([1, 3]);
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = DomainHelpers.getDomain(props, "y");
      expect(DomainHelpers.getDomainFromGroupedData).calledWith(props, "y")
        .and.returned([0, 2]);
      expect(domainResultY).to.eql([0, 2]);
    });

    it("calculates a domain from data with negative and positive values", () => {
      const props = {data: mixedData, grouped: true, x: "x", y: "y"};
      const domainResultX = DomainHelpers.getDomain(props, "x");
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = DomainHelpers.getDomain(props, "y");
      expect(domainResultY).to.eql([-2, 3]);
    });

    it("the domain of the dependent axis should always contain zero", () => {
      const props = {data: noZero, grouped: true, x: "x", y: "y"};
      const domainResultX = DomainHelpers.getDomain(props, "x");
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = DomainHelpers.getDomain(props, "y");
      expect(domainResultY).to.eql([0, 3]);
    });

    it("calculates a stacked domain", () => {
      const props = {data, stacked: true, x: "x", y: "y"};
      const domainResultX = DomainHelpers.getDomain(props, "x");
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = DomainHelpers.getDomain(props, "y");
      expect(domainResultY).to.eql([0, 3]);
    });

    it("calculates a stacked domain from data with negative and positive values", () => {
      const props = {data: mixedData, stacked: true, x: "x", y: "y"};
      const domainResultX = DomainHelpers.getDomain(props, "x");
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = DomainHelpers.getDomain(props, "y");
      expect(domainResultY).to.eql([-3, 4]);
    });
  });

  describe("getDomainFromGroupedData", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(DomainHelpers, "getDomainFromData");
      sandbox.spy(DomainHelpers, "getDomainFromCategories");
      sandbox.spy(DomainHelpers, "getCumulativeData");
      sandbox.spy(DomainHelpers, "isStacked");
    });

    afterEach(() => {
      sandbox.restore();
    });

    const data = [
      [{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
      [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
      [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}]
    ];

    it("calculates a domain from categories for the independent axis", () => {
      const props = {categories: [1, 2, 3], data, grouped: true, x: "x", y: "y"};
      const domainResultX = DomainHelpers.getDomainFromGroupedData(props, "x");
      expect(DomainHelpers.getDomainFromCategories).calledWith(props, "x").and.returned([1, 3]);
      expect(DomainHelpers.getDomainFromData).not.called;
      expect(DomainHelpers.getCumulativeData).not.called;
      expect(DomainHelpers.isStacked).not.called;
      expect(domainResultX).to.eql([1, 3]);
    });

    it("does not calculate a domain from categories the dependent axis", () => {
      const props = {categories: [1, 2, 3], data, grouped: true, x: "x", y: "y"};
      const domainResultY = DomainHelpers.getDomainFromGroupedData(props, "y");
      expect(DomainHelpers.getDomainFromData).calledOnce.and.returned([0, 2]);
      expect(domainResultY).to.eql([0, 2]);
    });

    it("does not calculate cumulative data if the bars are not stacked", () => {
      const props = {data, grouped: true, x: "x", y: "y"};
      const domainResultY = DomainHelpers.getDomainFromGroupedData(props, "y");
      expect(DomainHelpers.getDomainFromData).calledOnce.and.returned([0, 2]);
      expect(DomainHelpers.isStacked).calledWith(props, "y").and.returned(false);
      expect(DomainHelpers.getCumulativeData).not.called;
      expect(domainResultY).to.eql([0, 2]);
    });

    it("does not calculate cumulative data for a single data set", () => {
      const props = {data: data[1], x: "x", y: "y"};
      const domainResultY = DomainHelpers.getDomainFromGroupedData(props, "y");
      expect(DomainHelpers.getDomainFromData).calledOnce.and.returned([0, 1]);
      expect(DomainHelpers.isStacked).calledWith(props, "y").and.returned(false);
      expect(DomainHelpers.getCumulativeData).not.called;
      expect(domainResultY).to.eql([0, 1]);
    });
  });

  describe("getDomainFromCategories", () => {
    it("calculates a domain from categories for the independent axis", () => {
      const props = {categories: [1, 2, 3]};
      const domainResult = DomainHelpers.getDomainFromCategories(props, "x");
      expect(domainResult).to.eql([1, 3]);
    });

    it("does not calculate a domain from categories for the dependent axis", () => {
      const props = {categories: [1, 2, 3]};
      const domainResult = DomainHelpers.getDomainFromCategories(props, "y");
      expect(domainResult).to.be.undefined;
    });

    it("calculates a domain from string categories", () => {
      const props = {categories: ["cats", "kittens"]};
      const domainResult = DomainHelpers.getDomainFromCategories(props, "x");
      expect(domainResult).to.eql([1, 2]);
    });

    it("calculates a domain from  category bands", () => {
      const props = {categories: [[0, 2], [3, 5]]};
      const domainResult = DomainHelpers.getDomainFromCategories(props, "x");
      expect(domainResult).to.eql([0, 5]);
    });
  });

  describe("getDomainFromData", () => {
    const data = [
      [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
      [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
      [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}]
    ];

    it("calculates a domain from data for the independent axis", () => {
      const domainResult = DomainHelpers.getDomainFromData(data, "x");
      expect(domainResult).to.eql([1, 3]);
    });

    it("ensure that the domain for the dependent axis includes zero", () => {
      const domainResult = DomainHelpers.getDomainFromData(data, "y");
      expect(domainResult).to.eql([0, 3]);
    });
  });

  describe("shouldGroup", () => {
    it("true if grouped prop is true", () => {
      expect(DomainHelpers.shouldGroup({grouped: true})).to.eql(true);
    });
    it("false if grouped prop is false", () => {
      expect(DomainHelpers.shouldGroup({grouped: false})).to.eql(false);
    });
    it("true if grouped is undefined, data is array-of-arrays, & accessors are default", () => {
      const grouped = DomainHelpers.shouldGroup(
        {data: [[{x: 0, y: 1}], [{x: 3, y: 4}]], x: "x", y: "y"}
      );
      expect(grouped).to.eql(true);
    });
  });
});
