import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryLabel, VictoryScatter } from "@/victory";
import { defaultScatterProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLabel> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLabel",
};

export const LineHeight: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            lineHeight={2}
            text={["single", "lineHeight", "value"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            lineHeight={[2]}
            text={["single array", "lineHeight", "value"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            lineHeight={[2, 1, 3]}
            text={["multi array", "lineHeight", "value"]}
            backgroundStyle={{ stroke: "blue", fill: "none" }}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            lineHeight={2}
            text={["single", "lineHeight", "value"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            lineHeight={[2]}
            text={["single array", "lineHeight", "value"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            lineHeight={[2, 1, 3]}
            text={["multi array", "lineHeight", "value"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            lineHeight={[2, 1, 3]}
            text={["测试汉字", "不在正常的 ASCII 范围内", "最后一行"]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
      <VictoryScatter
        {...defaultScatterProps}
        labelComponent={
          <VictoryLabel {...props}
            lineHeight={[2, 1, 3]}
            text={[
              "اختبار اللغات التي تُقرأ من اليمين إلى اليسار",
              "مثل العربية",
              "هناك أكثر من ذلك بكثير",
            ]}
            backgroundStyle={[{ stroke: "blue", fill: "none" }]}
          />
        }
      />
    </>
  ),
};

export default meta;
