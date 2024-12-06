import React from "react";
import Control from "./control";

type GlobalPanelProps = {
  title?: string;
  description?: string;
  controls: any[];
};

const OptionsPanel = ({ title, description, controls }: GlobalPanelProps) => {
  return (
    <>
      {!!title && <h2 className="mb-0 text-xl font-bold">{title}</h2>}
      {!!description && (
        <p className="text-sm mb-4 text-grayscale-400">{description}</p>
      )}
      {controls.map((control, i) => {
        return (
          <Control
            key={control.label + i}
            type={control.type}
            control={control}
            className="mb-4"
          />
        );
      })}
    </>
  );
};
export default OptionsPanel;
