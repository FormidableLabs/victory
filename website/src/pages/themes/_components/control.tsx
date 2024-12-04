import React from "react";
import Select from "./select";
import Slider from "./slider";
import ColorPicker from "./color-picker";
import ColorScaleOptions from "./color-scale-options";
import { getConfigValue } from "../_utils";

export type ColorChangeArgs = {
  newColor?: string;
  index: number;
  colorScale: string;
};

const Control = ({
  type,
  field,
  themeConfig,
  updateThemeConfig,
  className,
}) => {
  const handleColorChange = ({
    newColor,
    index,
    colorScale,
  }: ColorChangeArgs) => {
    const updatedColors = themeConfig?.palette?.[colorScale]?.map((color, i) =>
      i === index ? newColor : color,
    );
    updateThemeConfig(`palette.${colorScale}`, updatedColors);
  };

  const handleChange = (newValue) => {
    updateThemeConfig(field.path, newValue);
  };

  const configValue = getConfigValue(themeConfig, field.path, field.default);

  switch (type) {
    case "colorScale":
      return (
        <ColorScaleOptions
          label={field.label}
          palette={themeConfig?.palette}
          colorScaleType={field.colorScaleType}
          onColorChange={handleColorChange}
        />
      );
    case "section":
      return (
        <section className="mt-4 mb-8">
          <h3 className="text-lg text-secondary mb-4">{field.label}</h3>
          {field.fields.map((subField, i) => (
            <Control
              key={subField.label + i}
              type={subField.type}
              field={subField}
              themeConfig={themeConfig}
              updateThemeConfig={updateThemeConfig}
              className={className}
            />
          ))}
        </section>
      );
    case "slider":
      return (
        <Slider
          id={field.label}
          key={field.label}
          label={field.label}
          value={configValue as number}
          unit={field.unit}
          onChange={handleChange}
          min={field.min}
          max={field.max}
          step={field.step}
          className={className}
        />
      );
    case "select":
      return (
        <Select
          id={field.label}
          key={field.label}
          label={field.label}
          value={configValue as string}
          onChange={handleChange}
          options={field.options}
          className={className}
          includeDefault
        />
      );
    case "colorPicker":
      return (
        <ColorPicker
          id={field.label}
          key={field.label}
          label={field.label}
          color={configValue as string}
          onColorChange={handleChange}
          className={className}
          showColorName
        />
      );
    default:
      return null;
  }
};

export default Control;
