import React from "react";

export const CanvasContext = React.createContext();

export const useCanvasContext = () => {
  const context = React.useContext(CanvasContext);
  if (!context) {
    throw new Error(
      `This component must be wrapped in a CanvasContext.Provider component.
      Try setting groupComponent={<CanvasGroup />} in your chart component.`
    );
  }
  return context;
};
