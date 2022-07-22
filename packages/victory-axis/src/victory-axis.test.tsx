import React from "react";
import { VictoryAxis } from "victory-axis";
import { VictoryChart } from "victory-chart";
import { render, screen } from "@testing-library/react";

describe("components/victory-axis", () => {
  it("should render two axes by default", () => {
    const chartProps = {
      defaultAxes: {
        independent: <VictoryAxis data-testid="axis" />,
        dependent: <VictoryAxis data-testid="axis" dependentAxis />
      },
    };
    render(<VictoryChart {...chartProps} />);

    const axes = screen.getAllByTestId("axis");

    expect(axes).toHaveLength(2);
  })
})
