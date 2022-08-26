import React from "react";
import { makeNestable } from "./vic-nestable";

export default {
  title: "VicNestable",
};

const VicNest = makeNestable(
  {
    displayName: "VicNest",
    getNormalizedProps: (props) => ({ TITLE: props.title.toUpperCase() }),
    getAggregateProps(allComponents, props) {
      return {
        totalCount: allComponents.length,
        titles: allComponents.map((props) => props.title).join(", "),
        TITLES: allComponents.map((props) => props.TITLE).join(", "),
      };
    },
  },
  ({ children, ...props }) => {
    return (
      <fieldset>
        <legend>{props.title}</legend>
        <pre>{JSON.stringify(props, null, 2)}</pre>
        {children}
      </fieldset>
    );
  },
);

export const Example = () => {
  return (
    <VicNest title="Parent">
      <VicNest title="Child">
        <VicNest title="Grandchild" />
      </VicNest>
      <VicNest title="Child" />
    </VicNest>
  );
};
