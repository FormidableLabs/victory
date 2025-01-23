import { ReactElement } from "react";
import { ColorScalePropType, VictoryThemeDefinition } from "victory";
import { VictoryComponentType } from "../../_const";

type ExampleRenderProps = {
  colorScale: ColorScalePropType;
  labels: ({ datum }: { datum: any }) => string;
  labelComponent?: ReactElement | undefined;
  theme: VictoryThemeDefinition;
};

export type ExampleConfig = {
  key: VictoryComponentType;
  title: string;
  content: (props: ExampleRenderProps) => ReactElement;
  hasVictoryChart?: boolean;
};
