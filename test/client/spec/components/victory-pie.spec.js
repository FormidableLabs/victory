/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks,no-unused-expressions,max-len */
/* global sinon */
import { range, omit } from "lodash";
import React from "react";
import { shallow, mount } from "enzyme";
import { Style, VictoryLabel, Slice } from "victory-core";
import SvgTestHelper from "../../../svg-test-helper";
import VictoryPie from "src/components/victory-pie";

class PizzaSlice extends React.Component {
  render() {}
}

describe("components/victory-pie", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(
        <VictoryPie/>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("auto");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(
        <VictoryPie/>
      );
      const svg = wrapper.find("svg");
      expect(svg.prop("viewBox")).to.equal("0 0 400 400");
    });

    it("renders 5 slices", () => {
      const wrapper = shallow(
        <VictoryPie/>
      );

      const slices = wrapper.find(Slice);
      expect(slices).to.have.lengthOf(5);
    });

    it("renders each slice as a circular sector", () => {
      const wrapper = shallow(
        <VictoryPie/>
      );
      const slices = wrapper.find(Slice);
      slices.forEach(SvgTestHelper.expectIsCircularSection);
    });

    it("renders 5 slice labels", () => {
      const wrapper = shallow(
        <VictoryPie/>
      );

      const labels = wrapper.find(VictoryLabel);
      expect(labels).to.have.lengthOf(5);
    });

    it("renders 0 slice labels for empty label array", () => {
      const wrapper = shallow(
        <VictoryPie
          labels={[]}
        />
      );

      const labels = wrapper.find(VictoryLabel);
      expect(labels).to.have.lengthOf(0);
    });

    it("renders 0 slice labels for label function returning undefined", () => {
      const wrapper = shallow(
        <VictoryPie
          labels={() => {}}
        />
      );

      const labels = wrapper.find(VictoryLabel);
      expect(labels).to.have.lengthOf(0);
    });
  });

  describe("rendering data", () => {
    it("renders dataComponents for {x, y} shaped data (default)", () => {
      const data = range(5).map((i) => ({x: i, y: i}));
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
      const data = range(5).map((i) => ({x: i, y: i}));
      const wrapper = shallow(<VictoryPie data={data}/>);
      const slices = wrapper.find(Slice);
      expect(slices.length).to.equal(5);
    });

    it("renders points for array-shaped data", () => {
      const data = range(6).map((i) => [i, i]);
      const wrapper = shallow(<VictoryPie data={data} x={0} y={1}/>);
      const slices = wrapper.find(Slice);
      expect(slices.length).to.equal(6);
    });

    it("renders points for deeply-nested data", () => {
      const data = range(7).map((i) => ({a: {b: [{x: i, y: i}]}}));
      const wrapper = shallow(
        <VictoryPie data={data} x="a.b[0].x" y="a.b[0].y"/>
      );
      const slices = wrapper.find(Slice);
      expect(slices.length).to.equal(7);
    });

    it("renders data values with null accessor", () => {
      const data = range(8);
      const wrapper = shallow(
        <VictoryPie data={data} x={null} y={null}/>
      );
      const slices = wrapper.find(Slice);
      expect(slices.length).to.equal(8);
    });

    it("renders data values in their given order", () => {
      const data = range(9).map((i) => ({x: i, y: i}));

      const wrapper = shallow(
        <VictoryPie data={data}/>
      );
      const xValues = wrapper.find(Slice).map((slice) => {
        return slice.prop("datum")._x;
      });

      expect(xValues).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it("renders data values sorted by sortKey prop", () => {
      const data = range(9).map((i) => ({x: i, y: i})).reverse();

      const wrapper = shallow(
        <VictoryPie data={data} sortKey={"x"}/>
      );
      const xValues = wrapper.find(Slice).map((slice) => {
        return slice.prop("datum")._x;
      });

      expect(xValues).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });
  });

  describe("the `startAngle` prop", () => {
    it("determines the counter clockwise angle relative to a cartesian Y axis of a vector extending from the origin to the _first drawn coordinate_ of the first slice ", () => {
      [0, 90, 180, 270].map((angle) => {
        const wrapper = shallow(
          <VictoryPie startAngle={angle}/>
        );

        const firstSlice = wrapper.find(Slice).first();
        const coordinates = SvgTestHelper.getSliceArcStart(firstSlice);
        const renderedAngle = SvgTestHelper.getSvgCoordinatesAngleFromCartesianYAxis(coordinates);

        // There is a small degree of inprecision due to how D3 renders the paths
        expect(renderedAngle).to.be.closeTo(angle, 0.0001);
      });
    });
  });

  describe("the `innerRadius` prop", () => {
    it("renders the slices as annular sections", () => {
      const wrapper = shallow(
        <VictoryPie innerRadius={70}/>
      );

      const slices = wrapper.find(Slice);
      slices.forEach(SvgTestHelper.expectIsAnnularSection);
    });

    it("determines the distance in pixels between the origin & the inner edge of the sections", () => {
      const wrapper = shallow(
        <VictoryPie innerRadius={70}/>
      );

      const slices = wrapper.find(Slice);
      slices.forEach((slice) => {
        expect(SvgTestHelper.getInnerRadiusOfCircularOrAnnularSlice(slice)).to.eql(70);
      });
    });
  });

  describe("`startAngle` in conjunction with `endAngle`", () => {
    it("renders a portion of a chart from `startAngle` to `endAngle`", () => {
      const wrapper = shallow(
        <VictoryPie startAngle={-90} endAngle={90}/>
      );

      const slices = wrapper.find(Slice);
      const firstSlice = slices.first();
      const lastSlice = slices.last();
      const arcStart = SvgTestHelper.getSliceArcStart(firstSlice);
      const arcEnd = SvgTestHelper.getSliceArcEnd(lastSlice);

      expect(SvgTestHelper.getSvgCoordinatesAngleFromCartesianYAxis(arcStart)).to.eql(270);
      expect(SvgTestHelper.getSvgCoordinatesAngleFromCartesianYAxis(arcEnd)).to.eql(90);
    });
  });

  describe("the `width` prop", () => {
    it("determines the width of the containing viewBox", () => {
      const width = 200;
      const wrapper = mount(
        <VictoryPie width={width} />
      );

      expect(wrapper.find("svg")).to.have.prop("viewBox", `0 0 ${width} 400`);
    });
  });

  describe("the `height` prop", () => {
    it("determines the height of the containing viewBox", () => {
      const height = 200;
      const wrapper = mount(
        <VictoryPie height={height} />
      );

      expect(wrapper.find("svg")).to.have.prop("viewBox", `0 0 400 ${height}`);
    });
  });

  describe("the `colorScale` prop", () => {
    describe("if provided an array of CSS colors", () => {
      it("renders each slice with the next color in the array, reiterating through colors as necessary", () => {
        const data = range(5);
        const colorScale = ["#fffff", "#eeeee", "#ddddd"];
        const wrapper = shallow(
          <VictoryPie data={data} colorScale={colorScale}/>
        );

        const slices = wrapper.find(Slice);
        expect(slices.length).to.equal(5);
        slices.forEach((slice, i) => {
          expect(slice).to.have.style("fill", colorScale[i % colorScale.length]);
        });
      });
    });

    describe("if provided a string", () => {
      describe("and the string is a valid victory color scale", () => {
        it("renders the chart using the given color scale", () => {
          const VALID_VICTORY_COLOR_SCALE_NAMES = ["grayscale", "qualitative",
            "heatmap", "warm", "cool", "red", "green", "blue"];

          VALID_VICTORY_COLOR_SCALE_NAMES.map((colorScaleName) => {
            const colorScale = Style.getColorScale(colorScaleName);
            const data = range(colorScale.length + 1);
            const wrapper = shallow(
              <VictoryPie colorScale={colorScale} data={data}/>
            );

            wrapper.find(Slice).map((slice, i) => {
              const expectedColor = colorScale[i % colorScale.length];
              expect(slice, `Slice at index ${i} rendered with color scale ${colorScale} has fill color ${expectedColor}`).to.have.style("fill", expectedColor);
            });
          });
        });
      });

      describe("and the string isn't a valid victory color scale", () => {
        it("renders the chart using the victory grayscale", () => {
          it("renders slices using the victory grayscale", () => {
            const invalidColorScale = "foobar";
            const grayscale = Style.getColorScale("grayscale");
            const data = range(grayscale.length);

            const wrapper = shallow(
              <VictoryPie colorScale={invalidColorScale} data={data}/>
            );

            const slices = wrapper.find(Slice);
            slices.map((slice, i) => {
              expect(slice).to.have.style("fill", grayscale[i]);
            });
          });
        });
      });
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryPie
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
        .to.include.keys("slices", "pathFunction", "width", "height", "style");
    });

    it("attaches an event to data", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryPie
          events={[{
            target: "data",
            eventHandlers: {onClick: clickHandler}
          }]}
        />
      );
      const Slices = wrapper.find(Slice);
      Slices.forEach((node, index) => {
        const initialProps = Slices.at(index).props();
        node.simulate("click");
        expect(clickHandler.called).to.equal(true);
        // the first argument is the standard evt object
        expect(omit(clickHandler.args[index][1], ["events", "key"]))
          .to.eql(omit(initialProps, ["events", "key"]));
        expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
      });
    });
    it("attaches an event to label", () => {
      const clickHandler = sinon.spy();
      const wrapper = mount(
        <VictoryPie
          events={[{
            target: "labels",
            eventHandlers: {onClick: clickHandler}
          }]}
        />
      );
      const SliceLabels = wrapper.find(VictoryLabel);
      SliceLabels.forEach((node, index) => {
        const initialProps = SliceLabels.at(index).props();
        node.simulate("click");
        expect(clickHandler.called).to.equal(true);
        // the first argument is the standard evt object
        expect(clickHandler.args[index][1].datum).to.eql(initialProps.datum);
        expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
      });
    });
  });
});
