const getBaseLabelsConfig = (basePath: string) => [
  {
    type: "slider",
    label: "Font Size",
    min: 10,
    max: 24,
    unit: "px",
    path: `${basePath}.fontSize`,
  },
  {
    type: "slider",
    label: "Padding",
    min: 0,
    max: 50,
    unit: "px",
    path: `${basePath}.padding`,
  },
  {
    type: "colorPicker",
    label: "Fill",
    path: `${basePath}.fill`,
  },
];

const optionsConfig = [
  {
    type: "section",
    title: "Palette",
    fields: [
      {
        type: "colorScale",
        label: "Color Scale",
      },
    ],
  },
  {
    type: "section",
    title: "Axis Labels",
    fields: getBaseLabelsConfig("axis.style.axisLabel"),
  },
  {
    type: "section",
    title: "Area Chart",
    fields: [
      {
        type: "section",
        label: "Data",
        fields: [
          {
            type: "slider",
            label: "Fill Opacity",
            min: 0,
            max: 1,
            step: 0.1,
            path: "area.style.data.fillOpacity",
          },
          {
            type: "slider",
            label: "Stroke Width",
            min: 0,
            max: 5,
            unit: "px",
            path: "area.style.data.strokeWidth",
          },
          {
            type: "colorPicker",
            label: "Fill",
            path: "area.style.data.fill",
          },
        ],
      },
      {
        type: "section",
        label: "Labels",
        fields: getBaseLabelsConfig("area.style.labels"),
      },
    ],
  },
];

export default optionsConfig;
