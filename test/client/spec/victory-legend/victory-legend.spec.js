/**
 * Client tests
 */
import React from "react";
import { shallow, render } from "enzyme";
import VictoryLegend from "src/victory-legend/victory-legend";

const initialData = [{
  name: "Series 1",
  symbol: {
    type: "circle"
  }
}, {
  name: "Series 2",
  label: {
    fill: "red"
  },
  symbol: {
    type: "triangleUp",
    style: {
      fill: "blue"
    }
  }
}];

describe("components/victory-legend", () => {
  let wrapper = shallow(
    <VictoryLegend data={initialData} />
  );

  it("has expected content with shallow render", () => {
    const output = wrapper.find("VictoryLabel");
    expect(output.length).to.be.equal(2);
  });

  it("has expected horizontal symbol position", () => {
    const wrappedLegend = shallow(<VictoryLegend data={initialData} orientation="horizontal" />);
    const output = wrappedLegend.find("Point");

    expect(output.at(0).prop("x")).to.be.equal(0);
    expect(output.at(1).prop("x")).to.be.equal(76);
    expect(output.at(0).prop("y")).to.be.equal(0);
    expect(output.at(1).prop("y")).to.be.equal(0);
  });

  it("has expected vertical symbol position", () => {
    const wrappedLegend = shallow(<VictoryLegend data={initialData} orientation="vertical" />);
    const output = wrappedLegend.find("Point");

    expect(output.at(0).prop("x")).to.be.equal(0);
    expect(output.at(1).prop("x")).to.be.equal(0);
    expect(output.at(0).prop("y")).to.be.equal(0);
    expect(output.at(1).prop("y")).to.be.equal(22);
  });

  it("has expected horizontal legend labels position", () => {
    const wrappedLegend = render(<VictoryLegend data={initialData} orientation="horizontal" />);
    const output = wrappedLegend.find("text");

    expect(output.eq(0).prop("x")).to.be.equal("12.18");
    expect(output.eq(1).prop("x")).to.be.equal("88.18");

    expect(output.eq(0).prop("y")).to.be.equal("0");
    expect(output.eq(1).prop("y")).to.be.equal("0");
  });

  it("has expected vertical legend labels position", () => {
    const wrappedLegend = render(<VictoryLegend data={initialData} orientation="vertical" />);
    const output = wrappedLegend.find("text");
    expect(output.eq(0).prop("x")).to.be.equal("12.18");
    expect(output.eq(1).prop("x")).to.be.equal("12.18");

    expect(output.eq(0).prop("y")).to.be.equal("0");
    expect(output.eq(1).prop("y")).to.be.equal("22");
  });

  describe("symbols", () => {
    const legendData = [{
      name: "Seria 1",
      label: {
        fontSize: 10
      },
      symbol: {
        type: "circle",
        style: {
          fill: "red"
        }
      }
    }, {
      name: "Long Seria Name",
      label: {
        fontSize: 12
      },
      symbol: {
        type: "triangleUp",
        style: {
          fill: "blue"
        }
      }
    }];

    wrapper = shallow(
      <VictoryLegend data={legendData} />
    );

    const output = wrapper.find("Point");

    it("has expected symbols length", () => {
      expect(output.length).to.be.equal(2);
    });

    it("has expected symbol colors", () => {
      expect(output.get(0).props.style.fill).to.be.equal("red");
      expect(output.get(1).props.style.fill).to.be.equal("blue");
    });

    it("has expected symbol type", () => {
      expect(output.get(0).props.symbol).to.be.equal("circle");
      expect(output.get(1).props.symbol).to.be.equal("triangleUp");
    });
  });
});
