import React from "react";

import { VictoryPortal } from "../victory-portal/victory-portal";
import * as Domain from "./domain";

describe("victory-util/domain", () => {
  describe("createDomainFunction", () => {
    it("returns a function equivalent to getDomain when no props are given", () => {
      const props = {
        x: "x",
        y: "y",
        domain: { y: [1, 2] },
        data: [
          { x: 1, y: 3 },
          { x: 3, y: 5 },
        ],
      };
      const domainGetter = Domain.createDomainFunction();
      expect(domainGetter(props, "x")).toEqual(Domain.getDomain(props, "x"));
    });

    it("returns a function that uses a custom getDomainFromData function when given", () => {
      const props = {
        x: "x",
        y: "y",
        data: [
          { x: 1, y: 3 },
          { x: 3, y: 5 },
        ],
      };
      const getDomainFromData = () => [0, 10];
      const domainGetter = Domain.createDomainFunction(getDomainFromData);
      expect(domainGetter(props, "x")).toEqual([0, 10]);
    });

    it("returns a function that uses a custom formatDomain function when given", () => {
      const props = { domain: [0, 1] };
      const formatDomain = () => [0, 10];
      const domainGetter = Domain.createDomainFunction(null, formatDomain);
      expect(domainGetter(props, "x")).toEqual([0, 10]);
    });
  });

  describe("formatDomain", () => {
    const baseProps = { width: 100, height: 100, padding: 0 };
    it("returns the domain when no domain padding is specified", () => {
      const domain = [0, 1];
      const paddedDomain = Domain.formatDomain(domain, baseProps, "x");
      expect(paddedDomain).toEqual(domain);
    });

    it("pads the domain a particular number of pixels", () => {
      const domain = [0, 100];
      const padding = [5, 10, 20];
      padding.forEach((pad) => {
        const domainPadding = { x: pad };
        const props = { ...baseProps, domainPadding };
        const paddedDomain = Domain.formatDomain(domain, props, "x");
        const adjustedDomain = domain[1] + pad;
        const adjustedPercent =
          adjustedDomain / (baseProps.width - baseProps.padding);
        const totalPadding = adjustedPercent * pad;
        expect(paddedDomain).toEqual([0, domain[1] + totalPadding]);
      });
    });

    it("filters zero from the domain for log scales", () => {
      const verySmallNumber = 1 / Number.MAX_SAFE_INTEGER;
      const props = { scale: { y: "log" } };
      const formattedDomain = Domain.formatDomain([0, 1], props, "y");
      expect(formattedDomain).toEqual([verySmallNumber, 1]);
    });
  });

  describe("getDomain", () => {
    it("gets the domain from props if they exist", () => {
      const props = { domain: [1, 2] };
      const resultDomain = Domain.getDomain(props, "x");
      expect(resultDomain).toEqual(props.domain);
    });

    it("gets the domain from data if props don't exist for a particular axis", () => {
      const props = {
        x: "x",
        y: "y",
        domain: { y: [1, 2] },
        data: [
          { x: 1, y: 3 },
          { x: 3, y: 5 },
        ],
      };
      const resultDomain = Domain.getDomain(props, "x");
      expect(resultDomain).toEqual([1, 3]);
    });
  });

  describe("getDomainFromCategories", () => {
    it("calculates a domain from categories for the independent axis", () => {
      const props = { categories: [1, 2, 3] };
      const domainResult = Domain.getDomainFromCategories(props, "x");
      expect(domainResult).toEqual([1, 3]);
    });

    it("calculates a domain from categories for the dependent axis", () => {
      const props = { categories: { y: [1, 2, 3] } };
      const domainResult = Domain.getDomainFromCategories(props, "y");
      expect(domainResult).toEqual([1, 3]);
    });

    it("calculates a domain from string categories", () => {
      const props = { categories: { x: ["cats", "kittens"] } };
      const domainResult = Domain.getDomainFromCategories(props, "x");
      expect(domainResult).toEqual([1, 2]);
    });
  });

  describe("getDomainFromData", () => {
    it("returns a domain from a dataset", () => {
      const dataset = [
        { _x: 1, _y: 3 },
        { _x: 3, _y: 5 },
      ];
      const resultDomain = Domain.getDomainFromData({}, "x", dataset);
      expect(resultDomain).toEqual([1, 3]);
    });
  });

  describe("getDomainFromProps", () => {
    it("gets the domain from a domain array", () => {
      const props = { domain: [1, 2] };
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).toEqual(props.domain);
    });

    it("gets the domain from a domain object", () => {
      const props = { domain: { x: [1, 2] } };
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).toEqual(props.domain.x);
    });

    it("returns undefined if the domain props is not given", () => {
      expect(Domain.getDomainFromProps({}, "x")).toBeUndefined();
    });

    it("returns undefined if the domain for a given axis is not defined", () => {
      const props = { domain: { y: [1, 2] } };
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).toBeUndefined();
    });

    it("returns a domain from minDomain and maxDomain if both are defined", () => {
      const props = { minDomain: 1, maxDomain: 10 };
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).toEqual([1, 10]);
    });

    it("returns an adjusted domain if minDomain equals maxDomain", () => {
      const props = { minDomain: 1, maxDomain: 1 };
      const verySmallNumber = Math.pow(10, -10);
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).toEqual([1 - verySmallNumber, 1 + verySmallNumber]);
    });

    it("returns undefined if only minDomain is defined", () => {
      const props = { minDomain: 1 };
      const resultDomain = Domain.getDomainFromProps(props, "x");
      expect(resultDomain).toBeUndefined();
    });
  });

  describe("getDomainFromMinMax", () => {
    it("returns a min max array when min and max are given", () => {
      const min = 1;
      const max = 2;
      const resultDomain = Domain.getDomainFromMinMax(min, max);
      expect(resultDomain).toEqual([min, max]);
    });

    it("returns an adjusted domain if min equals max", () => {
      const min = 1;
      const max = 1;
      const verySmallNumber = Math.pow(10, -10);
      const resultDomain = Domain.getDomainFromMinMax(min, max);
      expect(resultDomain).toEqual([1 - verySmallNumber, 1 + verySmallNumber]);
    });

    it("returns a positive domain if min and max are both zero", () => {
      const min = 0;
      const max = 0;
      const verySmallNumber = Math.pow(10, -10);
      const resultDomain = Domain.getDomainFromMinMax(min, max);
      expect(resultDomain).toEqual([0, 2 * verySmallNumber]);
    });

    it("returns an adjusted date domain if min equals max", () => {
      const min = new Date(1980, 1, 1);
      const max = new Date(1980, 1, 1);
      const resultDomain = Domain.getDomainFromMinMax(min, max);
      expect(resultDomain).toEqual([
        new Date(Number(min) - 1),
        new Date(Number(max) + 1),
      ]);
    });
  });

  describe("getDomainWithZero", () => {
    it("ensures that the domain includes zero for the dependent axis", () => {
      const props = {
        data: [
          { x: 1, y: 3 },
          { x: 3, y: 5 },
        ],
      };
      const resultDomain = Domain.getDomainWithZero(props, "y");
      expect(resultDomain).toEqual([0, 5]);
    });

    it("allows minimum domain values less than zero", () => {
      const props = {
        data: [
          { x: 1, y: -3 },
          { x: 3, y: 5 },
        ],
      };
      const resultDomain = Domain.getDomainWithZero(props, "y");
      expect(resultDomain).toEqual([-3, 5]);
    });

    it("allows explicit y0 values in props.data to set the minimum domain", () => {
      const props = {
        data: [
          { x: 1, y: 3, y0: 2 },
          { x: 3, y: 5, y0: 3 },
        ],
      };
      const resultDomain = Domain.getDomainWithZero(props, "y");
      expect(resultDomain).toEqual([2, 5]);
    });

    it("handles negative y0 values", () => {
      const props = {
        data: [
          { x: 1, y: -3, y0: -7 },
          { x: 3, y: -5, y0: -7 },
        ],
      };
      const resultDomain = Domain.getDomainWithZero(props, "y");
      expect(resultDomain).toEqual([-7, -3]);
    });

    it("respects props.minDomain when present", () => {
      const props = {
        data: [
          { x: 1, y: 3, y0: 2 },
          { x: 3, y: 5, y0: 2 },
        ],
        minDomain: { y: 4 },
      };
      const resultDomain = Domain.getDomainWithZero(props, "y");
      expect(resultDomain).toEqual([4, 5]);
    });

    it("does not force the independent domain to include zero", () => {
      const props = {
        data: [
          { x: 1, y: 3 },
          { x: 3, y: 5 },
        ],
      };
      const resultDomain = Domain.getDomainWithZero(props, "x");
      expect(resultDomain).toEqual([1, 3]);
    });
  });

  describe("getMaxFromProps", () => {
    it("returns maxDomain from props as an object", () => {
      const props = { maxDomain: { x: 3 } };
      const maxDomain = Domain.getMaxFromProps(props, "x");
      expect(maxDomain).toEqual(props.maxDomain.x);
    });

    it("returns maxDomain from props as a number", () => {
      const props = { maxDomain: 3 };
      const maxDomain = Domain.getMaxFromProps(props, "x");
      expect(maxDomain).toEqual(props.maxDomain);
    });

    it("returns undefined when maxDomain is not defined for a given axis", () => {
      const props = { maxDomain: { y: 3 } };
      const maxDomain = Domain.getMaxFromProps(props, "x");
      expect(maxDomain).toBeUndefined();
    });
  });

  describe("getMinFromProps", () => {
    it("returns minDomain from props as an object", () => {
      const props = { minDomain: { x: 3 } };
      const minDomain = Domain.getMinFromProps(props, "x");
      expect(minDomain).toEqual(props.minDomain.x);
    });

    it("returns minDomain from props as a number", () => {
      const props = { minDomain: 3 };
      const minDomain = Domain.getMinFromProps(props, "x");
      expect(minDomain).toEqual(props.minDomain);
    });

    it("returns undefined when minDomain is not defined for a given axis", () => {
      const props = { minDomain: { y: 3 } };
      const minDomain = Domain.getMinFromProps(props, "x");
      expect(minDomain).toBeUndefined();
    });
  });

  describe("getSymmetricDomain", () => {
    it("pads the domain by a value determined by data spacing", () => {
      const domain = [0, 10];
      const data = [2, 4, 6, 8];
      const resultDomain = Domain.getSymmetricDomain(domain, data);
      expect(resultDomain).toEqual([0, 12]);
    });
  });

  describe("isDomainComponent", () => {
    class TestDomainComponent extends React.Component {
      static role = "area";
    }
    it("returns true when a component has a static role matching a whitelist", () => {
      expect(Domain.isDomainComponent(<TestDomainComponent />)).toBe(true);
    });

    it("returns false when a component has a role that does not match the whitelist", () => {
      // eslint-disable-next-line react/no-multi-comp
      class TestFooComponent extends React.Component {
        static role = "foo";
      }
      expect(Domain.isDomainComponent(<TestFooComponent />)).toBe(false);
    });

    it("returns true when a domain component is wrapped in VictoryPortal", () => {
      expect(
        Domain.isDomainComponent(
          <VictoryPortal>
            <TestDomainComponent />
          </VictoryPortal>,
        ),
      ).toBe(true);
    });
  });
});
