import React, { createContext, useContext } from "react";

type PreviewOptionsContextType = {
  colorScale?: string;
  updateColorScale: (newColorScale: string) => void;
  chartType?: string;
  setChartType: (chartType: string) => void;
  showTooltips: boolean;
  setShowTooltips: (showTooltips: boolean) => void;
  resetPreviewOptions: () => void;
};

export const defaultColorScale = undefined;
export const defaultChartType = "";
export const defaultShowTooltips = false;

const PreviewOptionsContext = createContext<
  PreviewOptionsContextType | undefined
>(undefined);

export const PreviewOptionsProvider = ({ children }) => {
  const [colorScale, setColorScale] = React.useState<string | undefined>(
    defaultColorScale,
  );
  const [chartType, setChartType] = React.useState<string>(defaultChartType);
  const [showTooltips, setShowTooltips] = React.useState(defaultShowTooltips);

  const updateColorScale = (newColorScale: string) => {
    const updatedColorScale = newColorScale === "" ? undefined : newColorScale;
    setColorScale(updatedColorScale);
  };

  const resetPreviewOptions = () => {
    setColorScale(defaultColorScale);
    setChartType(defaultChartType);
    setShowTooltips(defaultShowTooltips);
  };

  return (
    <PreviewOptionsContext.Provider
      value={{
        colorScale,
        updateColorScale,
        chartType,
        setChartType,
        showTooltips,
        setShowTooltips,
        resetPreviewOptions,
      }}
    >
      {children}
    </PreviewOptionsContext.Provider>
  );
};

export const usePreviewOptions = () => {
  const context = useContext(PreviewOptionsContext);
  if (context === undefined) {
    throw new Error(
      "usePreviewOptions must be used within a PreviewOptionsProvider",
    );
  }
  return context;
};
