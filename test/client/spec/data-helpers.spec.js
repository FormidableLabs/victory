/* eslint no-unused-expressions: 0 */
/* global sinon */
import React from "react";
import DataHelpers from "src/data-helpers";
import { VictoryAxis } from "victory-axis";
import { VictoryLine } from "victory-line";
import { VictoryBar } from "victory-bar";
import { Data } from "victory-util";
import ComponentHelpers from "src/component-helpers";

describe("data-helpers", () => {
  const getVictoryLine = (props) => React.createElement(VictoryLine, props);
  describe("createStringMap", () => {
    const getVictoryAxis = (props) => React.createElement(VictoryAxis, props);
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(ComponentHelpers, "getAxisComponent");
      sandbox.spy(Data, "getStringsFromAxes");
      sandbox.spy(Data, "getStringsFromCategories");
      sandbox.spy(Data, "getStringsFromData");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns a stringMap from axis tickValues", () => {
      const axisComponent = getVictoryAxis({tickValues: ["a", "b", "c"]});
      const childComponents = [axisComponent];
      const stringResult = DataHelpers.createStringMap(childComponents, "x");
      expect(ComponentHelpers.getAxisComponent).calledWith(childComponents, "x")
        .and.returned(axisComponent);
      expect(Data.getStringsFromAxes).calledWith(axisComponent.props, "x")
        .and.returned(["a", "b", "c"]);
      expect(Data.getStringsFromCategories).calledWith(axisComponent.props, "x").and.returned([]);
      expect(Data.getStringsFromData).calledWith(axisComponent.props, "x").and.returned([]);
      expect(stringResult).to.eql({a: 1, b: 2, c: 3});
    });

    it("returns a stringMap from axis tickValues, and string data", () => {
      const axisComponent = getVictoryAxis({tickValues: ["a", "b", "c"]});
      const lineComponent = getVictoryLine({data: [
        {x: "b", y: 1}, {x: "c", y: 1}, {x: "d", y: 1}
      ]});
      const childComponents = [axisComponent, lineComponent];
      const stringResult = DataHelpers.createStringMap(childComponents, "x");

      expect(ComponentHelpers.getAxisComponent).calledWith(childComponents, "x")
        .and.returned(axisComponent);
      expect(Data.getStringsFromAxes).calledWith(axisComponent.props, "x")
        .and.returned(["a", "b", "c"]);
      expect(Data.getStringsFromCategories).calledWith(axisComponent.props, "x").and.returned([]);
      expect(Data.getStringsFromCategories).calledWith(lineComponent.props, "x").and.returned([]);
      expect(Data.getStringsFromData).calledWith(axisComponent.props, "x").and.returned([]);
      expect(Data.getStringsFromData).calledWith(lineComponent.props, "x")
        .and.returned(["b", "c", "d"]);
      expect(stringResult).to.eql({a: 1, b: 2, c: 3, d: 4});
    });
  });

  describe("getCategories", () => {
    const getVictoryBar = (props) => React.createElement(VictoryBar, props);
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(ComponentHelpers, "getDataComponents");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns a set of categories from a component", () => {
      const victoryBar = getVictoryBar({categories: [1, 2, 3]});
      const childComponents = [victoryBar];
      const categoryResult = DataHelpers.getCategories(childComponents);
      expect(ComponentHelpers.getDataComponents).calledWith(childComponents, "grouped")
        .and.returned([victoryBar]);
      expect(categoryResult).to.eql(victoryBar.props.categories);
    });

    it("returns undefined if no categories are defined", () => {
      const victoryBar = getVictoryBar({});
      const childComponents = [victoryBar];
      const categoryResult = DataHelpers.getCategories(childComponents);
      expect(ComponentHelpers.getDataComponents).calledWith(childComponents, "grouped")
        .and.returned([victoryBar]);
      expect(categoryResult).to.be.undefined;
    });

    it("returns undefined if no grouped data components are found", () => {
      const victoryLine = getVictoryLine({});
      const childComponents = [victoryLine];
      const categoryResult = DataHelpers.getCategories(childComponents);
      expect(ComponentHelpers.getDataComponents).calledWith(childComponents, "grouped")
        .and.returned([]);
      expect(categoryResult).to.be.undefined;
    });
  });
});
