import React from "react";
import { render } from "@testing-library/react";
import { createTurboComponent } from "./create-turbo-component";
import { TurboContainerProps } from "./with-turbo-container";
import { VictoryContainer, LineHelpers } from "../../../index";
import { TurboDataProps } from "../utils/props";
import { Clone } from "../../clone";
import { AggregateProps, NormalizeProps } from "../utils/aggregate-props";
import { Curve } from "victory-line";

describe("createTurboComponent", () => {
  interface VicLineProps<TDatum = any>
    extends TurboContainerProps,
      TurboDataProps<TDatum> {
    title: string;
    fill: string;
  }
  const VicLine = createTurboComponent<VicLineProps>()(
    {
      displayName: "VicLine",
      propTypes: {},
      defaultProps: {
        title: "?",
        fill: "?",
        containerComponent: <VictoryContainer />,
        dataComponent: <Curve />,
        data: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
        ],
      },
      normalizeProps: {
        ...NormalizeProps,
      },
      aggregateProps: {
        ...AggregateProps,
      },
    },
    (props) => {
      const lineFunction = LineHelpers.getLineFunction(props);
      const d = lineFunction(props.data as any);
      return (
        <g>
          <text>{props.title}</text>
          <Clone element={props.dataComponent} d={d} fill={props.fill} />
        </g>
      );
    },
  );

  it("should render inside an SVG", () => {
    const result = render(
      <VicLine data-testid="test" title="test-title" fill="test-fill" />,
    );
    const svg = result.getByTestId("test");
    expect(svg).toMatchInlineSnapshot(`
      <svg
        aria-labelledby="victory-container-1-title"
        data-testid="test"
        role="img"
        style="pointer-events: all; width: 100%; height: 100%;"
        viewBox="0 0 undefined undefined"
      >
        <title
          id="victory-container-1-title"
        >
          test-title
        </title>
        <g>
          <text>
            test-title
          </text>
          <line
            fill="test-fill"
          />
        </g>
      </svg>
    `);
  });
});
