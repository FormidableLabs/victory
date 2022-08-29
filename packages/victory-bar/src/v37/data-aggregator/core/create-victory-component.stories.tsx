import React from "react";
import { createVictoryComponent } from "./create-victory-component";

export default {
  title: "v37/createVictoryComponent",
};

type ExternalPropType<T> = { EXPLICIT_TYPE_PARAM: T };
function externalPropType<T>() {
  return null as unknown as ExternalPropType<T>;
}

type ExampleProps = {
  title: string;
};

const ExampleComponent = createVictoryComponent(
  {
    displayName: "ExampleComponent",
    propTypes: {},
    defaultProps: {},
    normalizeProps: {
      TITLE: (props) => props.title.toUpperCase(),
    },
    aggregateProps: {
      totalCount: (myProps, allProps) => allProps.length,
      titles: (myProps, allProps) =>
        allProps.map((props) => props.title).join(", "),
      TITLES: (myProps, allProps) =>
        allProps.map((props) => props.TITLE).join(", "),
    },
  },
  ({ children, ...props }) => {
    const {
      title,
      TITLE,
      totalCount,
      titles,
      TITLES,
      // @ts-expect-error INVALID
      INVALID,
    } = props;

    return (
      <fieldset>
        <legend>{props.title}</legend>
        <pre>{JSON.stringify(props, null, 2)}</pre>
        <>{children}</>
      </fieldset>
    );
  },
);

export const Example = () => {
  return (
    <ExampleComponent title="Parent">
      <ExampleComponent title="Child">
        <ExampleComponent title="Grandchild" />
      </ExampleComponent>
      <ExampleComponent title="Child" />
    </ExampleComponent>
  );
};
