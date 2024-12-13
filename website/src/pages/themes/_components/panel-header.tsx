import React from "react";

type PanelHeaderProps = {
  title?: string;
  description?: string;
};

const PanelHeader = ({ title, description }: PanelHeaderProps) => {
  return (
    <div className="mb-4">
      {!!title && <h2 className="mb-0 text-xl font-bold">{title}</h2>}
      {!!description && (
        <p className="text-sm mt-1 text-grayscale-400">{description}</p>
      )}
    </div>
  );
};
export default PanelHeader;
