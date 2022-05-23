import React from "react";
import { renderInSvg } from "../../rendering-utils";
import { VictoryAccessibleGroup } from "victory-core";

describe("components/victory-accessible-group", () => {
  it("renders an g with an aria-label", () => {
    const { container } = renderInSvg(
      <VictoryAccessibleGroup aria-label="test-aria-label" />
    );
    expect(container.querySelector("g")).toMatchInlineSnapshot(`
      <g
        aria-label="test-aria-label"
        class="VictoryAccessibleGroup"
      />
    `);
  });

  it("renders an g with a tabIndex and className", () => {
    const { container } = renderInSvg(
      <VictoryAccessibleGroup tabIndex={5} className="accessibility" />
    );
    expect(container.querySelector("g")).toMatchInlineSnapshot(`
      <g
        class="accessibility"
        tabindex="5"
      />
    `);
  });

  it("renders an g with a desc node if given", () => {
    const { container } = renderInSvg(
      <VictoryAccessibleGroup
        aria-label="desc node tests"
        desc="test description"
        aria-describedby="describes group"
      />
    );
    expect(container.querySelector("g")).toMatchInlineSnapshot(`
      <g
        aria-describedby="describes group"
        aria-label="desc node tests"
        class="VictoryAccessibleGroup"
      >
        <desc
          id="describes group"
        >
          test description
        </desc>
      </g>
    `);
  });

  it("uses the desc getAttribute value for descId and aria-describedby if no aria-describedby getAttribute value", () => {
    const { container } = renderInSvg(
      <VictoryAccessibleGroup
        aria-label="desc node tests"
        desc="applies to both aria-describeby and descId"
      />
    );
    expect(container.querySelector("g")).toMatchInlineSnapshot(`
      <g
        aria-describedby="applies-to-both-aria-describeby-and-descId"
        aria-label="desc node tests"
        class="VictoryAccessibleGroup"
      >
        <desc
          id="applies-to-both-aria-describeby-and-descId"
        >
          applies to both aria-describeby and descId
        </desc>
      </g>
    `);
  });
});
