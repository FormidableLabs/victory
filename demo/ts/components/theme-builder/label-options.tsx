import React from "react";
import { LabelProps } from "victory-core";
import Slider from "./slider";
import ColorPicker from "./color-picker";

type LabelOptionsProps = {
  labelConfig?: LabelProps;
  onLabelConfigChange: (labelConfig: LabelProps) => void;
};

const LabelOptions = ({
  labelConfig,
  onLabelConfigChange,
}: LabelOptionsProps) => {
  if (!labelConfig) return null;
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Axis Label Options</h3>
      <Slider
        label="Font Size"
        id="font-size"
        defaultValue={labelConfig?.fontSize}
        onChange={(event) =>
          onLabelConfigChange({ fontSize: parseInt(event.target.value) })
        }
      />
      <Slider
        label="Padding"
        id="padding"
        defaultValue={labelConfig?.padding}
        onChange={(event) =>
          onLabelConfigChange({ padding: parseInt(event.target.value) })
        }
      />
      <div>
        <ColorPicker
          color={labelConfig?.fill as string}
          id="label-fill"
          showColorName
          label="Fill"
          onColorChange={(event) =>
            onLabelConfigChange({ fill: event.target.value })
          }
        />
      </div>
    </div>
  );
};
export default LabelOptions;
