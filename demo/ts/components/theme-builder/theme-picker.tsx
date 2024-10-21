import React from "react";
import { ThemeOption } from ".";

type ThemePickerProps = {
  themes: ThemeOption[];
  activeTheme: ThemeOption;
  onSelect?: (theme: ThemeOption) => void;
};

const buttonStyle: React.CSSProperties = {
  padding: "5px 10px",
  margin: "5px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
  background: "none",
};

const activeButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "#eee",
  color: "#2165E3",
};

const ThemePicker = ({ themes, activeTheme, onSelect }: ThemePickerProps) => {
  const handleSelect = (theme: ThemeOption) => {
    if (onSelect) {
      onSelect(theme);
    }
  };

  return (
    <>
      {themes.map((theme, i) => (
        <button
          key={`${name}-${i}`}
          onClick={() => handleSelect(theme)}
          style={
            theme.name === activeTheme.name ? activeButtonStyle : buttonStyle
          }
        >
          <span>{theme.name}</span>
        </button>
      ))}
    </>
  );
};
export default ThemePicker;
