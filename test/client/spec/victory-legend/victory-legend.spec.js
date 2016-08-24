/**
 * Client tests
 */
import React from "react";
import { shallow, mount } from "enzyme";
import VictoryLegend from "src/victory-legend/victory-legend";

const initialData = [{
  name: "Seria 1",
  color: "green",
  symbol: "rect"
}, {
  name: "Seria 2",
  color: "blue"
}];

describe("components/victory-legend", () => {
  let wrapper = shallow(
    <VictoryLegend data={initialData} />
  );

  it("has expected content with shallow render", () => {
    const output = wrapper.find("VictoryLabel");
    expect(output.children().length).to.be.equal(2);
  });

  it("has expected horizontal symbol position", () => {
    const wrappedLegend = mount(<VictoryLegend data={initialData} orientation="horizontal" />);
    const output = wrappedLegend.render().find("rect");

    expect(output.eq(0).prop("x")).to.be.equal("0");
    expect(output.eq(1).prop("x")).to.be.equal("70");
    expect(output.eq(0).prop("y")).to.be.equal("-7");
    expect(output.eq(1).prop("y")).to.be.equal("-7");
  });

  it("has expected vertical symbol position", () => {
    const wrappedLegend = mount(<VictoryLegend data={initialData} orientation="vertical" />);
    const output = wrappedLegend.render().find("rect");

    expect(output.eq(0).prop("x")).to.be.equal("0");
    expect(output.eq(1).prop("x")).to.be.equal("0");
    expect(output.eq(0).prop("y")).to.be.equal("-7");
    expect(output.eq(1).prop("y")).to.be.equal("15");
  });

  it("has expected horizontal legend labels position", () => {
    const wrappedLegend = mount(<VictoryLegend data={initialData} orientation="horizontal" />);
    const output = wrappedLegend.render().find("text");
    expect(output.eq(0).prop("x")).to.be.equal("21");
    expect(output.eq(1).prop("x")).to.be.equal("91");

    expect(output.eq(0).prop("y")).to.be.equal("0");
    expect(output.eq(1).prop("y")).to.be.equal("0");
  });

  it("has expected vertical legend labels position", () => {
    const wrappedLegend = mount(<VictoryLegend data={initialData} orientation="vertical" />);
    const output = wrappedLegend.render().find("text");
    expect(output.eq(0).prop("x")).to.be.equal("21");
    expect(output.eq(1).prop("x")).to.be.equal("21");

    expect(output.eq(0).prop("y")).to.be.equal("0");
    expect(output.eq(1).prop("y")).to.be.equal("22");
  });

  describe("symbols", () => {
    const legendData = [{
      name: "Seria 1",
      color: "green",
      symbol: "rect"
    }, {
      name: "Seria 2",
      color: "blue",
      symbol: "circle"
    }];

    wrapper = shallow(
      <VictoryLegend data={legendData} />
    );

    const output = wrapper.find("VictorySymbol");

    it("has expected symbols length", () => {
      expect(output.length).to.be.equal(2);
    });

    it("has expected symbol colors", () => {
      expect(output.get(0).props.color).to.be.equal("green");
      expect(output.get(1).props.color).to.be.equal("blue");
    });

    it("has expected symbol type", () => {
      expect(output.get(0).props.type).to.be.equal("rect");
      expect(output.get(1).props.type).to.be.equal("circle");
    });
  });
});
