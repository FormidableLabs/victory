import React from "react";

type PanelHeaderProps = {
  title?: string;
  description?: string;
};

const PanelHeader = ({ title, description }: PanelHeaderProps) => {
  return (
    <>
      {!!title && <h2 className="mb-0 text-xl font-bold">{title}</h2>}
      {!!description && (
        <p className="text-sm mb-4 text-grayscale-400">{description}</p>
      )}
    </>
  );
};
export default PanelHeader;
