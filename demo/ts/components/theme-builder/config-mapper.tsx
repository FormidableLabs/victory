import React from "react";
import optionsConfig from "./options-config";
import Accordion from "./accordion";
import Select from "./select";
import Slider from "./slider";
import ColorPicker from "./color-picker";

const ConfigMapper = ({
  activeColorScale,
  handleColorScaleChange,
  handleLabelConfigChange,
}) => {
  return (
    <>
      {optionsConfig.map((section) => (
        <Accordion key={section.title} title={section.title} id={section.title}>
          {section.fields.map((field) => {
            if (field.type === "colorScale") {
              return (
                <Select
                  key={field.label}
                  id="color-scale-select"
                  value={activeColorScale}
                  onChange={handleColorScaleChange}
                  options={field.options}
                  label={field.label}
                />
              );
            }
            if (field.type === "slider") {
              return (
                <Slider
                  id={field.label}
                  key={field.label}
                  label={field.label}
                  defaultValue={field.default}
                  unit={field.unit}
                  onChange={(value) =>
                    handleLabelConfigChange({ [field.label]: value })
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
                  color={field.default}
                  onColorChange={(color) =>
                    handleLabelConfigChange({ [field.label]: color })
                  }
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
