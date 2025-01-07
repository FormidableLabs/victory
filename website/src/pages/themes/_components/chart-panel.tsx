import React, { useEffect, useMemo } from "react";
import Control from "./control";
import Select from "./select";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";
import { ChartPanelConfig } from "../_config";
import PanelHeader from "./panel-header";

type ChartPanelProps = {
  config: ChartPanelConfig;
};

const ChartPanel = ({
  config: { title, description, selectLabel, types },
}: ChartPanelProps) => {
  const [chartType, setChartType] = React.useState(Object.keys(types)[0]);
  const { setExampleContent } = usePreviewOptions();
  const selectOptions = Object.keys(types).map((key) => ({
    label: types[key].label,
    value: key,
  }));
  const options = useMemo(
    () => [
      { label: `Select ${selectLabel.toLowerCase()}`, value: "" },
      ...selectOptions,
    ],
    [selectOptions, selectLabel],
  );
  const controls = types[chartType]?.controls || [];

  const onChartTypeChange = (newValue: string) => {
    setChartType(newValue);
  };

  useEffect(() => {
    const examples = types[chartType]?.content || [];
    setExampleContent(examples);
  }, [chartType, setExampleContent, types]);

  return (
    <>
      <PanelHeader title={title} description={description} />
      <Select
        id="chart-type-select"
        value={chartType}
        onChange={onChartTypeChange}
        options={options}
        label={selectLabel}
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