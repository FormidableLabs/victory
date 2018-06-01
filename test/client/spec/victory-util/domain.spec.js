/* eslint no-unused-expressions: 0 */
/* eslint max-nested-callbacks: 0 */

import { Domain } from "src/index";

describe("helpers/domain", () => {
  describe("padDomain", () => {
    const baseProps = { width: 100, height: 100, padding: 0 };
    it("returns the domain when no domain padding is specified", () => {
      const domain = [0, 1];
      const paddedDomain = Domain.padDomain(domain, baseProps, "x");
      expect(paddedDomain).to.eql(domain);
    });

    it("pads the domain a particular number of pixels", () => {
      const domain = [0, 100];
      const padding = [5, 10, 20];
      padding.forEach((pad) => {
        const domainPadding = { x: pad };
        const props = { ...baseProps, domainPadding };
        const paddedDomain = Domain.padDomain(domain, props, "x");
        const percentPad = pad / baseProps.width;
        const totalPadding = (domain[1] * (1 + percentPad)) * percentPad;
        expect(paddedDomain).to.eql([0, domain[1] + totalPadding]);
      }
      );
    });
  });

  describe("getDomain", () => {
    it("gets the domain from props if they exist", () => {
      const props = { domain: [1, 2] };
      const resultDomain = Domain.getDomain(props, "x");
      expect(resultDomain).to.eql(props.domain);
    });

    it("gets the domain from data if props don't exist for a particular axis", () => {
      const props = {
        x: "x", y: "y", domain: { y: [1, 2] }, data: [{ x: 1, y: 3 }, { x: 3, y: 5 }]
      };
      const resultDomain = Domain.getDomain(props, "x");
      expect(resultDomain).to.eql([1, 3]);
    });
  });

  describe("getDomainFromProps", () => {
    it("gets the domain from a domain array", () => {
      const props = { domain: [1, 2] };
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).to.eql(props.domain);
    });

    it("gets the domain from a domain object", () => {
      const props = { domain: { x: [1, 2] } };
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).to.eql(props.domain.x);
    });

    it("returns undefined if the domain props is not given", () => {
      expect(Domain.getDomainFromProps({}, "x")).to.eql(undefined);
    });

    it("returns undefined if the domain for a given axis is not defined", () => {
      const props = { domain: { y: [1, 2] } };
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).to.eql(undefined);
    });

    it("returns a domain from minDomain and maxDomain if both are defined", () => {
      const props = { minDomain: 1, maxDomain: 10 };
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).to.eql([1, 10]);
    });

    it("returns an adjusted domain if minDomain equals maxDomain", () => {
      const props = { minDomain: 0, maxDomain: 0 };
      const verySmallNumber = Math.pow(10, -10);
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).to.eql([-1 * verySmallNumber, verySmallNumber]);
    });

    it("returns undefined if only minDomain is defined", () => {
      const props = { minDomain: 1 };
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).to.eql(undefined);
    });
  });

  describe("getDomainFromMinMax", () => {
    it("returns a min max array when min and max are given", () => {
      const min = 1;
      const max = 2;
      const resultDomain = Domain.getDomainFromMinMax(min, max);
      expect(resultDomain).to.eql([min, max]);
    });

    it("returns an adjusted domain if min equals max", () => {
      const min = 0;
      const max = 0;
      const verySmallNumber = Math.pow(10, -10);
      const resultDomain = Domain.getDomainFromMinMax(min, max);
      expect(resultDomain).to.eql([-1 * verySmallNumber, verySmallNumber]);
    });

    it("returns an adjusted date domain if min equals max", () => {
      const min = new Date(1980, 1, 1);
      const max = new Date(1980, 1, 1);
      const resultDomain = Domain.getDomainFromMinMax(min, max);
      expect(resultDomain).to.eql([
        new Date(+min - 1), new Date(+max + 1)
      ]);
    });
  });

  describe("getDomainFromData", () => {
    it("returns a domain from a dataset", () => {
      const dataset = [{ _x: 1, _y: 3 }, { _x: 3, _y: 5 }];
      const resultDomain = Domain.getDomainFromData({}, "x", dataset);
      expect(resultDomain).to.eql([1, 3]);
    });
  });

  describe("getDomainFromTickValues", () => {
    it("determines a domain from tickValues", () => {
      const props = { tickValues: [1, 2, 3] };
      const domainResult = Domain.getDomainFromTickValues(props);
      expect(domainResult).to.eql([1, 3]);
    });

    it("determines a domain from string tick values", () => {
      const props = { tickValues: ["a", "b", "c", "d"] };
      const domainResult = Domain.getDomainFromTickValues(props);
      expect(domainResult).to.eql([1, 4]);
    });

    it("reverses a domain from tickValues when the axis is vertical", () => {
      const props = { tickValues: [1, 2, 3], dependentAxis: true };
      const domainResult = Domain.getDomainFromTickValues(props);
      expect(domainResult).to.eql([3, 1]);
    });
  });

  describe("getDomainFromGroupedData", () => {
    const data = [
      [{ _x: 1, _y: 0 }, { _x: 2, _y: 0 }, { _x: 3, _y: 0 }],
      [{ _x: 1, _y: 1 }, { _x: 2, _y: 1 }, { _x: 3, _y: 1 }],
      [{ _x: 1, _y: 2 }, { _x: 2, _y: 2 }, { _x: 3, _y: 2 }]
    ];

    it("calculates a domain from categories for the independent axis", () => {
      const props = { categories: [1, 2, 3], data, x: "x", y: "y" };
      const domainResultX = Domain.getDomainFromGroupedData(props, "x", data);
      expect(domainResultX).to.eql([1, 3]);
    });

    it("calculates a stacked domain for the dependent axis", () => {
      const props = { categories: [1, 2, 3], data, x: "x", y: "y" };
      const domainResultY = Domain.getDomainFromGroupedData(props, "y", data);
      expect(domainResultY).to.eql([0, 3]);
    });
  });

  describe("getDomainFromCategories", () => {
    it("calculates a domain from categories for the independent axis", () => {
      const props = { categories: [1, 2, 3] };
      const domainResult = Domain.getDomainFromCategories(props, "x");
      expect(domainResult).to.eql([1, 3]);
    });

    it("calculates a domain from categories for the dependent axis", () => {
      const props = { categories: { y: [ 1, 2, 3] } };
      const domainResult = Domain.getDomainFromCategories(props, "y");
      expect(domainResult).to.eql([1, 3]);
    });

    it("calculates a domain from string categories", () => {
      const props = { categories: { x: ["cats", "kittens"] } };
      const domainResult = Domain.getDomainFromCategories(props, "x");
      expect(domainResult).to.eql([1, 2]);
    });
  });
});
