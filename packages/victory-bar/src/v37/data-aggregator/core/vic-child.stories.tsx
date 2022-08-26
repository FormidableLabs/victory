import React from "react";
import { VicParent } from "./vic-parent";
import { wrapVictoryChild } from "./vic-child";

export default {
  title: "VIC-EXAMPLE",
};

const VicExample = wrapVictoryChild(
  {
    displayName: "VicExample",
  },
  (props: React.PropsWithChildren<{ foo?: string }>) => {
    return (
      <>
        <h2>VicExample</h2>
        <pre>{JSON.stringify(props, null, 2)}</pre>
        {props.children}
      </>
    );
  },
);

const data1 = [
  { x: 0, y: 0 },
  { x: 5, y: 10 },
  { x: 10, y: 25 },
];
const data2 = [
  { x: 0, y: -1 },
  { x: 1, y: 1 },
];

export const Example = () => {
  return (
    <VicParent foo={"PARENT"}>
      <VicExample foo={"CHILD 1"} data={data1} />
      <VicExample foo={"CHILD 2"} data={data2} />
    </VicParent>
  );
};
