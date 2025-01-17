import React, { createContext, useContext } from "react";
import { AllExamples, ExampleConfig } from "../_components/examples";
import { VictoryComponentType } from "../_const";

type PreviewOptionsContextType = {
  colorScale?: string;
  updateColorScale: (newColorScale?: string) => void;
  showTooltips: boolean;
  setShowTooltips: React.Dispatch<React.SetStateAction<boolean>>;
  resetPreviewOptions: () => void;
  exampleContent: ExampleConfig[];
  setExampleContent: React.Dispatch<React.SetStateAction<ExampleConfig[]>>;
  activeChartType: VictoryComponentType | null;
  setActiveChartType: React.Dispatch<
    React.SetStateAction<VictoryComponentType | null>
  >;
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
  const [activeChartType, setActiveChartType] =
    React.useState<VictoryComponentType | null>(null);
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
        activeChartType,
        setActiveChartType,
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
