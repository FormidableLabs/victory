/**
 * Client tests
 */
/* global sinon */
/*eslint-disable max-nested-callbacks */
/* eslint no-unused-expressions: 0 */

import React from "react";
import { omit } from "lodash";
import { shallow, mount } from "enzyme";
import SvgTestHelper from "../svg-test-helper";
import { VictoryAxis } from "packages/victory-axis";
import { VictoryLabel, LineSegment, TextSize } from "packages/victory-core";
import { _approximateTextSizeInternal } from "packages/victory-core/es/victory-util/textsize"

describe("components/victory-axis", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(<VictoryAxis />);
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(<VictoryAxis />);
      const svg = wrapper.find("svg").at(0);
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });

    it("renders the appropriate number of ticks", () => {
      const tickValues = [1, 2, 3];
      const style = { ticks: { stroke: "black" } };
      const wrapper = shallow(
        <VictoryAxis
          tickValues={tickValues}
          style={style}
          tickComponent={<LineSegment type="tick" />}
        />
      );
      const ticks = wrapper.find('[type="tick"]');
      expect(ticks.length).to.equal(tickValues.length);
    });

    it("does not render invisible ticks", () => {
      const tickValues = [1, 2, 3];
      const style = { ticks: { stroke: "none" } };
      const wrapper = shallow(
        <VictoryAxis
          tickValues={tickValues}
          style={style}
          tickComponent={<LineSegment type="tick" />}
        />
      );
      const ticks = wrapper.find('[type="tick"]');
      expect(ticks.length).to.equal(0);
    });

    it("renders invisible ticks that have events", () => {
      const tickValues = [1, 2, 3];
      const style = { ticks: { stroke: "none" } };
      const wrapper = shallow(
        <VictoryAxis
          events={[
            {
              target: "ticks",
              eventHandlers: {
                onClick: () => {}
              }
            }
          ]}
          tickValues={tickValues}
          style={style}
          tickComponent={<LineSegment type="tick" />}
        />
      );
      const ticks = wrapper.find('[type="tick"]');
      expect(ticks.length).to.equal(tickValues.length);
    });

    it("renders ticks as lines", () => {
      const wrapper = mount(
        <VictoryAxis axisComponent={<LineSegment type="axis" />} />
      );
      const ticks = wrapper.find('[type="axis"]');
      ticks.forEach(SvgTestHelper.expectIsALine);
    });

    it("renders a line", () => {
      const wrapper = mount(
        <VictoryAxis axisComponent={<LineSegment type="axis" />} />
      );
      const line = wrapper.find('[type="axis"]');
      SvgTestHelper.expectIsALine(line);
    });
  });

  it("renders labels with auto-generated ids if id is not provided", () => {
    const wrapper = shallow(
      <VictoryAxis
        tickCount={3}
        tickLabelComponent={<VictoryLabel text="Some Label" />}
      />
    );
    const labels = wrapper.find("VictoryLabel");
    expect(labels.length).to.equal(3);
    expect(labels.at(0).prop("id")).to.equal("axis-tickLabels-0");
    expect(labels.at(1).prop("id")).to.equal("axis-tickLabels-1");
    expect(labels.at(2).prop("id")).to.equal("axis-tickLabels-2");
  });

  it("renders labels with calculated ids if a function is provided", () => {
    const wrapper = shallow(
      <VictoryAxis
        tickCount={3}
        tickLabelComponent={
          <VictoryLabel
            text={["Apple", "Banana", "Carrot"]}
            id={(props) =>
              `generated-id-${props.text[props.index].toLowerCase()}`
            }
          />
        }
      />
    );
    const labels = wrapper.find("VictoryLabel");
    expect(labels.length).to.equal(3);
    expect(labels.at(0).html()).to.contain('id="generated-id-apple"');
    expect(labels.at(1).html()).to.contain('id="generated-id-banana"');
    expect(labels.at(2).html()).to.contain('id="generated-id-carrot"');
  });

  describe("dependentAxis prop", () => {
    it("renders a horizontal axis by default", () => {
      const props = { padding: 50, width: 300 };
      const wrapper = mount(
        <VictoryAxis {...props} axisComponent={<LineSegment type="axis" />} />
      );
      const line = wrapper.find('[type="axis"]');
      expect(SvgTestHelper.isHorizontalAxis(line, props)).to.equal(true);
    });

    it("renders a vertical axis if specified", () => {
      const props = { padding: 50, height: 300 };
      const wrapper = mount(
        <VictoryAxis
          dependentAxis
          {...props}
          axisComponent={<LineSegment type="axis" />}
        />
      );
      const line = wrapper.find('[type="axis"]');
      expect(SvgTestHelper.isVerticalAxis(line, props)).to.equal(true);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryAxis
          events={[
            {
              target: "parent",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const svg = wrapper.find("svg").at(0);
      svg.simulate("click");
      expect(clickHandler).called;
      // the first argument is the standard evt object
      expect(clickHandler.args[0][1]).to.include.keys(
        "ticks",
        "scale",
        "width",
        "height",
        "style"
      );
    });

    it("attaches an event to the axis line", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryAxis
          events={[
            {
              target: "axis",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
          axisComponent={<LineSegment type="axis" />}
        />
      );
      const Data = wrapper.find('[type="axis"]');
      Data.forEach((node, index) => {
        const initialProps = Data.at(index).props();
        node.simulate("click");
        expect(clickHandler.called).to.equal(true);
        // the first argument is the standard evt object
        expect(omit(clickHandler.args[index][1], ["events", "key"])).to.eql(
          omit(initialProps, ["events", "key"])
        );
        expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
      });
    });
  });
  describe("label overlap", () => {
    describe("with empty label widths", () => {
      let sandbox;
      before(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(_approximateTextSizeInternal, "impl").returns({
          width: 0,
          height: 0
        });
      });
      after(() => {
        sandbox.restore();
      });

      it("renders the appropriate number of ticks", () => {
        const wrapper = shallow(
          <VictoryAxis
            tickValues={["", "", ""]}
            width={10}
            fixLabelOverlap
            style={{
              ticks: { stroke: "black" },
              tickLabels: { padding: 0 }
            }}
            tickComponent={<LineSegment type="tick" />}
          />
        );
        expect(wrapper.find('[type="tick"]').length).to.equal(3);
      });
    });
    describe("with not empty label widths", () => {
      let sandbox;

      beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(_approximateTextSizeInternal, "impl").returns({
          width: 30,
          height: 30
        });
      });

      afterEach(() => {
        sandbox.restore();
      });

      it("renders the appropriate number of ticks with default options", () => {
        const style = { ticks: { stroke: "black" } };
        const wrapper = shallow(
          <VictoryAxis
            tickValues={["1", "2", "3"]}
            style={style}
            width={10}
            tickComponent={<LineSegment type="tick" />}
          />
        );
        expect(wrapper.find('[type="tick"]').length).to.equal(3);
      });

      it("renders the appropriate number of ticks with fixLabelOverlap options", () => {
        const wrapper = shallow(
          <VictoryAxis
            tickValues={["1", "2", "3"]}
            width={60}
            fixLabelOverlap
            style={{
              ticks: { stroke: "black" },
              tickLabels: { padding: 0 }
            }}
            tickComponent={<LineSegment type="tick" />}
          />
        );
        expect(wrapper.find('[type="tick"]').length).to.equal(2);
      });

      it("renders ticks with similar gaps when ticks height sum greater then axis height", () => {
        const wrapper = shallow(
          <VictoryAxis
            tickValues={["1", "2", "3", "4"]}
            height={90}
            fixLabelOverlap
            dependentAxis
            style={{
              ticks: { stroke: "black" },
              tickLabels: { padding: 0 }
            }}
          />
        );
        const labelTexts = wrapper
          .find("VictoryLabel")
          .map((tick) => tick.props("text").text);
        expect(labelTexts.filter((text) => text === "1")).to.be.not.empty;
        expect(labelTexts.filter((text) => text === "2")).to.be.empty;
        expect(labelTexts.filter((text) => text === "3")).to.be.not.empty;
        expect(labelTexts.filter((text) => text === "4")).to.be.empty;
      });
      it("renders the appropriate ticks for dependent axis", () => {
        const wrapper = shallow(
          <VictoryAxis
            dependentAxis
            fixLabelOverlap
            tickValues={["1", "2", "3"]}
            height={60}
            style={{
              ticks: { stroke: "black" },
              tickLabels: { padding: 0 }
            }}
          />
        );
        const labelTexts = wrapper
          .find("VictoryLabel")
          .map((tick) => tick.props("text").text);
        expect(labelTexts.filter((text) => text === "1")).to.be.not.empty;
        expect(labelTexts.filter((text) => text === "2")).to.be.empty;
        expect(labelTexts.filter((text) => text === "3")).to.be.not.empty;
      });
      it("renders the appropriate number of ticks with paddings (number)", () => {
        const wrapper = shallow(
          <VictoryAxis
            tickValues={["1", "2", "3"]}
            width={100}
            fixLabelOverlap
            style={{
              ticks: { stroke: "black" },
              tickLabels: { padding: 10 }
            }}
            tickComponent={<LineSegment type="tick" />}
          />
        );
        expect(wrapper.find('[type="tick"]').length).to.equal(2);
      });
      it("renders the appropriate number of ticks with paddings (object) and dependentAxis", () => {
        const wrapper = shallow(
          <VictoryAxis
            dependentAxis
            tickValues={["1", "2", "3"]}
            height={80}
            fixLabelOverlap
            style={{
              ticks: { stroke: "black" },
              tickLabels: { padding: { top: 10 } }
            }}
            tickComponent={<LineSegment type="tick" />}
          />
        );
        expect(wrapper.find('[type="tick"]').length).to.equal(2);
      });
    });
  });
});
