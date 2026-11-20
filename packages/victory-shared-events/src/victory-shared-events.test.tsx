import { render } from "@testing-library/react";
import React from "react";

import { VictorySharedEvents } from "./victory-shared-events";

describe("victory-shared-events", () => {
  it("renders children in groupComponent without events or container", () => {
    const { container } = render(
      <svg>
        <VictorySharedEvents>
          <rect data-testid="child" />
        </VictorySharedEvents>
      </svg>,
    );
    const group = container.querySelector("svg > g");
    expect(group).not.toBeNull();
    expect(group?.querySelector("[data-testid='child']")).not.toBeNull();
  });

  it("renders children in a custom groupComponent without events or container", () => {
    const { container } = render(
      <svg>
        <VictorySharedEvents groupComponent={<g data-testid="group" />}>
          <rect data-testid="child" />
        </VictorySharedEvents>
      </svg>,
    );
    const group = container.querySelector("[data-testid='group']");
    expect(group).not.toBeNull();
    expect(group?.querySelector("[data-testid='child']")).not.toBeNull();
  });

  it("renders children in container without events", () => {
    const { container } = render(
      <svg>
        <VictorySharedEvents container={<g data-testid="container" />}>
          <rect data-testid="child" />
        </VictorySharedEvents>
      </svg>,
    );
    const group = container.querySelector("[data-testid='container']");
    expect(group).not.toBeNull();
    expect(group?.querySelector("[data-testid='child']")).not.toBeNull();
  });
});
