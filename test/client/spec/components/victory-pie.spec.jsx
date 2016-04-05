/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
/* global sinon */
import _ from "lodash";
import React from "react";
import { shallow, mount } from "enzyme";
import VictoryPie from "src/components/victory-pie";
import Slice from "src/components/slice";
import SliceLabel from "src/components/slice-label";

class PizzaSlice extends React.Component {
  render() {}
}

describe("components/victory-pie", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = shallow(
        <VictoryPie/>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("style").width).to.equal(VictoryPie.defaultProps.width);
      expect(svg.prop("style").height).to.equal(VictoryPie.defaultProps.height);
    });
  });

  describe("rendering data", () => {
    it("renders dataComponents for {x, y} shaped data (default)", () => {
      const data = _.range(5).map((i) => ({x: i, y: i}));
      const wrapper = shallow(
        <VictoryPie
          data={data}
          dataComponent={<PizzaSlice />}
        />
      );
      const slices = wrapper.find(PizzaSlice);
      expect(slices.length).to.equal(5);
    });

    it("renders points for {x, y} shaped data (default)", () => {
      const data = _.range(5).map((i) => ({x: i, y: i}));
      const wrapper = shallow(<VictoryPie data={data}/>);
      const slices = wrapper.find(Slice);
      expect(slices.length).to.equal(5);
    });

    it("renders points for array-shaped data", () => {
      const data = _.range(6).map((i) => [i, i]);
      const wrapper = shallow(<VictoryPie data={data} x={0} y={1}/>);
      const slices = wrapper.find(Slice);
      expect(slices.length).to.equal(6);
    });

    it("renders points for deeply-nested data", () => {
      const data = _.range(7).map((i) => ({a: {b: [{x: i, y: i}]}}));
      const wrapper = shallow(
        <VictoryPie data={data} x="a.b[0].x" y="a.b[0].y"/>
      );
      const slices = wrapper.find(Slice);
      expect(slices.length).to.equal(7);
    });

    it("renders data values with null accessor", () => {
      const data = _.range(8);
      const wrapper = shallow(
        <VictoryPie data={data} x={null} y={null}/>
      );
      const slices = wrapper.find(Slice);
      expect(slices.length).to.equal(8);
    });
  });

  describe("event handling", () => {
    it("attaches an event to data", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryPie events={{data: {onClick: clickHandler}}}/>
      );
      const Slices = wrapper.find(Slice);
      Slices.forEach((node, index) => {
        const initialProps = Slices.at(index).props();
        node.simulate("click");
        expect(clickHandler.called).to.equal(true);
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1]).to.eql(initialProps);
        expect(clickHandler.args[index][2]).to.eql(index);
      });
    });
    it("attaches an event to label", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryPie events={{labels: {onClick: clickHandler}}}/>
      );
      const SliceLabels = wrapper.find(SliceLabel);
      SliceLabels.forEach((node, index) => {
        const initialProps = SliceLabels.at(index).props();
        node.simulate("click");
        expect(clickHandler.called).to.equal(true);
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1]).to.eql(initialProps);
        expect(clickHandler.args[index][2]).to.eql(index);
      });
    });
  });
});
