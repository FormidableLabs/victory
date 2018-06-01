/* eslint no-unused-expressions: 0 */
/* eslint max-nested-callbacks: 0 */

import { Domain } from "src/index";

/*
  createDomainFunction,
  formatDomain,
  getDomain,
  getDomainFromCategories,
  getDomainFromData,
  getDomainFromGroupedData,
  getDomainFromMinMax,
  getDomainFromProps,
  getDomainWithZero,
  getMaxFromProps,
  getMinFromProps,
  getSymmetricDomain
*/

describe("helpers/domain", () => {
  describe("createDomainFunction", () => {
    it("returns a function equivalent to getDomain when no props are given", () => {
      const props = {
        x: "x", y: "y", domain: { y: [1, 2] }, data: [{ x: 1, y: 3 }, { x: 3, y: 5 }]
      };
      const domainGetter = Domain.createDomainFunction();
      expect(domainGetter(props, "x")).to.eql(Domain.getDomain(props, "x"));
    });

    it("returns a function that uses a custom getDomainFromData function when given", () => {
      const props = {
        x: "x", y: "y", data: [{ x: 1, y: 3 }, { x: 3, y: 5 }]
      };
      const getDomainFromData = () => [0, 10];
      const domainGetter = Domain.createDomainFunction(getDomainFromData);
      expect(domainGetter(props, "x")).to.eql([0, 10]);
    });

    it("returns a function that uses a custom formatDomain function when given", () => {
      const props = { domain: [0, 1] };
      const formatDomain = () => [0, 10];
      const domainGetter = Domain.createDomainFunction(null, formatDomain);
      expect(domainGetter(props, "x")).to.eql([0, 10]);
    });
  });

  describe("formatDomain", () => {
    const baseProps = { width: 100, height: 100, padding: 0 };
    it("returns the domain when no domain padding is specified", () => {
      const domain = [0, 1];
      const paddedDomain = Domain.formatDomain(domain, baseProps, "x");
      expect(paddedDomain).to.eql(domain);
    });

    it("pads the domain a particular number of pixels", () => {
      const domain = [0, 100];
      const padding = [5, 10, 20];
      padding.forEach((pad) => {
        const domainPadding = { x: pad };
        const props = { ...baseProps, domainPadding };
        const paddedDomain = Domain.formatDomain(domain, props, "x");
        const percentPad = pad / baseProps.width;
        const totalPadding = (domain[1] * (1 + percentPad)) * percentPad;
        expect(paddedDomain).to.eql([0, domain[1] + totalPadding]);
      });
    });

    it("filters zero from the domain for log scales", () => {
      const verySmallNumber = 1 / Number.MAX_SAFE_INTEGER;
      const props = { scale: { y: "log" } };
      const formattedDomain = Domain.formatDomain([0, 1], props, "y");
      expect(formattedDomain).to.eql([verySmallNumber, 1]);
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

  describe("getDomainFromData", () => {
    it("returns a domain from a dataset", () => {
      const dataset = [{ _x: 1, _y: 3 }, { _x: 3, _y: 5 }];
      const resultDomain = Domain.getDomainFromData({}, "x", dataset);
      expect(resultDomain).to.eql([1, 3]);
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

  describe("getDomainWithZero", () => {
    it("ensures that the domain includes zero for the dependent axis", () => {
      const props = {
        x: "x", y: "y", data: [{ x: 1, y: 3 }, { x: 3, y: 5 }]
      };
      const resultDomain = Domain.getDomainWithZero(props, "y");
      expect(resultDomain).to.eql([0, 5]);
    });
    it("does not force the independent domain to include zero", () => {
      const props = {
        x: "x", y: "y", data: [{ x: 1, y: 3 }, { x: 3, y: 5 }]
      };
      const resultDomain = Domain.getDomainWithZero(props, "x");
      expect(resultDomain).to.eql([1, 3]);
    });
  });

  describe("getMaxFromProps", () => {
    it("returns maxDomain from props as an object", () => {
      const props = { maxDomain: { x: 3 } };
      const maxDomain = Domain.getMaxFromProps(props, "x");
      expect(maxDomain).to.eql(props.maxDomain.x);
    });
    it("returns maxDomain from props as a number", () => {
      const props = { maxDomain: 3 };
      const maxDomain = Domain.getMaxFromProps(props, "x");
      expect(maxDomain).to.eql(props.maxDomain);
    });
    it("returns undefined when maxDomain is not defined for a given axis", () => {
      const props = { maxDomain: { y: 3 } };
      const maxDomain = Domain.getMaxFromProps(props, "x");
      expect(maxDomain).to.eql(undefined);
    });
  });

  describe("getMinFromProps", () => {
    it("returns minDomain from props as an object", () => {
      const props = { minDomain: { x: 3 } };
      const minDomain = Domain.getMinFromProps(props, "x");
      expect(minDomain).to.eql(props.minDomain.x);
    });
    it("returns minDomain from props as a number", () => {
      const props = { minDomain: 3 };
      const minDomain = Domain.getMinFromProps(props, "x");
      expect(minDomain).to.eql(props.minDomain);
    });
    it("returns undefined when minDomain is not defined for a given axis", () => {
      const props = { minDomain: { y: 3 } };
      const minDomain = Domain.getMinFromProps(props, "x");
      expect(minDomain).to.eql(undefined);
    });
  });

  describe("getSymmetricDomain", () => {
    it("pads the domain by a value determined by data spacing", () => {
      const domain = [0, 10];
      const data = [2, 4, 6, 8];
      const resultDomain = Domain.getSymmetricDomain(domain, data);
      expect(resultDomain).to.eql([0, 12]);
    });
  });
});
