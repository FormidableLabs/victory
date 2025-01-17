import React from "react";

import { ColorScalePropType } from "victory";

import { useTheme } from "../../_providers/themeProvider";
import { usePreviewOptions } from "../../_providers/previewOptionsProvider";
import { Preview } from "./preview";
import { Header } from "./header";

export function ThemePreview() {
  const { customThemeConfig } = useTheme();
  const { colorScale, exampleContent, showTooltips } = usePreviewOptions();

  if (!customThemeConfig) return null;

  return (
    <main className="flex-1 flex flex-col items-center overflow-y-auto h-full">
      <div className="max-w-screen-xl w-full px-10 pt-6 pb-20">
        <Header />
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
          {exampleContent.map((content, i) => (
            <Preview
              key={i}
              config={content}
              colorScale={colorScale as ColorScalePropType}
              showTooltips={showTooltips}
              theme={customThemeConfig}
              showOptions={exampleContent.length > 1}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
