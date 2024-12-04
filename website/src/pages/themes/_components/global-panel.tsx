import React from "react";
import Control from "./control";

type GlobalPanelProps = {
  title?: string;
  description?: string;
  fields: any[];
  themeConfig: any;
  updateThemeConfig: (config: any) => void;
};

const GlobalPanel = ({
  title,
  description,
  fields,
  themeConfig,
  updateThemeConfig,
}: GlobalPanelProps) => {
  return (
    <>
      {!!title && <h2 className="mb-0 text-xl font-bold">{title}</h2>}
      {!!description && (
        <p className="text-sm mb-4 text-grayscale-400">{description}</p>
      )}
      {fields.map((field, i) => {
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
    </>
  );
};
export default GlobalPanel;
