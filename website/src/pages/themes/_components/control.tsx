import React from "react";
import Select from "./select";
import Slider from "./slider";
import ColorPicker from "./color-picker";
import ColorScaleOptions from "./color-scale-options";
import { getConfigValue } from "../_utils";
import { useTheme } from "../_providers/themeProvider";
import Accordion from "./accordion";

export type ColorChangeArgs = {
  newColor?: string;
  index: number;
  colorScale: string;
};

const Control = ({ type, field, className }) => {
  const { customThemeConfig, updateCustomThemeConfig } = useTheme();
  const handleColorChange = ({
    newColor,
    index,
    colorScale,
  }: ColorChangeArgs) => {
    const updatedColors = customThemeConfig?.palette?.[colorScale]?.map(
      (color, i) => (i === index ? newColor : color),
    );
    updateCustomThemeConfig(`palette.${colorScale}`, updatedColors);
  };

  const handleChange = (newValue) => {
    updateCustomThemeConfig(field.path, newValue);
  };

  const configValue = getConfigValue(
    customThemeConfig,
    field.path,
    field.default,
  );

  switch (type) {
    case "accordion":
      return (
        <Accordion
          key={field.label}
          title={field.label}
          id={field.label}
          defaultOpen={field.defaultOpen}
        >
          {field.fields.map((subField, i) => (
            <Control
              key={subField.label + i}
              type={subField.type}
              field={subField}
              className={className}
            />
          ))}
        </Accordion>
      );
    case "colorScale":
      return (
        <ColorScaleOptions
          label={field.label}
          palette={customThemeConfig?.palette}
          colorScaleType={field.colorScaleType}
          onColorChange={handleColorChange}
        />
      );
    case "section":
      return (
        <section className="mb-8">
          <h3 className="text-lg text-secondary mb-4">{field.label}</h3>
          {field.fields.map((subField, i) => (
            <Control
              key={subField.label + i}
              type={subField.type}
              field={subField}
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
