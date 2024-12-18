import React, { forwardRef } from "react";
import Select from "../select";
import { usePreviewOptions } from "../../_providers/previewOptionsProvider";
import { colorScaleOptions } from "../../_const";
import Toggle from "../toggle";

type Props = {
  isOpen: boolean;
};

export const Options = forwardRef<HTMLDivElement, Props>(({ isOpen }, ref) => {
  const { colorScale, updateColorScale, showTooltips, setShowTooltips } =
    usePreviewOptions();

  return (
    <div className="relative">
      {isOpen && (
        <div
          className="absolute w-[400px] right-0 mt-1 border border-grayscale-300 bg-white rounded-md z-50 p-4 shadow-md"
          ref={ref}
        >
          <h1 className="text-base font-bold mb-4">Preview Settings</h1>
          <Select
            id="color-scale-preview"
            label="Preview color scale"
            value={colorScale}
            onChange={updateColorScale}
            options={colorScaleOptions}
            includeDefault
            className="flex items-center justify-between my-2"
            size="sm"
          />
          <Toggle
            id="show-tooltips"
            label="Show tooltips instead of labels"
            checked={showTooltips}
            onChange={setShowTooltips}
            className="mt-4"
            size="sm"
          />
        </div>
      )}
    </div>
  );
});
