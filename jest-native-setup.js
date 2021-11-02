import React from "react";

jest.mock("react-native", () => ({
  Dimensions: {
    get: () => ({ width: 300, height: 100 })
  },
  PanResponder: {
    create: () => ({
      panHandlers: []
    })
  },
  View: ({ children }) => <>{children}</>
}));

const createMockComponent = (name) => {
  const comp = (props) => React.createElement(name, props);
  comp.displayName = name;
  return comp;
};

jest.mock("react-native-svg", () => {
  const mockComponents = [
    "Svg",
    "Circle",
    "Ellipse",
    "G",
    "Text",
    "TextPath",
    "TSpan",
    "Path",
    "Polygon",
    "Polyline",
    "Line",
    "Rect",
    "Use",
    "Image",
    "Symbol",
    "Defs",
    "LinearGradient",
    "RadialGradient",
    "Stop",
    "ClipPath",
    "Pattern",
    "Mask"
  ];

  const Svg = createMockComponent("Svg");

  mockComponents.forEach((name) => {
    Svg[name] = createMockComponent(name);
  });

  return Svg;
});
