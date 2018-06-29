/**
 * Client tests
 */
/* global sinon */
import React from "react";
import { shallow, mount } from "enzyme";
import VictoryLabel from "src/victory-label/victory-label";
import Text from "src/victory-primitives/text";
import TSpan from "src/victory-primitives/tspan";


describe("components/victory-label", () => {

  it("has expected content with shallow render", () => {
    const wrapper = shallow(
      <VictoryLabel text={"such text, wow"}/>
    );
    const output = wrapper.find(Text);
    expect(output.html()).to.contain("such text, wow");
  });

  it("sets dx and dy for text element", () => {
    const wrapper = shallow(
      <VictoryLabel dx={30} dy={30} text={"such text, wow"}/>
    );
    const output = wrapper.find(Text);
    expect(output.prop("dx")).to.eql(30);
    // dy = props.dy + (capHeight(0.71) / 2 + (0.5 - length(1) / 2) * lineHeight(1)) * fontSize(14);
    expect(output.prop("dy")).to.eql(34.97);
  });

  it("sets x and y for text element", () => {
    const wrapper = shallow(
      <VictoryLabel x={"100%"} y={30} text={"such text, wow"}/>
    );
    const output = wrapper.find(Text);
    expect(output.prop("x")).to.eql("100%");
    expect(output.prop("y")).to.eql(30);
  });

  it("has a transform property that rotates the text to match the labelAngle prop", () => {
    const wrapper = shallow(
      <VictoryLabel angle={46} text={"such text, wow"}/>
    );
    const output = wrapper.find(Text);
    expect(output.prop("transform")).to.contain("rotate(46");
  });

  it("strips px from fontSize", () => {
    const wrapper = shallow(
      <VictoryLabel style={{ fontSize: "10px" }} text={"such text, wow"}/>
    );
    const output = wrapper.find(TSpan);
    expect(output.prop("style")).to.contain({ fontSize: 10 });
  });

  it("uses a default fontSize when an invalid fontSize is given", () => {
    const wrapper = shallow(
      <VictoryLabel style={{ fontSize: "foo" }} text={"such text, wow"}/>
    );
    const output = wrapper.find(TSpan);
    expect(output.prop("style")).to.contain({ fontSize: 14 });
  });

  it("renders an array of text as seperate tspans", () => {
    const wrapper = shallow(
      <VictoryLabel text={["one", "two", "three"]}/>
    );
    const output = wrapper.find(TSpan);
    expect(output.length).to.equal(3);
  });

  it("renders splits newlines into tspans", () => {
    const wrapper = shallow(
      <VictoryLabel text={"one\ntwo\nthree"}/>
    );
    const output = wrapper.find(TSpan);
    expect(output.length).to.equal(3);
  });

  it("renders title and desc if provided ", () => {
    const wrapper = mount(
      <VictoryLabel text="title and desc" title="title" desc="desc" />
    );

    const wrapper2 = mount(
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

  it("renders tspan styles independently when `style` is an array", () => {
    const fill = ["red", "green", "blue"];
    const wrapper = shallow(
      <VictoryLabel text={"one\ntwo\nthree"}
        style={[{ fill: fill[0] }, { fill: fill[1] }, { fill: fill[2] }]}
      />
    );
    const output = wrapper.find(TSpan);
    output.forEach((tspan, index) => {
      expect(tspan.prop("style")).to.contain({ fill: fill[index] });
    });
  });

  describe("event handling", () => {
    it("attaches an to the parent object", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryLabel text="hi" events={{ onClick: clickHandler }}/>
      );
      wrapper.find(Text).simulate("click");
      expect(clickHandler.called).to.equal(true);
    });
  });

  it("renders TSpan elements inline when `inline` prop is passed", () => {
    const wrapper = shallow(
      <VictoryLabel
        text={["Inline", "label", "testing"]}
        inline
        dx={5}
      />
    );

    const output = wrapper.find(TSpan);
    output.forEach((tspan) => {
      // passing `inline` sets x and dy to undefined
      expect(tspan.prop("x")).to.be.eql(undefined);
      expect(tspan.prop("dy")).to.be.eql(undefined);
      expect(tspan.prop("dx")).to.be.eql(5);
    });
  });

  it("passes lineHeight as an array if provided", () => {
    const lineHeight = [1, 2, 3];
    const expectedDy = [undefined, 21, 35];
    const wrapper = shallow(
      <VictoryLabel
        text={["lineHeight", "array", "testing"]}
        lineHeight={lineHeight}
      />
    );

    const output = wrapper.find(TSpan);
    output.forEach((tspan, index) => {
      /*
      to calculate dy:
      ((this.lineHeight[i] + (this.lineHeight[i - 1] || this.lineHeight[0])) / 2)
      */
      expect(tspan.prop("dy")).to.be.eql(expectedDy[index]);
    });
  });

  it("defaults lineHeight to 1 if an empty array is provided for lineHeight", () => {
    const expectedDy = [undefined, 14, 14, 14];
    const wrapper = shallow(
      <VictoryLabel
        text={["lineHeight", "empty", "array", "testing"]}
        lineHeight={[]}
      />
    );

    const output = wrapper.find(TSpan);
    output.forEach((tspan, index) => {
      expect(tspan.prop("dy")).to.be.eql(expectedDy[index]);
    });
  });

  it("defaults style to `defaultStyles` if an empty array is provided for `style`", () => {
    const defaultStyles = {
      fill: "#252525",
      fontSize: 14,
      fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
      stroke: "transparent"
    };

    const wrapper = shallow(
      <VictoryLabel
        text={["style", "empty", "array", "testing"]}
        style={[]}
      />
    );

    const output = wrapper.find(TSpan);
    output.forEach((tspan) => {
      expect(tspan.prop("style")).to.be.eql(defaultStyles);
    });
  });
});
