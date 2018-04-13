/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import {
  VictoryBar, VictoryScatter, VictoryLine, VictoryChart, VictoryAxis, VictoryBoxPlot
} from "../src/index";
import { VictoryTheme } from "victory-core";
import { getData, getFourQuadrantData, getArrayData } from "./data";
import { ignoredDecorator } from "./decorators";

storiesOf("VictoryChart/static/default", module)
  .add("VictoryChart", () => <VictoryChart/>);

storiesOf("VictoryChart/static/theme", module)
  .add("material theme", () => <VictoryChart theme={VictoryTheme.material}/>)
  .add("four quadrant material theme", () => (
    <VictoryChart theme={VictoryTheme.material} domain={[-1, 1]}/>
  ))
  .add("grayscale theme", () => <VictoryChart theme={VictoryTheme.grayscale}/>)
  .add("four quadrant grayscale theme", () => (
    <VictoryChart theme={VictoryTheme.grayscale} domain={[-1, 1]}/>
  ));

storiesOf("VictoryChart/static/axes", module)
  .add("with a single axis", () => (
    <VictoryChart>
      <VictoryAxis/>
    </VictoryChart>
  ))
  .add("with a single dependent axis", () => (
    <VictoryChart>
      <VictoryAxis dependentAxis/>
    </VictoryChart>
  ));

storiesOf("VictoryChart/static/domainPadding", module)
  .add("single value domainPadding", () => (
    <VictoryChart domainPadding={25}>
      <VictoryBar data={getData(5)}/>
    </VictoryChart>
  ))
  .add("single value domainPadding (horizontal)", () => (
    <VictoryChart domainPadding={25}>
      <VictoryBar horizontal data={getData(5)}/>
    </VictoryChart>
  ))
  .add("object domainPadding", () => (
    <VictoryChart domainPadding={{ x: [25, 0], y: 25 }}>
      <VictoryBar data={getData(5)}/>
    </VictoryChart>
  ))
  .add("object domainPadding (horizontal)", () => (
    <VictoryChart domainPadding={{ x: 25, y: [25, 0] }}>
      <VictoryBar horizontal data={getData(5)}/>
    </VictoryChart>
  ));

storiesOf("VictoryChart/static/domain", module)
  .add("array domain", () => (
    <VictoryChart domain={[0, 10]}>
      <VictoryBar data={getData(5)}/>
    </VictoryChart>
  ))
  .add("array domain (horizontal)", () => (
    <VictoryChart domain={[0, 10]}>
      <VictoryBar horizontal data={getData(5)}/>
    </VictoryChart>
  ))
  .add("object domain", () => (
    <VictoryChart domain={{ x: [0, 6], y: [0, 10] }}>
      <VictoryBar data={getData(5)}/>
    </VictoryChart>
  ))
  .add("object domain (horizontal)", () => (
    <VictoryChart domain={{ x: [0, 10], y: [0, 6] }}>
      <VictoryBar horizontal data={getData(5)}/>
    </VictoryChart>
  ));

storiesOf("VictoryChart/static/calculated domain", module)
  .add("from data", () => (
    <VictoryChart>
      <VictoryScatter size={5} symbol="plus" data={getData(10)}/>
      <VictoryScatter size={5} symbol="triangleUp" data={getFourQuadrantData(10)}/>
      <VictoryLine samples={100} y={(d) => 10 * Math.sin(13 * Math.PI * d.x)}/>
    </VictoryChart>
  ))
  .add("from data and axes", () => (
    <VictoryChart>
      <VictoryAxis tickValues={[-10, -5, 5, 10]}/>
      <VictoryAxis dependentAxis tickValues={[-5, 5]}/>
      <VictoryScatter data={getData(10)}/>
      <VictoryLine samples={150} y={(d) => Math.sin(Math.PI * d.x)}/>
    </VictoryChart>
  ))
  .add("from categorical data sources", () => (
    <VictoryChart domainPadding={25}>
      <VictoryScatter
        size={6}
        symbol="star"
        data={[
          { x: "cat", y: 2 },
          { x: "dog", y: 3 },
          { x: "bird", y: 1 },
          { x: "frog", y: 4 }
        ]}
      />
      <VictoryScatter
        size={6}
        symbol="square"
        data={[
          { x: "cat", y: 3 },
          { x: "mouse", y: 3 },
          { x: "bird", y: 5 },
          { x: "frog", y: 7 },
          { x: "dog", y: 1 }
        ]}
      />
    </VictoryChart>
  ))
  .add("from atypical data sources", () => (
    <VictoryChart>
      <VictoryBoxPlot data={getArrayData(5)}/>
      <VictoryLine samples={100} y={(d) => 5 + 3 * Math.sin(Math.PI * d.x)}/>
    </VictoryChart>
  ));

storiesOf("VictoryChart/static/style", module)
  .add("with parent styles", () => (
    <VictoryChart
      style={{
        parent: { border: "2px solid #000", margin: 20, backgroundColor: "cyan" }
      }}
    />
  ));

storiesOf("VictoryChart/issues", module)
  .addDecorator(ignoredDecorator)
  .add("placeholder", () => <VictoryChart/>);
storiesOf("VictoryChart/fixed", module)
  .add("placeholder", () => <VictoryChart/>);


