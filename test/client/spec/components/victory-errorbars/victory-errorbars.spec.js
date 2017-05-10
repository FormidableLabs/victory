/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
/* global sinon */
/* eslint no-unused-expressions: 0 */
import React from "react";
import { shallow, mount, render } from "enzyme";
import { omit, range } from "lodash";
import * as d3Scale from "d3-scale";
import VictoryErrorBar from "src/components/victory-errorbar/victory-errorbar";
import { ErrorBar } from "victory-core";

class MyErrorBar extends React.Component {
  render() { }
}

describe("components/victory-errorbar", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const wrapper = mount(
        <VictoryErrorBar/>
      );
      const svg = wrapper.find("svg").at(0);
      expect(svg.prop("style").width).to.equal("100%");
      expect(svg.prop("style").height).to.equal("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const wrapper = mount(
        <VictoryErrorBar/>
      );
      const svg = wrapper.find("svg").at(0);
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

  describe("symmetric error, rendering data", () => {
    it("renders injected errors for {x, y}", () => {
      const data = range(10).map((i) => ({ x: i, y: i, errorX: 0.1, errorY: 0.2 }));
      const wrapper = shallow(
        <VictoryErrorBar data={data} dataComponent={<MyErrorBar />} />
      );

      const errors = wrapper.find(MyErrorBar);
      expect(errors.length).to.equal(10);
    });

    it("renders errors for {x, y}", () => {
      const data = range(10).map((i) => ({ x: i, y: i, errorX: 0.1, errorY: 0.2 }));
      const wrapper = shallow(
        <VictoryErrorBar data={data}/>
      );
      const errors = wrapper.find(ErrorBar);
      expect(errors.length).to.equal(10);
    });

    it("sorts data by sortKey prop", () => {
      const data = range(5).map((i) => ({ x: i, y: i, errorX: 0.1, errorY: 0.2 })).reverse();
      const wrapper = shallow(
        <VictoryErrorBar data={data} sortKey="x"/>
      );
      const xValues = wrapper.find(ErrorBar).map((errorBar) => errorBar.prop("datum")._x);
      expect(xValues).to.eql([0, 1, 2, 3, 4]);
    });

    it("renders errors with error bars, check total svg lines", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const wrapper = render(
        <VictoryErrorBar
          data={[
            { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
            { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
            { x: 5, y: 5, errorX: 0.1, errorY: 0.2 }
          ]}
          {...svgDimensions}
        />
      );
      expect(wrapper.find("line")).to.have.length(24);
    });

    it("should check right border of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const borderWidth = 10;
      const data = [
        { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
        { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
        { x: 5, y: 5, errorX: 0.1, errorY: 0.2 }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.1, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.2, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorX = xScale(data[i].x + data[i].errorX);
        const xScaleMax = xScale.range()[1];
        const positiveErrorX = errorX >= xScaleMax
          ? xScaleMax : errorX;

        // right border
        expect(node.findWhere((n) => n.key() === "borderRight").props().x1)
          .to.equal(positiveErrorX);
        expect(node.findWhere((n) => n.key() === "borderRight").props().x2)
          .to.equal(positiveErrorX);
        expect(node.findWhere((n) => n.key() === "borderRight").props().y1)
          .to.equal(yScale(data[i].y) - borderWidth);
        expect(node.findWhere((n) => n.key() === "borderRight").props().y2)
          .to.equal(yScale(data[i].y) + borderWidth);
      });
    });

    it("should check left border of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const borderWidth = 10;
      const data = [
        { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
        { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
        { x: 5, y: 5, errorX: 0.1, errorY: 0.2 }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.1, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.2, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorX = xScale(data[i].x - data[i].errorX);
        const xScaleMin = xScale.range()[0];
        const negativeErrorX = errorX <= xScaleMin
          ? xScaleMin : errorX;

        // left border
        expect(node.findWhere((n) => n.key() === "borderLeft").props().x1)
          .to.equal(negativeErrorX);
        expect(node.findWhere((n) => n.key() === "borderLeft").props().x2)
          .to.equal(negativeErrorX);
        expect(node.findWhere((n) => n.key() === "borderLeft").props().y1)
          .to.equal(yScale(data[i].y) - borderWidth);
        expect(node.findWhere((n) => n.key() === "borderLeft").props().y2)
          .to.equal(yScale(data[i].y) + borderWidth);
      });
    });

    it("should check bottom border of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const borderWidth = 10;
      const data = [
        { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
        { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
        { x: 5, y: 5, errorX: 0.1, errorY: 0.2 }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.1, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.2, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorY = yScale(data[i].y + data[i].errorY);
        const yScaleMin = yScale.range()[1];
        const negativeErrorY = errorY <= yScaleMin
          ? yScaleMin : errorY;

        // bottom border
        expect(node.findWhere((n) => n.key() === "borderBottom").props().x1)
          .to.equal(xScale(data[i].x) - borderWidth);
        expect(node.findWhere((n) => n.key() === "borderBottom").props().x2)
          .to.equal(xScale(data[i].x) + borderWidth);
        expect(node.findWhere((n) => n.key() === "borderBottom").props().y1)
          .to.equal(negativeErrorY);
        expect(node.findWhere((n) => n.key() === "borderBottom").props().y2)
          .to.equal(negativeErrorY);
      });
    });

    it("should check top border of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const borderWidth = 10;
      const data = [
        { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
        { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
        { x: 5, y: 5, errorX: 0.1, errorY: 0.2 }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.1, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.2, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorY = yScale(data[i].y - data[i].errorY);
        const yScaleMax = yScale.range()[0];
        const positiveErrorY = errorY >= yScaleMax
          ? yScaleMax : errorY;

        // top border
        expect(node.findWhere((n) => n.key() === "borderTop").props().x1)
          .to.equal(xScale(data[i].x) - borderWidth);
        expect(node.findWhere((n) => n.key() === "borderTop").props().x2)
          .to.equal(xScale(data[i].x) + borderWidth);
        expect(node.findWhere((n) => n.key() === "borderTop").props().y1)
          .to.equal(positiveErrorY);
        expect(node.findWhere((n) => n.key() === "borderTop").props().y2)
          .to.equal(positiveErrorY);
      });
    });

    it("should check top cross line of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const data = [
        { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
        { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
        { x: 5, y: 5, errorX: 0.1, errorY: 0.2 }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.1, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.2, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorY = yScale(data[i].y - data[i].errorY);
        const yScaleMax = yScale.range()[0];
        const positiveErrorY = errorY >= yScaleMax
          ? yScaleMax : errorY;

        expect(node.findWhere((n) => n.key() === "crossTop").props().x1)
          .to.equal(xScale(data[i].x));
        expect(node.findWhere((n) => n.key() === "crossTop").props().x2)
          .to.equal(xScale(data[i].x));
        expect(node.findWhere((n) => n.key() === "crossTop").props().y1)
          .to.equal(yScale(data[i].y));
        expect(node.findWhere((n) => n.key() === "crossTop").props().y2)
          .to.equal(positiveErrorY);
      });
    });

    it("should check bottom cross line of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const data = [
        { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
        { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
        { x: 5, y: 5, errorX: 0.1, errorY: 0.2 }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.1, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.2, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorY = yScale(data[i].y + data[i].errorY);
        const yScaleMin = yScale.range()[1];
        const negativeErrorY = errorY <= yScaleMin
          ? yScaleMin : errorY;

        expect(node.findWhere((n) => n.key() === "crossBottom").props().x1)
          .to.equal(xScale(data[i].x));
        expect(node.findWhere((n) => n.key() === "crossBottom").props().x2)
          .to.equal(xScale(data[i].x));
        expect(node.findWhere((n) => n.key() === "crossBottom").props().y1)
          .to.equal(yScale(data[i].y));
        expect(node.findWhere((n) => n.key() === "crossBottom").props().y2)
          .to.equal(negativeErrorY);
      });
    });

    it("should check left cross line of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const data = [
        { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
        { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
        { x: 5, y: 5, errorX: 0.1, errorY: 0.2 }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.1, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.2, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorX = xScale(data[i].x - data[i].errorX);
        const xScaleMin = xScale.range()[0];
        const negativeErrorX = errorX <= xScaleMin
          ? xScaleMin : errorX;

        expect(node.findWhere((n) => n.key() === "crossLeft").props().x1)
          .to.equal(xScale(data[i].x));
        expect(node.findWhere((n) => n.key() === "crossLeft").props().x2)
          .to.equal(negativeErrorX);
        expect(node.findWhere((n) => n.key() === "crossLeft").props().y1)
          .to.equal(yScale(data[i].y));
        expect(node.findWhere((n) => n.key() === "crossLeft").props().y2)
          .to.equal(yScale(data[i].y));
      });
    });

    it("should check right cross line of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const data = [
        { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
        { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
        { x: 5, y: 5, errorX: 0.1, errorY: 0.2 }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.1, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.2, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorX = xScale(data[i].errorX + data[i].x);
        const xScaleMax = xScale.range()[1];
        const positiveErrorX = errorX >= xScaleMax
          ? xScaleMax : errorX;

        expect(node.findWhere((n) => n.key() === "crossRight").props().x1)
          .to.equal(xScale(data[i].x));
        expect(node.findWhere((n) => n.key() === "crossRight").props().x2)
          .to.equal(positiveErrorX);
        expect(node.findWhere((n) => n.key() === "crossRight").props().y1)
          .to.equal(yScale(data[i].y));
        expect(node.findWhere((n) => n.key() === "crossRight").props().y2)
          .to.equal(yScale(data[i].y));
      });
    });
  });

  describe("asymmetric error, rendering data", () => {
    it("renders injected errors for {x, y}", () => {
      const data = range(10).map((i) => ({ x: i, y: i, errorX: [0.1, 0.2], errorY: [0.2, 0.5] }));
      const wrapper = shallow(
        <VictoryErrorBar data={data} dataComponent={<MyErrorBar />} />
      );

      const errors = wrapper.find(MyErrorBar);
      expect(errors.length).to.equal(10);
    });

    it("renders errors for {x, y}", () => {
      const data = range(10).map((i) => ({ x: i, y: i, errorX: [0.1, 0.2], errorY: [0.2, 1] }));
      const wrapper = shallow(
        <VictoryErrorBar data={data}/>
      );
      const errors = wrapper.find(ErrorBar);
      expect(errors.length).to.equal(10);
    });

    it("renders errors with error bars, check total svg lines", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const wrapper = render(
        <VictoryErrorBar
          data={[
            { x: 0, y: 0, errorX: [0.1, 0.5], errorY: [0.2, 0.3] },
            { x: 2, y: 3, errorX: [0.1, 0.5], errorY: [0.2, 0.4] },
            { x: 5, y: 5, errorX: [0.1, 0.5], errorY: [0.2, 0.1] }
          ]}
          {...svgDimensions}
        />
      );
      expect(wrapper.find("line")).to.have.length(24);
    });

    it("should check right border of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const borderWidth = 10;
      const data = [
        { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
        { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
        { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.3, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.5, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorX = xScale(data[i].x + data[i].errorX[0]);
        const xScaleMax = xScale.range()[1];
        const positiveErrorX = errorX >= xScaleMax
          ? xScaleMax : errorX;

        // right border
        expect(node.findWhere((n) => n.key() === "borderRight").props().x1)
          .to.equal(positiveErrorX);
        expect(node.findWhere((n) => n.key() === "borderRight").props().x2)
          .to.equal(positiveErrorX);
        expect(node.findWhere((n) => n.key() === "borderRight").props().y1)
          .to.equal(yScale(data[i].y) - borderWidth);
        expect(node.findWhere((n) => n.key() === "borderRight").props().y2)
          .to.equal(yScale(data[i].y) + borderWidth);
      });
    });

    it("should check left border of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const borderWidth = 10;
      const data = [
        { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
        { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
        { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.3, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.5, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorX = xScale(data[i].x - data[i].errorX[1]);
        const xScaleMin = xScale.range()[0];
        const negativeErrorX = errorX <= xScaleMin
          ? xScaleMin : errorX;

        // left border
        expect(node.findWhere((n) => n.key() === "borderLeft").props().x1)
          .to.equal(negativeErrorX);
        expect(node.findWhere((n) => n.key() === "borderLeft").props().x2)
          .to.equal(negativeErrorX);
        expect(node.findWhere((n) => n.key() === "borderLeft").props().y1)
          .to.equal(yScale(data[i].y) - borderWidth);
        expect(node.findWhere((n) => n.key() === "borderLeft").props().y2)
          .to.equal(yScale(data[i].y) + borderWidth);
      });
    });

    it("should check bottom border of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const borderWidth = 10;
      const data = [
        { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
        { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
        { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.3, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.5, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorY = yScale(data[i].y + data[i].errorY[0]);
        const yScaleMin = yScale.range()[1];
        const negativeErrorY = errorY <= yScaleMin
          ? yScaleMin : errorY;

        // bottom border
        expect(node.findWhere((n) => n.key() === "borderBottom").props().x1)
          .to.equal(xScale(data[i].x) - borderWidth);
        expect(node.findWhere((n) => n.key() === "borderBottom").props().x2)
          .to.equal(xScale(data[i].x) + borderWidth);
        expect(node.findWhere((n) => n.key() === "borderBottom").props().y1)
          .to.equal(negativeErrorY);
        expect(node.findWhere((n) => n.key() === "borderBottom").props().y2)
          .to.equal(negativeErrorY);
      });
    });

    it("should check top border of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const borderWidth = 10;
      const data = [
        { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
        { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
        { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.3, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.5, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorY = yScale(data[i].y - data[i].errorY[1]);
        const yScaleMax = yScale.range()[0];
        const positiveErrorY = errorY >= yScaleMax
          ? yScaleMax : errorY;

        // top border
        expect(node.findWhere((n) => n.key() === "borderTop").props().x1)
          .to.equal(xScale(data[i].x) - borderWidth);
        expect(node.findWhere((n) => n.key() === "borderTop").props().x2)
          .to.equal(xScale(data[i].x) + borderWidth);
        expect(node.findWhere((n) => n.key() === "borderTop").props().y1)
          .to.equal(positiveErrorY);
        expect(node.findWhere((n) => n.key() === "borderTop").props().y2)
          .to.equal(positiveErrorY);
      });
    });

    it("should check top cross line of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const data = [
        { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
        { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
        { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.3, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.5, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorY = yScale(data[i].y - data[i].errorY[1]);
        const yScaleMax = yScale.range()[0];
        const positiveErrorY = errorY >= yScaleMax
          ? yScaleMax : errorY;

        expect(node.findWhere((n) => n.key() === "crossTop").props().x1)
          .to.equal(xScale(data[i].x));
        expect(node.findWhere((n) => n.key() === "crossTop").props().x2)
          .to.equal(xScale(data[i].x));
        expect(node.findWhere((n) => n.key() === "crossTop").props().y1)
          .to.equal(yScale(data[i].y));
        expect(node.findWhere((n) => n.key() === "crossTop").props().y2)
          .to.equal(positiveErrorY);
      });
    });

    it("should check bottom cross line of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const data = [
        { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
        { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
        { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.3, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.5, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorY = yScale(data[i].y + data[i].errorY[0]);
        const yScaleMin = yScale.range()[1];
        const negativeErrorY = errorY <= yScaleMin
          ? yScaleMin : errorY;

        expect(node.findWhere((n) => n.key() === "crossBottom").props().x1)
          .to.equal(xScale(data[i].x));
        expect(node.findWhere((n) => n.key() === "crossBottom").props().x2)
          .to.equal(xScale(data[i].x));
        expect(node.findWhere((n) => n.key() === "crossBottom").props().y1)
          .to.equal(yScale(data[i].y));
        expect(node.findWhere((n) => n.key() === "crossBottom").props().y2)
          .to.equal(negativeErrorY);
      });
    });

    it("should check left cross line of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const data = [
        { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
        { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
        { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.3, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.5, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorX = xScale(data[i].x - data[i].errorX[1]);
        const xScaleMin = xScale.range()[0];
        const negativeErrorX = errorX <= xScaleMin
          ? xScaleMin : errorX;

        expect(node.findWhere((n) => n.key() === "crossLeft").props().x1)
          .to.equal(xScale(data[i].x));
        expect(node.findWhere((n) => n.key() === "crossLeft").props().x2)
          .to.equal(negativeErrorX);
        expect(node.findWhere((n) => n.key() === "crossLeft").props().y1)
          .to.equal(yScale(data[i].y));
        expect(node.findWhere((n) => n.key() === "crossLeft").props().y2)
          .to.equal(yScale(data[i].y));
      });
    });

    it("should check right cross line of error bars positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const data = [
        { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
        { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
        { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] }
      ];
      const wrapper = mount(
        <VictoryErrorBar
          data={data}
          {...svgDimensions}
        />
      );

      const xScale = d3Scale.scaleLinear()
        .domain([-0.3, 5.1])
        .range([svgDimensions.padding, svgDimensions.width - svgDimensions.padding]);

      const yScale = d3Scale.scaleLinear()
        .domain([-0.5, 5.2])
        .range([svgDimensions.height - svgDimensions.padding, svgDimensions.padding]);

      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, i) => {
        const errorX = xScale(data[i].x + data[i].errorX[0]);
        const xScaleMax = xScale.range()[1];
        const positiveErrorX = errorX >= xScaleMax
          ? xScaleMax : errorX;

        expect(node.findWhere((n) => n.key() === "crossRight").props().x1)
          .to.equal(xScale(data[i].x));
        expect(node.findWhere((n) => n.key() === "crossRight").props().x2)
          .to.equal(positiveErrorX);
        expect(node.findWhere((n) => n.key() === "crossRight").props().y1)
          .to.equal(yScale(data[i].y));
        expect(node.findWhere((n) => n.key() === "crossRight").props().y2)
          .to.equal(yScale(data[i].y));
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
            eventHandlers: { onClick: clickHandler }
          }]}
        />
      );
      const svg = wrapper.find("svg").at(0);
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
            eventHandlers: { onClick: clickHandler }
          }]}
        />
      );
      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, index) => {
        const initialProps = Data.at(index).props();
        // click the border line
        node.find("line").at(3).simulate("click");
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
            eventHandlers: { onClick: clickHandler }
          }]}
        />
      );
      const Data = wrapper.find(ErrorBar);
      Data.forEach((node, index) => {
        const initialProps = Data.at(index).props();
        // click the cross line
        node.find("line").at(7).simulate("click");
        expect(clickHandler.called).to.equal(true);
        // the first argument is the standard evt object
        expect(omit(clickHandler.args[index][1], ["events", "key"]))
          .to.eql(omit(initialProps, ["events", "key"]));
        expect(`${clickHandler.args[index][2]}`).to.eql(`${index}`);
      });
    });
  });
});
