import React from "react";
import Select from "./select";
import ColorPicker from "./color-picker";
import { ColorScalePropType, VictoryThemeDefinition } from "victory";
import { ColorChangeArgs } from "./control";

type ColorScaleOptionsProps = {
  palette?: VictoryThemeDefinition["palette"];
  activeColorScale?: ColorScalePropType;
  onColorChange: (args: ColorChangeArgs) => void;
  onColorScaleChange: (colorScale: string) => void;
};

const colorScales = [
  {
    label: "Qualitative",
    value: "qualitative",
  },
  {
    label: "Heatmap",
    value: "heatmap",
  },
  {
    label: "Warm",
    value: "warm",
  },
  {
    label: "Cool",
    value: "cool",
  },
  {
    label: "Red",
    value: "red",
  },
  {
    label: "Green",
    value: "green",
  },
];

const ColorScaleOptions = ({
  activeColorScale,
  palette,
  onColorChange,
  onColorScaleChange,
}: ColorScaleOptionsProps) => {
  return (
    <section>
      <Select
        id="color-scale-select"
        value={activeColorScale as string}
        onChange={onColorScaleChange}
        options={colorScales}
        label="Color Scale"
        className="mb-5"
      />
      <div className="flex flex-wrap gap-3">
        {palette?.[activeColorScale as string]?.map((color, i) => (
          <ColorPicker
            key={i}
            color={color}
            id={`color-${i}`}
            onColorChange={(newColor) =>
              onColorChange({
                newColor,
                index: i,
                colorScale: activeColorScale as string,
              })
            }
          />
        ))}
      </div>
    </section>
  );
};
export default ColorScaleOptions;
