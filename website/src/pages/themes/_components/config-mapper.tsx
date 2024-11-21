import React from "react";
import optionsConfig from "../_config";
import Accordion from "./accordion";
import Select from "./select";
import Slider from "./slider";
import ColorPicker from "./color-picker";
import ColorScaleOptions from "./color-scale-options";
import { getConfigValue } from "../_utils";

const ControlComponent = ({
  type,
  field,
  themeConfig,
  updateThemeConfig,
  activeColorScale,
  handleColorScaleChange,
  className,
}) => {
  const handleColorChange = ({ newColor, index, colorScale }) => {
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
          palette={themeConfig?.palette}
          activeColorScale={activeColorScale}
          onColorChange={handleColorChange}
          onColorScaleChange={handleColorScaleChange}
        />
      );
    case "section":
      return (
        <section className="mb-6">
          <h3 className="text-lg text-secondary font-bold mb-4">
            {field.label}
          </h3>
          {field.fields.map((subField, i) => (
            <ControlComponent
              key={subField.label + i}
              type={subField.type}
              field={subField}
              themeConfig={themeConfig}
              updateThemeConfig={updateThemeConfig}
              activeColorScale={activeColorScale}
              handleColorScaleChange={handleColorScaleChange}
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

const ConfigMapper = ({
  themeConfig,
  activeColorScale,
  updateThemeConfig,
  handleColorScaleChange,
}) => {
  return (
    <>
      {optionsConfig.map((section, index) => (
        <Accordion
          key={section.title}
          title={section.title}
          id={section.title}
          defaultOpen={index === 0}
        >
          {section.fields.map((field, i) => {
            return (
              <ControlComponent
                key={field.label + i}
                type={field.type}
                field={field}
                themeConfig={themeConfig}
                updateThemeConfig={updateThemeConfig}
                activeColorScale={activeColorScale}
                handleColorScaleChange={handleColorScaleChange}
                className="mb-4"
              />
            );
          })}
        </Accordion>
      ))}
    </>
  );
};

export default ConfigMapper;
