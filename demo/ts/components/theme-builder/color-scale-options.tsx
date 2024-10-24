import React from "react";
import { ThemeOption } from ".";
import { ColorScalePropType } from "victory-core";
import Select from "./select";
import { TiPencil } from "react-icons/ti";

type ColorChangeArgs = {
  event: React.ChangeEvent<HTMLInputElement>;
  index: number;
  colorScale: string;
};

type ColorScaleOptionsProps = {
  activeTheme?: ThemeOption;
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

type ColorPickerProps = {
  color: string;
  index: number;
  onColorChange: (args: ColorChangeArgs) => void;
  colorScale: string;
};

const ColorPicker = ({
  color,
  index,
  onColorChange,
  colorScale,
}: ColorPickerProps) => {
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);

  return (
    <div className={`color-picker ${isPickerOpen ? "open" : ""}`}>
      <label
        htmlFor={`color-${index}`}
        className="color-picker__label"
        style={{
          color,
        }}
      />
      <input
        id={`color-${index}`}
        className="color-picker__input"
        type="color"
        value={color}
        onChange={(event) => onColorChange({ event, index, colorScale })}
        onFocus={() => setIsPickerOpen(true)}
        onBlur={() => setIsPickerOpen(false)}
      />
      <div className="color-picker__icon">
        <TiPencil />
      </div>
    </div>
  );
};

const ColorScaleOptions = ({
  activeColorScale,
  activeTheme,
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
      <div className="color-scale__colors">
        {activeTheme?.config?.palette?.[activeColorScale as string]?.map(
          (color, i) => (
            <ColorPicker
              key={i}
              color={color}
              index={i}
              onColorChange={onColorChange}
              colorScale={activeColorScale as string}
            />
          ),
        )}
      </div>
    </section>
  );
};
export default ColorScaleOptions;
