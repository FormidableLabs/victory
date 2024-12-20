import React, { useId } from "react";
import Select from "./select";
import Slider from "./slider";
import ColorPicker from "./color-picker";
import ColorPaletteSelector from "./color-palette-selector";
import { getConfigValue } from "../_utils";
import { useTheme } from "../_providers/themeProvider";
import Accordion from "./accordion";
import ColorScaleOverrideSelector from "./color-scale-override-selector";
import PreviewColorScaleSelect from "./theme-preview/preview-color-scale-select";

export type ColorChangeArgs = {
  newColor?: string;
  index: number;
  colorScale: string;
};

type ControlProps = {
  type: string;
  control: any;
  className?: string;
};

const Control = ({ type, control, className }: ControlProps) => {
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
    updateCustomThemeConfig(control.path, newValue);
  };

  const configValue = getConfigValue(
    customThemeConfig,
    control.path,
    control.default,
  );

  const id = useId();

  switch (type) {
    case "accordion":
      return (
        <Accordion
          key={control.label}
          title={control.label}
          id={id}
          defaultOpen={control.defaultOpen}
        >
          {control.controls?.map((nestedControl, i) => (
            <Control
              key={nestedControl.label + i}
              type={nestedControl.type}
              control={nestedControl}
              className={className}
            />
          ))}
        </Accordion>
      );
    case "colorPalette":
      return (
        <ColorPaletteSelector
          label={control.label}
          value={control.value}
          palette={customThemeConfig?.palette}
          colorScaleType={control.colorScaleType}
          onColorChange={handleColorChange}
          className="my-4"
        />
      );
    case "section":
      return (
        <section className="mb-8">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-secondary mb-0">
              {control.label}
            </h3>
            {control.description && (
              <p className="text-sm text-grayscale-400">
                {control.description}
              </p>
            )}
          </div>
          {control.controls?.map((nestedControl, i) => (
            <Control
              key={nestedControl.label + i}
              type={nestedControl.type}
              control={nestedControl}
              className={className}
            />
          ))}
        </section>
      );
    case "slider":
      return (
        <Slider
          id={id}
          key={control.label}
          label={control.label}
          value={configValue as number}
          unit={control.unit}
          onChange={handleChange}
          min={control.min}
          max={control.max}
          step={control.step}
          className={className}
        />
      );
    case "select":
      return (
        <Select
          id={id}
          key={control.label}
          label={control.label}
          value={configValue as string}
          onChange={handleChange}
          options={control.options}
          className={className}
          includeDefault
        />
      );
    case "colorScale":
      return (
        <ColorScaleOverrideSelector
          id={id}
          label={control.label}
          value={configValue as string}
          onChange={handleChange}
          className={className}
          hideDefaultToggle={control.hideDefaultToggle}
        />
      );
    case "colorScalePreview":
      return (
        <PreviewColorScaleSelect
          key={control.label}
          label={control.label}
          className={className}
        />
      );
    case "colorPicker":
      return (
        <ColorPicker
          key={control.label}
          label={control.label}
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
