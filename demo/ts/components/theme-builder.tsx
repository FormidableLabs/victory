import React from "react";
import { VictoryTheme } from "victory-core";

const ThemeBuilder = () => {
  const [theme, setTheme] = React.useState<any>(VictoryTheme.material);

  return <div>Theme Builder</div>;
};
export default ThemeBuilder;
