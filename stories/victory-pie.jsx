import React from "react";
import { storiesOf, action } from "@kadira/storybook";
import { VictoryPie } from "../src";

storiesOf("VictoryPie", module)
  .add("by default", () => (
    <VictoryPie />
  ));
