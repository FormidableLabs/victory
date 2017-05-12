/**
 * Client tests
 */
/* global sinon */
import React from "react";
import { shallow, mount } from "enzyme";
import VictoryLabel from "src/victory-label/victory-label";

describe("components/victory-label", () => {

  it("has expected content with shallow render", () => {
    const wrapper = shallow(
      <VictoryLabel text={"such text, wow"}/>
    );
    const output = wrapper.find("text");
    expect(output.html()).to.contain("such text, wow");
  });

  it("sets dx and dy for text element", () => {
    const wrapper = shallow(
      <VictoryLabel dx={30} dy={30} text={"such text, wow"}/>
    );
    const output = wrapper.find("text");
    expect(output.prop("dx")).to.eql(30);
    // dy = props.dy + (capHeight(0.71) / 2 + (0.5 - length(1) / 2) * lineHeight(1)) * fontSize(14);
    expect(output.prop("dy")).to.eql(34.97);
  });

  it("has a transform property that rotates the text to match the labelAngle prop", () => {
    const wrapper = shallow(
      <VictoryLabel angle={46} text={"such text, wow"}/>
    );
    const output = wrapper.find("text");
    expect(output.prop("transform")).to.contain("rotate(46");
  });

  it("strips px from fontSize", () => {
    const wrapper = shallow(
      <VictoryLabel style={{ fontSize: "10px" }} text={"such text, wow"}/>
    );
    const output = wrapper.find("tspan");
    expect(output.prop("style")).to.contain({ fontSize: 10 });
  });

  it("uses a default fontSize when an invalid fontSize is given", () => {
    const wrapper = shallow(
      <VictoryLabel style={{ fontSize: "foo" }} text={"such text, wow"}/>
    );
    const output = wrapper.find("tspan");
    expect(output.prop("style")).to.contain({ fontSize: 14 });
  });

  it("renders an array of text as seperate tspans", () => {
    const wrapper = shallow(
      <VictoryLabel text={["one", "two", "three"]}/>
    );
    const output = wrapper.find("tspan");
    expect(output.length).to.equal(3);
  });

  it("renders splits newlines into tspans", () => {
    const wrapper = shallow(
      <VictoryLabel text={"one\ntwo\nthree"}/>
    );
    const output = wrapper.find("tspan");
    expect(output.length).to.equal(3);
  });

  it("renders title and desc if provided ", () => {
    const wrapper = shallow(
      <VictoryLabel text="title and desc" title="title" desc="desc" />
    );

    const wrapper2 = shallow(
      <VictoryLabel text="title and desc"/>
    );

    const title = wrapper.find("title");
    expect(title.length).to.equal(1);

    const desc = wrapper.find("desc");
    expect(desc.length).to.equal(1);

    const noTitle = wrapper2.find("title");
    expect(noTitle.length).to.equal(0);

    const noDesc = wrapper2.find("desc");
    expect(noDesc.length).to.equal(0);
  });

  it("renders styles tspand independently when `style` is an array", () => {
    const fill = ["red", "green", "blue"];
    const wrapper = shallow(
      <VictoryLabel text={"one\ntwo\nthree"}
        style={[{ fill: fill[0] }, { fill: fill[1] }, { fill: fill[2] }]}
      />
    );
    const output = wrapper.find("tspan");
    output.forEach((tspan, index) => {
      expect(tspan.prop("style")).to.contain({ fill: fill[index] });
    });
  });

  describe("event handling", () => {
    it("attaches an to the parent object", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryLabel events={{ onClick: clickHandler }}/>
      );
      wrapper.find("text").simulate("click");
      expect(clickHandler.called).to.equal(true);
    });
  });
});
