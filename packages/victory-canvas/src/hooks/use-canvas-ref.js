import React from "react";
export const CanvasContext = React.createContext();

export const useCanvasRef = () => {
  const context = React.useContext(CanvasContext);
  if (!context) {
    throw new Error(
      "This component must be wrapped in a CanvasContext.Provider component."
    );
  }
  return context;
};
