import React, { useEffect, useRef } from "react";
import Select from "./select";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";
import { colorScaleOptions } from "../_const";
import { FiSettings, FiX } from "react-icons/fi";
import Toggle from "./toggle";

type PreviewSettingsMenuProps = {
  showColorScaleOptions: boolean;
};

const PreviewSettingsMenu = ({
  showColorScaleOptions = false,
}: PreviewSettingsMenuProps) => {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = React.useState(false);
  const { colorScale, updateColorScale, showTooltips, setShowTooltips } =
    usePreviewOptions();

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsSettingsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isSettingsMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingsMenuOpen]);

  const handleSettingsMenuToggle = () => {
    setIsSettingsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={handleSettingsMenuToggle}
        className="bg-transparent flex justify-center items-center cursor-pointer text-grayscale-800 hover:text-grayscale-400"
      >
        <FiSettings className="w-4 h-4" />
      </button>
      {isSettingsMenuOpen && (
        <div
          className="absolute w-[400px] right-0 top-6 border border-grayscale-300 bg-white rounded-md z-50 p-4 shadow-md"
          ref={menuRef}
        >
          <button
            onClick={handleSettingsMenuToggle}
            className="absolute top-2 right-2 flex items-center justify-center p-1 rounded-full bg-grayscale-100 cursor-pointer"
          >
            <FiX className="w-4 h-4 text-grayscale-800" />
          </button>
          <h1 className="text-base font-bold mb-4">Preview Settings</h1>
          {showColorScaleOptions && (
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
          )}
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
};
export default PreviewSettingsMenu;
