import React from "react";
import { ColorScalePropType, VictoryThemeDefinition } from "victory-core";
import Select from "./select";
import ColorPicker from "./color-picker";

export type ColorChangeArgs = {
  event: React.ChangeEvent<HTMLInputElement>;
  index: number;
  colorScale: string;
};

type ColorScaleOptionsProps = {
  palette?: VictoryThemeDefinition["palette"];
  activeColorScale?: ColorScalePropType;
  onColorChange: (args: ColorChangeArgs) => void;
  onColorScaleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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
      />
      <div className="flex flex-wrap gap-3 mb-5">
        {palette?.[activeColorScale as string]?.map((color, i) => (
          <ColorPicker
            key={i}
            color={color}
            id={`color-${i}`}
            onColorChange={(event) =>
              onColorChange({
                event,
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
