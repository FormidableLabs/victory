import React from "react";
import optionsConfig from "./options-config";
import Accordion from "./accordion";
import Select from "./select";
import Slider from "./slider";
import ColorPicker from "./color-picker";
import ColorScaleOptions from "./color-scale-options";
import { getConfigValue } from "./utils";

const ConfigMapper = ({
  themeConfig,
  activeColorScale,
  updateThemeConfig,
  handleColorScaleChange,
}) => {
  const handleColorChange = ({ newColor, index, colorScale }) => {
    const updatedColors = themeConfig?.palette?.[colorScale]?.map((color, i) =>
      i === index ? newColor : color,
    );
    updateThemeConfig(`palette.${colorScale}`, updatedColors);
  };

  return (
    <>
      {optionsConfig.map((section, index) => (
        <Accordion
          key={section.title}
          title={section.title}
          id={section.title}
          defaultOpen={index === 0}
        >
          {section.fields.map((field) => {
            if (field.type === "colorScale") {
              return (
                <ColorScaleOptions
                  key={field.label}
                  activeColorScale={activeColorScale}
                  palette={themeConfig?.palette}
                  onColorChange={handleColorChange}
                  onColorScaleChange={handleColorScaleChange}
                />
              );
            }
            const configValue = getConfigValue(themeConfig, field.path);
            if (field.type === "slider") {
              return (
                <Slider
                  id={field.label}
                  key={field.label}
                  label={field.label}
                  value={configValue as number}
                  unit={field.unit}
                  onChange={(newValue) =>
                    updateThemeConfig(field.path, newValue)
                  }
                />
              );
            }
            if (field.type === "select") {
              return (
                <Select
                  id={field.label}
                  key={field.label}
                  label={field.label}
                  value={configValue as string}
                  options={field.options}
                  onChange={(newValue) =>
                    updateThemeConfig(field.path, newValue)
                  }
                />
              );
            }
            if (field.type === "colorPicker") {
              return (
                <ColorPicker
                  id={field.label}
                  key={field.label}
                  label={field.label}
                  color={configValue as string}
                  onColorChange={(newColor) =>
                    updateThemeConfig(field.path, newColor)
                  }
                  showColorName
                />
              );
            }
            return null;
          })}
        </Accordion>
      ))}
    </>
  );
};

export default ConfigMapper;
