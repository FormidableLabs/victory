import React from "react";
import { render } from "@testing-library/react";
import { VicLine } from "./vic-line";

describe("VicLine", () => {
  it("should render", () => {
    const res = render(<VicLine />);
    expect(res.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="VictoryContainer"
          style="pointer-events: none; position: relative; width: 100%; height: 100%;"
        >
          <svg
            height="300"
            role="img"
            style="pointer-events: all; width: 100%; height: 100%;"
            viewBox="0 0 450 300"
            width="450"
          >
            <g>
              <text
                data-testid="debug-dump"
              />
              <path
                d="M-125,250L50,221.42857142857144L225,164.28571428571428L400,50"
                style="fill: none; stroke: black;"
              />
            </g>
          </svg>
          <div
            style="z-index: 99; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"
          >
            <svg
              height="300"
              style="overflow: visible; width: 100%; height: 100%;"
              viewBox="0 0 450 300"
              width="450"
            />
          </div>
        </div>
      </div>
    `);
  });
});
