import React from "react";
import Control from "./control";
import Select from "./select";

type OverridePanelProps = {
  title?: string;
  description?: string;
  fields: any[];
  themeConfig: any;
  updateThemeConfig: (path: string | string[], newValue: unknown) => void;
};

const OverridePanel = ({
  title,
  description,
  optionsConfig,
  themeConfig,
  updateThemeConfig,
  selectedOption,
  onSelectionChange,
}: OverridePanelProps) => {
  const selectOptions = Object.keys(optionsConfig?.types).map((key) => ({
    label: optionsConfig?.types[key].title,
    value: key,
  }));
  const options = [{ label: "Select an option", value: "" }, ...selectOptions];
  const fields = optionsConfig?.types[selectedOption]?.fields || [];
  return (
    <>
      {!!title && <h2 className="mb-0 text-xl font-bold">{title}</h2>}
      {!!description && (
        <p className="text-sm mb-4 text-grayscale-400">{description}</p>
      )}
      <Select
        id="theme-select"
        value={selectedOption}
        onChange={onSelectionChange}
        options={options}
        label="Axis Type"
        className="mt-4 mb-8"
      />
      {fields.map((field, i) => {
        return (
          <Control
            key={field.label + i}
            type={field.type}
            field={field}
            themeConfig={themeConfig}
            updateThemeConfig={updateThemeConfig}
            className="mb-4"
          />
        );
      })}
    </>
  );
};
export default OverridePanel;
