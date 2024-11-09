import React from "react";
import { render, screen } from "@testing-library/react";

import { isCircle, isTriangle } from "../../../test/helpers";
import { VictoryLegend } from "./victory-legend";

describe("components/victory-legend", () => {
  const initialData = [
    {
      name: "Series 1",
      symbol: {
        type: "circle",
      },
    },
    {
      name: "Series 2",
      labels: {
        fill: "red",
      },
      symbol: {
        type: "triangleUp",
        fill: "blue",
      },
    },
  ];

  it("renders provided data correctly", () => {
    const { container } = render(<VictoryLegend data={initialData} />);
    const legendLabels = container.querySelectorAll("text");

    expect(legendLabels).toHaveLength(initialData.length);
  });

  it("has expected horizontal label position", () => {
    const { container } = render(
      <VictoryLegend data={initialData} orientation="horizontal" />,
    );

    const [label1, label2] = container.querySelectorAll("text");

    expect(label1.getAttribute("y")).toEqual(label2.getAttribute("y"));
  });

  it("has expected vertical symbol position", () => {
    const { container } = render(
      <VictoryLegend data={initialData} orientation="vertical" />,
    );

    const [label1, label2] = container.querySelectorAll("text");

    expect(label1.getAttribute("x")).toEqual(label2.getAttribute("x"));
  });

  describe("symbols", () => {
    const legendData = [
      {
        name: "Series 1",
        labels: {
          fontSize: 10,
        },
        symbol: {
          type: "circle",
          fill: "red",
        },
      },
      {
        name: "Long Series Name",
        labels: {
          fontSize: 12,
        },
        symbol: {
          type: "triangleUp",
          fill: "blue",
        },
      },
    ];

    it("has expected symbols length", () => {
      const { container } = render(<VictoryLegend data={legendData} />);
      const symbols = container.querySelectorAll("path");
      expect(symbols).toHaveLength(2);
    });

    it("has expected symbol colors", () => {
      const { container } = render(<VictoryLegend data={legendData} />);
      const symbols = container.querySelectorAll("path");

      symbols.forEach((symbol, index) => {
        const style = symbol.getAttribute("style");
        expect(style).toContain(legendData[index].symbol.fill);
      });
    });

    it("has expected symbol type", () => {
      const { container } = render(<VictoryLegend data={legendData} />);
      const [circleSymbol, triangleSymbol] = Array.from(
        container.querySelectorAll("path"),
      ).map((symbol) => symbol.getAttribute("d"));

      expect(isCircle(circleSymbol)).toBeTruthy();
      expect(isTriangle(triangleSymbol)).toBeTruthy();
    });
  });

  describe("legend style prop", () => {
    const legendData = [
      {
        name: "Thing 1",
      },
      {
        name: "Thing 2",
      },
    ];

    const styleObject = {
      data: {
        type: "triangleUp",
        fill: "green",
      },
      labels: {
        fontSize: 16,
      },
    };

    it("has expected symbol type", () => {
      const { container } = render(
        <VictoryLegend data={legendData} style={styleObject} />,
      );

      container.querySelectorAll("path").forEach((symbol) => {
        const svgPath = symbol.getAttribute("d");
        expect(isTriangle(svgPath)).toBeTruthy();
      });
    });

    it("has expected symbol colors", () => {
      const { container } = render(
        <VictoryLegend data={legendData} style={styleObject} />,
      );

      container.querySelectorAll("path").forEach((item) => {
        expect(item.getAttribute("style")).toContain(styleObject.data.fill);
      });
    });

    it("has expected label colors", () => {
      render(<VictoryLegend data={legendData} style={styleObject} />);

      legendData.forEach(({ name }) => {
        const label = screen.getByText(name);
        expect(label.getAttribute("style")).toContain("#252525");
      });
    });
  });

  describe("itemsPerRow", () => {
    const legendData = [
      {
        name: "Thing 1",
      },
      {
        name: "Thing 2",
      },
      {
        name: "Thing 3",
      },
      {
        name: "Thing 4",
      },
      {
        name: "Thing 5",
      },
      {
        name: "Thing 6",
      },
    ];

    const splitArrayAtIndex = (array, index) => {
      const half1 = array.slice(0, index);
      const half2 = array.slice(index, array.length);
      return [half1, half2];
    };

    it("aligns items in columns", () => {
      const { container } = render(
        <VictoryLegend data={legendData} itemsPerRow={3} />,
      );
      const labels = Array.from(container.querySelectorAll("text"));

      expect(labels).toHaveLength(6);

      const [column1, column2] = splitArrayAtIndex(labels, 3);

      // items line up between columns
      column1.forEach((item, index) => {
        const correspondingColumnItemY = column2[index].getAttribute("y");
        expect(item.getAttribute("y")).toEqual(correspondingColumnItemY);
      });
    });

    it("aligns items in rows", () => {
      const { container } = render(
        <VictoryLegend
          data={legendData}
          itemsPerRow={3}
          orientation="horizontal"
        />,
      );

      const labels = Array.from(container.querySelectorAll("text"));

      expect(labels).toHaveLength(6);

      const rows = splitArrayAtIndex(labels, 3);

      // each row is on the same y axis
      rows.forEach((row) => {
        const rowYValue = row[0].getAttribute("y");
        const allInSameRow = row.every(
          (item) => item.getAttribute("y") === rowYValue,
        );
        expect(allInSameRow).toBeTruthy();
      });
    });
  });
});
