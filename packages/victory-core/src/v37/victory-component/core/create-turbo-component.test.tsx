import React from "react";
import { render } from "@testing-library/react";
import { createTurboComponent } from "./create-turbo-component";
import { TurboContainerProps } from "./with-turbo-container";
import { VictoryContainer } from "../../../victory-container/victory-container";

describe("createTurboComponent", () => {
  interface VicLineProps extends TurboContainerProps {
    title: string;
    fill: string;
  }
  const VicLine = createTurboComponent<VicLineProps>()(
    {
      displayName: "VicLine",
      propTypes: {},
      defaultProps: {
        title: "",
        fill: "",
        containerComponent: <VictoryContainer />,
      },
      normalizeProps: {},
      aggregateProps: {},
    },
    (props) => {
      return (
        <g>
          <text>{props.title}</text>
          <line fill={props.fill} />
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
