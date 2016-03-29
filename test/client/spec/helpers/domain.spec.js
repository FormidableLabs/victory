/* eslint no-unused-expressions: 0 */
/* global sinon */

import Domain from "src/helpers/domain";
import Data from "src/helpers/data";
import Axis from "src/helpers/axis";

describe("helpers/domain", () => {
  describe("padDomain", () => {
    const baseProps = {width: 100, height: 100, padding: 0};
    it("returns the domain when no domain padding is specified", () => {
      const domain = [0, 1];
      const paddedDomain = Domain.padDomain(domain, baseProps, "x");
      expect(paddedDomain).to.eql(domain);
    });

    it("pads the domain a particular number of pixels", () => {
      const domain = [0, 100];
      const domainPadding = {x: 10};
      const props = {...baseProps, domainPadding};
      const paddedDomain = Domain.padDomain(domain, props, "x");
      expect(paddedDomain).to.eql([0, 110]);
    });
  });

  describe("orientDomain", () => {
    const domain = [0, 10];
    const reversedDomain = [10, 0];
    it("returns a domain for standard orientations", () => {
      const orientations = {x: "bottom", y: "left"};
      const domainResult = Domain.orientDomain(domain, orientations, "x");
      expect(domainResult).to.eql(domain);
    });

    it("reverses a domain for non-standard orientations", () => {
      const orientations = {x: "top", y: "right"};
      const domainResult = Domain.orientDomain(domain, orientations, "x");
      expect(domainResult).to.eql(reversedDomain);
    });

    it("reverses a domain for flipped axes", () => {
      const orientations = {x: "right", y: "bottom"};
      const domainResult = Domain.orientDomain(domain, orientations, "x");
      expect(domainResult).to.eql(reversedDomain);
    });
  });

  describe("getDomain", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Domain, "getDomainFromProps");
      sandbox.spy(Domain, "getDomainFromData");
    });
    afterEach(() => {
      sandbox.restore();
    });

    it("gets the domain from props if they exist", () => {
      const props = {domain: [1, 2]};
      const resultDomain = Domain.getDomain(props, "x");
      expect(Domain.getDomainFromProps).calledWith(props, "x").and.returned(props.domain);
      expect(Domain.getDomainFromData).not.called;
      expect(resultDomain).to.eql(props.domain);
    });

    it("gets the domain from data if props don't exist for a particular axis", () => {
      const props = {x: "x", y: "y", domain: {y: [1, 2]}, data: [{x: 1, y: 3}, {x: 3, y: 5}]};
      const resultDomain = Domain.getDomain(props, "x");
      const dataset = Data.getData(props);
      expect(Domain.getDomainFromProps).calledWith(props, "x").and.returned(undefined);
      expect(Domain.getDomainFromData).calledWith(dataset, "x").and.returned([1, 3]);
      expect(resultDomain).to.eql([1, 3]);
    });
  });

  describe("getDomainFromProps", () => {
    it("gets the domain from a domain array", () => {
      const props = {domain: [1, 2]};
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).to.eql(props.domain);
    });

    it("gets the domain from a domain object", () => {
      const props = {domain: {x: [1, 2]}};
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).to.eql(props.domain.x);
    });

    it("returns undefined if the domain props is not given", () => {
      expect(Domain.getDomainFromProps({}, "x")).to.eql(undefined);
    });

    it("returns undefined if the domain for a given axis is not defined", () => {
      const props = {domain: {y: [1, 2]}};
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).to.eql(undefined);
    });
  });

  describe("getDomainFromData", () => {
    it("returns a domain from a dataset", () => {
      const dataset = [{x: 1, y: 3}, {x: 3, y: 5}];
      const resultDomain = Domain.getDomainFromData(dataset, "x");
      expect(resultDomain).to.eql([1, 3]);
    });
  });

  describe("getDomainFromTickValues", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Axis, "isVertical");
      sandbox.spy(Axis, "stringTicks");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("determines a domain from tickValues", () => {
      const props = {tickValues: [1, 2, 3]};
      const domainResult = Domain.getDomainFromTickValues(props);
      expect(Axis.stringTicks).calledWith(props).and.returned(false);
      expect(Axis.isVertical).calledWith(props).and.returned(false);
      expect(domainResult).to.eql([1, 3]);
    });

    it("determines a domain from string tick values", () => {
      const props = {tickValues: ["a", "b", "c", "d"]};
      const domainResult = Domain.getDomainFromTickValues(props);
      expect(Axis.stringTicks).calledWith(props).and.returned(true);
      expect(Axis.isVertical).calledWith(props).and.returned(false);
      expect(domainResult).to.eql([1, 4]);
    });

    it("reverses a domain from tickValues when the axis is vertical", () => {
      const props = {tickValues: [1, 2, 3], dependentAxis: true};
      const domainResult = Domain.getDomainFromTickValues(props);
      expect(Axis.stringTicks).calledWith(props).and.returned(false);
      expect(Axis.isVertical).calledWith(props).and.returned(true);
      expect(domainResult).to.eql([3, 1]);
    });
  });

  describe("getDomainFromGroupedData", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Domain, "getDomainFromData");
      sandbox.spy(Domain, "getDomainFromCategories");
      sandbox.spy(Domain, "getCumulativeData");
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
      const props = {categories: [1, 2, 3], data, x: "x", y: "y"};
      const domainResultX = Domain.getDomainFromGroupedData(props, "x", data);
      expect(Domain.getDomainFromCategories).calledWith(props, "x").and.returned([1, 3]);
      expect(Domain.getDomainFromData).not.called;
      expect(Domain.getCumulativeData).not.called;
      expect(domainResultX).to.eql([1, 3]);
    });

    it("calculates a stacked domain for the dependent axis", () => {
      const props = {categories: [1, 2, 3], data, x: "x", y: "y"};
      const domainResultY = Domain.getDomainFromGroupedData(props, "y", data);
      expect(Domain.getDomainFromData).calledOnce.and.returned([0, 2]);
      expect(Domain.getCumulativeData).calledOnce;
      expect(domainResultY).to.eql([0, 3]);
    });
  });

  describe("getDomainFromCategories", () => {
    it("calculates a domain from categories for the independent axis", () => {
      const props = {categories: [1, 2, 3]};
      const domainResult = Domain.getDomainFromCategories(props, "x");
      expect(domainResult).to.eql([1, 3]);
    });

    it("calculates a domain from categories for the dependent axis", () => {
      const props = {categories: {y: [ 1, 2, 3]}};
      const domainResult = Domain.getDomainFromCategories(props, "y");
      expect(domainResult).to.eql([1, 3]);
    });

    it("calculates a domain from string categories", () => {
      const props = {categories: {x: ["cats", "kittens"]}};
      const domainResult = Domain.getDomainFromCategories(props, "x");
      expect(domainResult).to.eql([1, 2]);
    });
  });
});
