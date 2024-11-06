const optionsConfig = [
  {
    type: "section",
    title: "Color Options",
    fields: [
      {
        type: "colorScale",
        label: "Color Scale",
        options: ["Qualitative", "Sequential", "Diverging"],
        default: "Qualitative",
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
        default: 12,
        unit: "px",
      },
      {
        type: "slider",
        label: "Padding",
        min: 0,
        max: 50,
        default: 35,
        unit: "px",
      },
      {
        type: "colorPicker",
        label: "Fill",
        default: "#292929",
      },
    ],
  },
];

export default optionsConfig;
