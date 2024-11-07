const optionsConfig = [
  {
    type: "section",
    title: "Color Options",
    fields: [
      {
        type: "colorScale",
        label: "Color Scale",
      },
    ],
  },
  {
    type: "section",
    title: "Axis Label Options",
    fields: [
      {
        type: "slider",
        label: "Font Size",
        min: 10,
        max: 24,
        unit: "px",
        path: "axis.style.axisLabel.fontSize",
      },
      {
        type: "slider",
        label: "Padding",
        min: 0,
        max: 50,
        unit: "px",
        path: "axis.style.axisLabel.padding",
      },
      {
        type: "colorPicker",
        label: "Fill",
        path: "axis.style.axisLabel.fill",
      },
    ],
  },
];

export default optionsConfig;
