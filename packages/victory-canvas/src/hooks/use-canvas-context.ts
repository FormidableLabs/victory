import React from "react";

export type CanvasContextValue = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  clear: (ctx: CanvasRenderingContext2D) => void;
  clip: (ctx: CanvasRenderingContext2D) => void;
};

export const CanvasContext = React.createContext<
  CanvasContextValue | undefined
>(undefined);

export const useCanvasContext = () => {
  const context = React.useContext(CanvasContext);
  if (!context) {
    throw new Error(
      `This component must be wrapped in a CanvasContext.Provider component.
      Try setting groupComponent={<CanvasGroup />} in your chart component.`,
    );
  }
  return context;
};
