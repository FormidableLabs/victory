import { ReactElement } from "react";
import { ColorScalePropType, VictoryThemeDefinition } from "victory";

type ExampleRenderProps = {
  colorScale: ColorScalePropType;
  labels: ({ datum }: { datum: any }) => string;
  labelComponent?: ReactElement | undefined;
  theme: VictoryThemeDefinition;
};

export type ExampleConfig = {
  title: string;
  content: (props: ExampleRenderProps) => ReactElement;
  hasVictoryChart?: boolean;
};
