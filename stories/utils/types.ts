import type React from "react";

// The subset of Storybook's CSF types (`Meta`, `StoryObj`) that the stories
// use. Each story file default-exports a `Meta` and exports one story, which
// renders `args` (global, then meta, then story args) inside the decorators.

type ComponentArgs<T> = T extends React.ComponentType<infer P> ? P : T;

export type Decorator = (story: () => React.ReactNode) => React.ReactNode;

export interface Meta<T = Record<string, unknown>> {
  title?: string;
  component?: React.ComponentType<any>;
  args?: Partial<ComponentArgs<T>>;
  // Storybook controls; kept as documentation of each story's props.
  argTypes?: Record<string, unknown>;
  decorators?: Decorator[];
}

export interface StoryObj<TArgs = Record<string, unknown>> {
  args?: Partial<TArgs>;
  render: (args: TArgs) => React.ReactNode;
}
