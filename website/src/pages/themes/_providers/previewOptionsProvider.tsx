import React, { createContext, useContext } from "react";
import { AllExamples, ExampleConfig } from "../_components/examples";

type PreviewOptionsContextType = {
  colorScale?: string;
  updateColorScale: (newColorScale?: string) => void;
  showTooltips: boolean;
  setShowTooltips: (showTooltips: boolean) => void;
  resetPreviewOptions: () => void;
  exampleContent: ExampleConfig[];
  setExampleContent: (content: ExampleConfig[]) => void;
};

export const defaultColorScale = undefined;
export const defaultShowTooltips = false;

const PreviewOptionsContext = createContext<
  PreviewOptionsContextType | undefined
>(undefined);

export const PreviewOptionsProvider = ({ children }) => {
  const [colorScale, setColorScale] = React.useState<string | undefined>(
    defaultColorScale,
  );
  const [showTooltips, setShowTooltips] = React.useState(defaultShowTooltips);
  const [exampleContent, setExampleContent] = React.useState(AllExamples);

  const updateColorScale = (newColorScale?: string) => {
    const updatedColorScale = !newColorScale ? undefined : newColorScale;
    setColorScale(updatedColorScale);
  };

  const resetPreviewOptions = () => {
    setColorScale(defaultColorScale);
    setShowTooltips(defaultShowTooltips);
  };

  return (
    <PreviewOptionsContext.Provider
      value={{
        colorScale,
        updateColorScale,
        showTooltips,
        setShowTooltips,
        resetPreviewOptions,
        exampleContent,
        setExampleContent,
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
