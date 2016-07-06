/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
/* global sinon */
/* eslint no-unused-expressions: 0 */
import React from "react";
import { shallow, mount, render } from "enzyme";
import { omit, range } from "lodash";
// import SvgTestHelper from "../../../../svg-test-helper";
import VictoryErrorBar from "src/components/victory-errorbar/victory-errorbar";
import ErrorBar from "src/components/victory-errorbar/errorbar";
import Borders from "src/components/victory-errorbar/helpers/borders";
import Cross from "src/components/victory-errorbar/helpers/cross";

class MyErrorBar extends React.Component {

  render() { }
}

describe("components/victory-errorbar", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(
        <VictoryErrorBar/>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("auto");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(
        <VictoryErrorBar/>
      );
      const svg = wrapper.find("svg");
      const viewBoxValue =
        `0 0 ${450} ${300}`;
      expect(svg.prop("viewBox")).to.equal(viewBoxValue);
    });

    it("renders 4 errors", () => {
      const wrapper = shallow(
        <VictoryErrorBar/>
      );
      const errorbars = wrapper.find(ErrorBar);
      expect(errorbars.length).to.equal(4);
    });
  });
  describe("rendering data", () => {
    it("renders injected errors for {x, y} with x, y symmetric error", () => {
      const data = range(10).map((i) => ({x: i, y: i, errorX: 0.1, errorY: 0.2}));
      const wrapper = shallow(
        <VictoryErrorBar data={data} dataComponent={<MyErrorBar />} />
      );

      const errors = wrapper.find(MyErrorBar);
      expect(errors.length).to.equal(10);
    });

    it("renders errors for {x, y} with x, y symmetric error", () => {
      const data = range(10).map((i) => ({x: i, y: i, errorX: 0.1, errorY: 0.2}));
      const wrapper = shallow(
        <VictoryErrorBar data={data}/>
      );
      const errors = wrapper.find(ErrorBar);
      expect(errors.length).to.equal(10);
    });

    it("renders errors with error bars, check total svg lines", () => {
      const svgDimensions = {width: 350, height: 200, padding: 75};
      const wrapper = render(
        <VictoryErrorBar
          data={[
            {x: 0, y: 0, errorX: 0.1, errorY: 0.2},
            {x: 2, y: 3, errorX: 0.1, errorY: 0.2},
            {x: 5, y: 5, errorX: 0.1, errorY: 0.2}
          ]}
          {...svgDimensions}
        />
      );
      expect(wrapper.find("line")).to.have.length(24);
    });

    it("renders errors with error bars, check helper component render amount", () => {
      const svgDimensions = {width: 350, height: 200, padding: 75};
      const wrapper = mount(
        <VictoryErrorBar
          data={[
            {x: 0, y: 0, errorX: 0.1, errorY: 0.2},
            {x: 2, y: 3, errorX: 0.1, errorY: 0.2},
            {x: 5, y: 5, errorX: 0.1, errorY: 0.2}
          ]}
          {...svgDimensions}
        />
      );
      const Data = wrapper.find(ErrorBar);
      Data.forEach((node) => {
        expect(node.find(Borders)).to.have.length(1);
        expect(node.find(Cross)).to.have.length(1);
      });
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryErrorBar
          events={[{
            target: "parent",
            eventHandlers: {onClick: clickHandler}
          }]}
        />
      );
      const svg = wrapper.find("svg");
      svg.simulate("click");
      expect(clickHandler).called;
      // the first argument is the standard evt object
      expect(clickHandler.args[0][1])
        .to.include.keys("data", "scale", "width", "height", "style");
    });

    it("attaches an event to data, click border lines", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryErrorBar
          events={[{
            target: "data",
            eventHandlers: {onClick: clickHandler}
          }]}
        />
      );
      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, index) => {
        const initialProps = Data.at(index).props();
        // click the border line
        node.find(Borders).find("line").first().simulate("click");
        expect(clickHandler.called).to.equal(true);
        // the first argument is the standard evt object
        expect(omit(clickHandler.args[index][1], ["events", "key"]))
          .to.eql(omit(initialProps, ["events", "key"]));
        expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
      });
    });

    it("attaches an event to data, click cross lines", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryErrorBar
          events={[{
            target: "data",
            eventHandlers: {onClick: clickHandler}
          }]}
        />
      );
      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, index) => {
        const initialProps = Data.at(index).props();
        // click the cross line
        node.find(Cross).find("line").first().simulate("click");
        expect(clickHandler.called).to.equal(true);
        // the first argument is the standard evt object
        expect(omit(clickHandler.args[index][1], ["events", "key"]))
          .to.eql(omit(initialProps, ["events", "key"]));
        expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
      });
    });
  });
});
