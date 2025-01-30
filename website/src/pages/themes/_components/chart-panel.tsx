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
  const { activeChartType, setActiveChartType, setExampleContent } =
    usePreviewOptions();

  useEffect(() => {
    const newChartType = Object.keys(types)[0];
    setActiveChartType((prevChartType) =>
      prevChartType === null ? newChartType : prevChartType,
    );
  }, [types, setActiveChartType]);

  useEffect(() => {
    const examples = types[activeChartType]?.content ?? [];
    setExampleContent(examples);
  }, [types, activeChartType, setExampleContent]);

  const options = useMemo(
    () =>
      Object.keys(types).map((key) => ({
        label: types[key].label,
        value: key,
      })),
    [types],
  );
  const controls = useMemo(
    () => types[activeChartType]?.controls || [],
    [types, activeChartType],
  );

  const onChartTypeChange = (newValue: string) => {
    setActiveChartType(newValue);
  };

  return (
    <>
      <PanelHeader title={title} description={description} />
      <Select
        id="chart-type-select"
        value={activeChartType}
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
          />
        );
      })}
    </>
  );
};
export default ChartPanel;
