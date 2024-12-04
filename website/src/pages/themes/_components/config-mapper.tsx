import React from "react";
import optionsConfig from "../_config";
import Accordion from "./accordion";
import Control from "./control";

const ConfigMapper = ({
  themeConfig,
  activeColorScale,
  updateThemeConfig,
  handleColorScaleChange,
}) => {
  return (
    <>
      {optionsConfig.map((section, index) => (
        <Accordion
          key={section.title}
          title={section.title}
          id={section.title}
          defaultOpen={index === 0}
        >
          {section.fields.map((field, i) => {
            return (
              <Control
                key={field.label + i}
                type={field.type}
                field={field}
                themeConfig={themeConfig}
                updateThemeConfig={updateThemeConfig}
                className="mb-4"
              />
            );
          })}
        </Accordion>
      ))}
    </>
  );
};

export default ConfigMapper;
