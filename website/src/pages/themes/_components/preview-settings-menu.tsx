import React from "react";
import Select from "./select";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";
import { colorScaleOptions } from "../_const";
import { FiSettings, FiX } from "react-icons/fi";

const PreviewSettingsMenu = () => {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = React.useState(false);
  const { colorScale, updateColorScale, showTooltips, setShowTooltips } =
    usePreviewOptions();

  const handleSettingsMenuToggle = () => {
    setIsSettingsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={handleSettingsMenuToggle}
        className="bg-transparent flex justify-center items-center cursor-pointer"
      >
        <FiSettings className="w-4 h-4 text-grayscale-800" />
      </button>
      {isSettingsMenuOpen && (
        <div className="absolute w-[400px] right-0 top-6 border border-grayscale-300 bg-white rounded-md z-10 p-4 shadow-sm">
          <button
            onClick={handleSettingsMenuToggle}
            className="absolute top-2 right-2 flex items-center justify-center p-1 rounded-full bg-grayscale-100"
          >
            <FiX className="w-4 h-4 text-grayscale-800" />
          </button>
          <h1 className="text-base font-bold mb-4">Preview Settings</h1>
          <Select
            id="color-scale"
            label="Choose Color Scale For Preview"
            value={colorScale}
            onChange={updateColorScale}
            options={colorScaleOptions}
            includeDefault
            className="w-1/3"
          />
          <fieldset className="p-0 m-0">
            <div className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id="show-tooltips"
                className="form-checkbox h-4 w-4 text-primary"
                checked={showTooltips}
                onChange={() => setShowTooltips(!showTooltips)}
              />
              <label htmlFor="show-tooltips" className="text-xs cursor-pointer">
                Show tooltips instead of labels
              </label>
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
};
export default PreviewSettingsMenu;
