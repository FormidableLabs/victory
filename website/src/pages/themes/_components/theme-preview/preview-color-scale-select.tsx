import React, { useId } from "react";
import Select from "../select";
import { usePreviewOptions } from "../../_providers/previewOptionsProvider";
import { colorScaleOptions } from "../../_const";
import clsx from "clsx";

type PreviewColorScaleSelectProps = {
  label?: string;
  size?: "sm" | "md";
  className?: string;
};

const PreviewColorScaleSelect = ({
  label = "Preview color scale",
  size = "md",
  className,
}: PreviewColorScaleSelectProps) => {
  const { colorScale, updateColorScale } = usePreviewOptions();
  const id = useId();
  return (
    <Select
      id={id}
      label={label}
      value={colorScale}
      onChange={updateColorScale}
      options={colorScaleOptions}
      includeDefault
      className={clsx(
        "my-2",
        size === "sm" && "flex items-center justify-between",
        className,
      )}
      size={size}
    />
  );
};
export default PreviewColorScaleSelect;
