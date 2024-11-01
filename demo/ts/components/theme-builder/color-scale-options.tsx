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
    <div className="relative group">
      <label
        htmlFor={`color-${index}`}
        className="block w-[40px] h-[40px] rounded-full border-2 border-transparent cursor-pointer transition-all justify-center items-center after:content-[''] after:block after:w-full after:h-full after:rounded-[inherit] after:bg-currentColor"
        style={{
          color,
        }}
      />
      <input
        id={`color-${index}`}
        className={`absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-10 group-hover:border-currentColor ${
          isPickerOpen ? "border-currentColor" : ""
        }`}
        type="color"
        value={color}
        onChange={(event) => onColorChange({ event, index, colorScale })}
        onFocus={() => setIsPickerOpen(true)}
        onBlur={() => setIsPickerOpen(false)}
      />
      <div
        className={`absolute top-0 left-0 w-full h-full text-white flex justify-center items-center text-xl rounded-full opacity-0 group-hover:opacity-100 ${
          isPickerOpen ? "opacity-100" : ""
        }`}
      >
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
      <div className="flex flex-wrap gap-3 mb-5">
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
