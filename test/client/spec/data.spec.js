/* eslint no-unused-expressions: 0 */
/* global sinon */

import Data from "src/data";

describe("data", () => {
  describe("createStringMap", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Data, "getStringsFromAxes");
      sandbox.spy(Data, "getStringsFromCategories");
      sandbox.spy(Data, "getDataStrings");
    });
    afterEach(() => {
      sandbox.restore();
    });

    const tickValues = ["one", "two", "three"];
    const categories = ["red", "green", "blue"];
    const data = [{x: "one", y: 1}, {x: "red", y: 2}, {x: "cat", y: 3}];
    it("returns a string map from strings in tickValues", () => {
      const props = {tickValues};
      const stringMap = Data.createStringMap(props, "x");
      expect(Data.getStringsFromAxes).calledWith(props, "x");
      expect(Data.getStringsFromAxes).to.have.returned(["one", "two", "three"]);
      expect(stringMap).to.eql({ one: 1, two: 2, three: 3 });
    });

    it("returns a string map from strings in categories", () => {
      const props = {categories};
      const stringMap = Data.createStringMap(props, "x");
      expect(Data.getStringsFromCategories).calledWith(props, "x");
      expect(Data.getStringsFromCategories).to.have.returned(["red", "green", "blue"]);
      expect(stringMap).to.eql({ red: 1, green: 2, blue: 3 });
    });

    it("returns a string map from strings in data", () => {
      const props = {data};
      const stringMap = Data.createStringMap(props, "x");
      expect(Data.getDataStrings).calledWith(props, "x");
      expect(Data.getDataStrings).to.have.returned(["one", "red", "cat"]);
      expect(stringMap).to.eql({ one: 1, red: 2, cat: 3 });
    });

    it("a unique set of values is returned from multiple sources", () => {
      const props = {tickValues, data};
      const stringMap = Data.createStringMap(props, "x");
      expect(Data.getStringsFromAxes).to.have.returned(["one", "two", "three"]);
      expect(Data.getDataStrings).to.have.returned(["one", "red", "cat"]);
      expect(stringMap).to.eql({ one: 1, two: 2, three: 3, red: 4, cat: 5 });
    });
  });

  describe("getDataStrings", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Data, "getStringsFromData");
      sandbox.spy(Data, "getStringsFromXY");
    });
    afterEach(() => {
      sandbox.restore();
    });

    it("returns an array of strings from a data prop", () => {
      const props = {data: [{x: "one", y: 1}, {x: "red", y: 2}, {x: "cat", y: 3}]};
      const dataStrings = Data.getDataStrings(props, "x");
      expect(Data.getStringsFromData).calledWith(props, "x").and.returned(["one", "red", "cat"]);
      expect(Data.getStringsFromXY).calledWith(props, "x").and.returned([]);
      expect(dataStrings).to.eql(["one", "red", "cat"]);
    });

    it("returns an array of strings from a single axis data array", () => {
      const props = {x: ["red", "blue"]};
      const dataStrings = Data.getDataStrings(props, "x");
      expect(Data.getStringsFromData).calledWith(props, "x").and.returned([]);
      expect(Data.getStringsFromXY).calledWith(props, "x").and.returned(["red", "blue"]);
      expect(dataStrings).to.eql(["red", "blue"]);
    });

    it("returns an array of strings multiple data sources", () => {
      const props = {x: ["red", "blue"], data: [{x: "one", y: 1}, {x: "two", y: 1}]};
      const dataStrings = Data.getDataStrings(props, "x");
      expect(Data.getStringsFromData).calledWith(props, "x").and.returned(["one", "two"]);
      expect(Data.getStringsFromXY).calledWith(props, "x").and.returned(["red", "blue"]);
      expect(dataStrings).to.eql(["one", "two", "red", "blue"]);
    });

    it("returns an empty array when no data like props are defined", () => {
      const props = {};
      const dataStrings = Data.getDataStrings(props, "x");
      expect(Data.getStringsFromData).calledWith(props, "x").and.returned([]);
      expect(Data.getStringsFromXY).calledWith(props, "x").and.returned([]);
      expect(dataStrings).to.eql([]);
    });
  });

  describe("getStringsFromXY", () => {
    it("returns an array of strings", () => {
      const props = {x: [1, "three", 5]};
      expect(Data.getStringsFromXY(props, "x")).to.eql(["three"]);
    });

    it("returns an empty array when no strings are present", () => {
      const props = {x: [1, 3, 5]};
      expect(Data.getStringsFromXY(props, "x")).to.eql([]);
    });

    it("returns an empty array when the given props is undefined", () => {
      expect(Data.getStringsFromXY({}, "x")).to.eql([]);
    });
  });

  describe("getStringsFromData", () => {
    it("returns an array of strings", () => {
      const props = {data: [{x: 1, y: 1}, {x: "three", y: 3}]};
      expect(Data.getStringsFromData(props, "x")).to.eql(["three"]);
    });

    it("returns an empty array when no strings are present", () => {
      const props = {data: [{x: 1, y: 1}, {x: 3, y: 3}]};
      expect(Data.getStringsFromData(props, "x")).to.eql([]);
    });

    it("returns an empty array when the data prop is undefined", () => {
      expect(Data.getStringsFromData({}, "x")).to.eql([]);
    });
  });

  describe("getStringsFromAxes", () => {
    it("returns an array of strings when tickValues is an array", () => {
      const props = {tickValues: [1, "three", 5]};
      expect(Data.getStringsFromAxes(props, "x")).to.eql(["three"]);
    });

    it("returns an array of strings when tickValues is an object", () => {
      const props = {tickValues: { x: [1, "three", 5] }};
      expect(Data.getStringsFromAxes(props, "x")).to.eql(["three"]);
    });

    it("returns an empty array when a given axis is not defined", () => {
      const props = {tickValues: { y: [1, "three", 5] }};
      expect(Data.getStringsFromAxes(props, "x")).to.eql([]);
    });

    it("returns an empty array when no strings are present", () => {
      const props = {tickValues: [1, 3, 5]};
      expect(Data.getStringsFromAxes(props, "x")).to.eql([]);
    });

    it("returns an empty array when the tickValues prop is undefined", () => {
      expect(Data.getStringsFromAxes({}, "x")).to.eql([]);
    });
  });

  describe("getStringsFromCategories", () => {
    it("returns an array of strings when categories is an array", () => {
      const props = {categories: [1, "three", 5]};
      expect(Data.getStringsFromCategories(props, "x")).to.eql(["three"]);
    });

    it("returns an empty array when no strings are present", () => {
      const props = {categories: [1, 3, 5]};
      expect(Data.getStringsFromCategories(props, "x")).to.eql([]);
    });

    it("returns an empty array when the category prop is undefined", () => {
      expect(Data.getStringsFromCategories({}, "x")).to.eql([]);
    });
  });

  describe("consolidateData", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Data, "formatData");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns an object of data and attrs", () => {
      const data = [
        [{x: 1, y: 3}, {x: 2, y: 5}],
        [{x: 1, y: 2}, {x: 2, y: 4}]
      ];
      const dataAttributes = [{name: "a", fill: "red"}, {name: "b", fill: "blue"}];
      const props = {data, dataAttributes};
      const datasets = Data.consolidateData(props);
      expect(Data.formatData).to.be.calledWith(data, props);
      expect(datasets).to.be.an("array").and.have.length(2);
      expect(datasets[0]).to.eql({
        data: [{x: 1, y: 3}, {x: 2, y: 5}], attrs: {name: "a", fill: "red"}
      });
      expect(datasets[1]).to.eql({
        data: [{x: 1, y: 2}, {x: 2, y: 4}], attrs: {name: "b", fill: "blue"}
      });
    });
  });

  describe("formatData", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Data, "cleanData");
      sandbox.spy(Data, "determineCategoryIndex");
      sandbox.spy(Data, "getAttributes");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("formats a single dataset", () => {
      const dataset = [{x: 1, y: 3}, {x: 2, y: 5}];
      const props = {categories: [[0, 1], [2, 3]]};
      const formatted = Data.formatData(dataset, props);
      expect(Data.determineCategoryIndex).called.and.not.returned(undefined);
      expect(Data.cleanData).called.and.returned(dataset);
      expect(Data.getAttributes).not.called;
      expect(formatted).to.be.an.array;
      expect(formatted[0]).to.have.keys(["x", "y", "category"]);
    });

    it("formats a array of data sets, and adds attributes", () => {
      const dataset = [
        [{x: 1, y: 3}, {x: 2, y: 5}],
        [{x: 1, y: 2}, {x: 2, y: 4}]
      ];
      const dataAttributes = [{name: "a", fill: "red"}, {name: "b", fill: "blue"}];
      const props = {dataAttributes};
      const formatted = Data.formatData(dataset, props);
      expect(Data.determineCategoryIndex).called.and.returned(undefined);
      expect(Data.cleanData).calledTwice.and.returned(dataset[0], dataset[1]);
      expect(Data.getAttributes).calledTwice.and.returned(dataAttributes[0], dataAttributes[1]);
      expect(formatted).to.be.an("array").and.have.length(2);
      expect(formatted[0]).to.eql({
        data: [{x: 1, y: 3}, {x: 2, y: 5}], attrs: {name: "a", fill: "red"}
      });
      expect(formatted[1]).to.eql({
        data: [{x: 1, y: 2}, {x: 2, y: 4}], attrs: {name: "b", fill: "blue"}
      });
    });
  });

  describe("getData", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Data, "formatData");
      sandbox.spy(Data, "returnOrGenerateX");
      sandbox.spy(Data, "returnOrGenerateY");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("formats and returns the data prop", () => {
      const data = [{x: "kittens", y: 3}, {x: "cats", y: 5}];
      const props = {data};
      const expectedReturn = [{x: 1, xName: "kittens", y: 3}, {x: 2, xName: "cats", y: 5}];
      const returnData = Data.getData(props);
      expect(Data.formatData).calledOnce.and.returned(expectedReturn);
      expect(returnData).to.eql(expectedReturn);
    });

    it("generates a dataset from x and y data props", () => {
      const x = [1, 2];
      const y = ["red", "blue"];
      const props = {x, y};
      const expectedReturn = [{x: 1, yName: "red", y: 1}, {x: 2, yName: "blue", y: 2}];
      const returnData = Data.getData(props);
      expect(Data.returnOrGenerateX).calledOnce.and.returned([1, 2]);
      expect(Data.returnOrGenerateY).calledOnce.and.returned(["red", "blue"]);
      expect(Data.formatData).calledOnce.and.returned(expectedReturn);
      expect(returnData).to.eql(expectedReturn);
    });

    it("generates a dataset from a function", () => {
      const x = [1, 2, 3];
      const y = (data) => data * data;
      const props = {x, y};
      const expectedReturn = [{x: 1, y: 1}, {x: 2, y: 4}, {x: 3, y: 9}];
      const returnData = Data.getData(props);
      expect(Data.returnOrGenerateX).calledOnce.and.returned([1, 2, 3]);
      expect(Data.returnOrGenerateY).calledOnce.and.returned([1, 4, 9]);
      expect(Data.formatData).calledOnce.and.returned(expectedReturn);
      expect(returnData).to.eql(expectedReturn);
    });
  });
});
