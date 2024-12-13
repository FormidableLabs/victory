import React from "react";
import Control from "./control";
import Select from "./select";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";
import { chartOptionsConfig } from "../_config";
import PanelHeader from "./panel-header";

const ChartPanel = () => {
  const [chartType, setChartType] = React.useState("");
  const { setExampleConfigs } = usePreviewOptions();
  const selectOptions = Object.keys(chartOptionsConfig).map((key) => ({
    label: chartOptionsConfig[key].label,
    value: key,
  }));
  const options = [
    { label: "Select a chart type", value: "" },
    ...selectOptions,
  ];
  const controls = chartOptionsConfig[chartType]?.controls || [];

  const onChartTypeChange = (newValue: string) => {
    setChartType(newValue);
    const examples = chartOptionsConfig[newValue]
      ? [chartOptionsConfig[newValue]]
      : [];
    setExampleConfigs(examples);
  };

  return (
    <>
      <PanelHeader
        title="Chart Options"
        description="Select a chart type to begin customizing."
      />
      <Select
        id="chart-type-select"
        value={chartType}
        onChange={onChartTypeChange}
        options={options}
        label="Chart Type"
        className="mt-4 mb-8"
      />
      {controls.map((control, i) => {
        return (
          <Control
            key={control.label + i}
            type={control.type}
            control={control}
            className="my-4"
          />
        );
      })}
    </>
  );
};
export default ChartPanel;
