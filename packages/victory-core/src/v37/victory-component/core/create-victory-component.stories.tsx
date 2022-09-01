import React from "react";
import { createTurboComponent } from "./create-turbo-component";
import { TurboContainerProps } from "./with-turbo-container";
import { VictoryContainer } from "../../../victory-container/victory-container";

export default {
  title: "v37/createTurboComponent",
};

type ExampleProps = React.PropsWithChildren<
  {
    title: string;
    optionalProp?: boolean;
    defaultedProp: boolean;
  } & TurboContainerProps
>;

const ExampleComponent = createTurboComponent<ExampleProps>()(
  {
    displayName: "ExampleComponent",
    propTypes: {},
    defaultProps: {
      title: "Default Title",
      defaultedProp: true,
      containerComponent: <VictoryContainer />,
    },
    normalizeProps: {
      TITLE: (props) => props.title.toUpperCase(),
    },
    aggregateProps: {
      totalCount: (myProps, allProps) => allProps.length,
      titles: (myProps, allProps) =>
        allProps.map((props) => (props as ExampleProps).title).join(", "),
      TITLES: (myProps, allProps) =>
        allProps.map((props) => (props as { TITLE: string }).TITLE).join(", "),
    },
  },
  ({ children, ...props }) => {
    const {
      title,
      TITLE,
      optionalProp,
      defaultedProp,
      totalCount,
      titles,
      TITLES,
      // @ts-expect-error INVALID
      INVALID,
    } = props;

    return (
      <g>
        <text>{props.title}</text>
        <text>{JSON.stringify(props, null, 2)}</text>
        <>{children}</>
      </g>
    );
  },
);

export const Example = () => {
  return (
    <ExampleComponent title="Parent" optionalProp>
      <ExampleComponent title="Child">
        <ExampleComponent title="Grandchild" />
      </ExampleComponent>
      <ExampleComponent title="Child" />
    </ExampleComponent>
  );
};
