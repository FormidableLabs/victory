import * as Helpers from "./helper-methods";

jest.mock("victory-core", () => {
  const originalModule = jest.requireActual("victory-core");

  const data = [
    [
      {
        _stack: 1,
        _group: 0,
        _x: new Date("2023-11-18T08:10:00.050Z"),
        _y: 0,
        x: new Date("2023-11-18T08:10:00.050Z"),
        y: 0,
      },
      {
        _stack: 1,
        _group: 1,
        _x: new Date("2023-11-18T08:10:00.050Z"),
        _y: 2,
        x: new Date("2023-11-18T08:10:00.050Z"),
        y: 2,
      },
      {
        _stack: 1,
        _group: 2,
        _x: new Date("2023-11-18T08:12:00.050Z"),
        _y: 3,
        x: new Date("2023-11-18T08:12:00.050Z"),
        y: 3,
      },
      {
        _stack: 1,
        _group: 3,
        _x: new Date("2023-11-18T08:13:00.050Z"),
        _y: 4,
        x: new Date("2023-11-18T08:13:00.050Z"),
        y: 4,
      },
      {
        _stack: 1,
        _group: 4,
        _x: new Date("2023-11-18T08:14:00.050Z"),
        _y: 7,
        x: new Date("2023-11-18T08:14:00.050Z"),
        y: 7,
      },
      {
        _stack: 1,
        _group: 5,
        _x: new Date("2023-11-18T08:15:00.050Z"),
        _y: 8,
        x: new Date("2023-11-18T08:15:00.050Z"),
        y: 8,
      },
    ],
  ];

  const modifyProps = {
    children: [
      {
        key: ".0",
        ref: null,
        props: {
          data: [
            {
              x: "2023-11-18T08:10:00.050Z",
              y: 0,
            },
            {
              x: "2023-11-18T08:10:00.050Z",
              y: 2,
            },
            {
              x: "2023-11-18T08:12:00.050Z",
              y: 3,
            },
            {
              x: "2023-11-18T08:13:00.050Z",
              y: 4,
            },
            {
              x: "2023-11-18T08:14:00.050Z",
              y: 7,
            },
            {
              x: "2023-11-18T08:15:00.050Z",
              y: 8,
            },
          ],
          containerComponent: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: {},
          },
          dataComponent: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: {},
          },
          groupComponent: {
            key: null,
            ref: null,
            props: {
              circleComponent: {
                type: {},
                key: null,
                ref: null,
                props: {},
                _owner: null,
                _store: {},
              },
              rectComponent: {
                type: {},
                key: null,
                ref: null,
                props: {},
                _owner: null,
                _store: {},
              },
              clipPathComponent: {
                key: null,
                ref: null,
                props: {},
                _owner: null,
                _store: {},
              },
              groupComponent: {
                type: "g",
                key: null,
                ref: null,
                props: {},
                _owner: null,
                _store: {},
              },
            },
            _owner: null,
            _store: {},
          },
          labelComponent: {
            key: null,
            ref: null,
            props: {
              renderInPortal: true,
            },
            _owner: null,
            _store: {},
          },
          samples: 50,
          sortKey: "x",
          sortOrder: "ascending",
          standalone: true,
          theme: {
            area: {
              style: {
                data: {
                  fill: "#252525",
                },
                labels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 10,
                  fill: "#252525",
                  stroke: "transparent",
                },
              },
              width: 450,
              height: 300,
              padding: 50,
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
            },
            axis: {
              style: {
                axis: {
                  fill: "transparent",
                  stroke: "#252525",
                  strokeWidth: 1,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                },
                axisLabel: {
                  textAnchor: "middle",
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 25,
                  fill: "#252525",
                  stroke: "transparent",
                },
                grid: {
                  fill: "none",
                  stroke: "none",
                  pointerEvents: "painted",
                },
                ticks: {
                  fill: "transparent",
                  size: 1,
                  stroke: "transparent",
                },
                tickLabels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 10,
                  fill: "#252525",
                  stroke: "transparent",
                },
              },
              width: 450,
              height: 300,
              padding: 50,
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
            },
            bar: {
              style: {
                data: {
                  fill: "#252525",
                  padding: 8,
                  strokeWidth: 0,
                },
                labels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 10,
                  fill: "#252525",
                  stroke: "transparent",
                },
              },
              width: 450,
              height: 300,
              padding: 50,
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
            },
            boxplot: {
              style: {
                max: {
                  padding: 8,
                  stroke: "#252525",
                  strokeWidth: 1,
                },
                maxLabels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 3,
                  fill: "#252525",
                  stroke: "transparent",
                },
                median: {
                  padding: 8,
                  stroke: "#252525",
                  strokeWidth: 1,
                },
                medianLabels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 3,
                  fill: "#252525",
                  stroke: "transparent",
                },
                min: {
                  padding: 8,
                  stroke: "#252525",
                  strokeWidth: 1,
                },
                minLabels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 3,
                  fill: "#252525",
                  stroke: "transparent",
                },
                q1: {
                  padding: 8,
                  fill: "#969696",
                },
                q1Labels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 3,
                  fill: "#252525",
                  stroke: "transparent",
                },
                q3: {
                  padding: 8,
                  fill: "#969696",
                },
                q3Labels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 3,
                  fill: "#252525",
                  stroke: "transparent",
                },
              },
              boxWidth: 20,
              width: 450,
              height: 300,
              padding: 50,
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
            },
            candlestick: {
              style: {
                data: {
                  stroke: "#252525",
                  strokeWidth: 1,
                },
                labels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 5,
                  fill: "#252525",
                  stroke: "transparent",
                },
              },
              candleColors: {
                positive: "#ffffff",
                negative: "#252525",
              },
              width: 450,
              height: 300,
              padding: 50,
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
            },
            chart: {
              width: 450,
              height: 300,
              padding: 50,
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
            },
            errorbar: {
              borderWidth: 8,
              style: {
                data: {
                  fill: "transparent",
                  stroke: "#252525",
                  strokeWidth: 2,
                },
                labels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 10,
                  fill: "#252525",
                  stroke: "transparent",
                },
              },
              width: 450,
              height: 300,
              padding: 50,
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
            },
            group: {
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
              width: 450,
              height: 300,
              padding: 50,
            },
            histogram: {
              style: {
                data: {
                  fill: "#969696",
                  stroke: "#252525",
                  strokeWidth: 2,
                },
                labels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 10,
                  fill: "#252525",
                  stroke: "transparent",
                },
              },
              width: 450,
              height: 300,
              padding: 50,
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
            },
            legend: {
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
              gutter: 10,
              orientation: "vertical",
              titleOrientation: "top",
              style: {
                data: {
                  type: "circle",
                },
                labels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 10,
                  fill: "#252525",
                  stroke: "transparent",
                },
                title: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 5,
                  fill: "#252525",
                  stroke: "transparent",
                },
              },
            },
            line: {
              style: {
                data: {
                  fill: "transparent",
                  stroke: "#252525",
                  strokeWidth: 2,
                },
                labels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 10,
                  fill: "#252525",
                  stroke: "transparent",
                },
              },
              width: 450,
              height: 300,
              padding: 50,
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
            },
            pie: {
              style: {
                data: {
                  padding: 10,
                  stroke: "transparent",
                  strokeWidth: 1,
                },
                labels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 20,
                  fill: "#252525",
                  stroke: "transparent",
                },
              },
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
              width: 400,
              height: 400,
              padding: 50,
            },
            scatter: {
              style: {
                data: {
                  fill: "#252525",
                  stroke: "transparent",
                  strokeWidth: 0,
                },
                labels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 10,
                  fill: "#252525",
                  stroke: "transparent",
                },
              },
              width: 450,
              height: 300,
              padding: 50,
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
            },
            stack: {
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
              width: 450,
              height: 300,
              padding: 50,
            },
            tooltip: {
              style: {
                fontFamily:
                  "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                fontSize: 14,
                letterSpacing: "normal",
                padding: 0,
                fill: "#252525",
                stroke: "transparent",
                pointerEvents: "none",
              },
              flyoutStyle: {
                stroke: "#252525",
                strokeWidth: 1,
                fill: "#f0f0f0",
                pointerEvents: "none",
              },
              flyoutPadding: 5,
              cornerRadius: 5,
              pointerLength: 10,
            },
            voronoi: {
              style: {
                data: {
                  fill: "transparent",
                  stroke: "transparent",
                  strokeWidth: 0,
                },
                labels: {
                  fontFamily:
                    "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif",
                  fontSize: 14,
                  letterSpacing: "normal",
                  padding: 5,
                  fill: "#252525",
                  stroke: "transparent",
                  pointerEvents: "none",
                },
                flyout: {
                  stroke: "#252525",
                  strokeWidth: 1,
                  fill: "#f0f0f0",
                  pointerEvents: "none",
                },
              },
              width: 450,
              height: 300,
              padding: 50,
              colorScale: [
                "#252525",
                "#525252",
                "#737373",
                "#969696",
                "#bdbdbd",
                "#d9d9d9",
                "#f0f0f0",
              ],
            },
          },
        },
        _owner: null,
        _store: {},
      },
    ],
    containerComponent: {
      key: null,
      ref: null,
      props: {},
      _owner: null,
      _store: {},
    },
    groupComponent: {
      type: "g",
      key: null,
      ref: null,
      props: {},
      _owner: null,
      _store: {},
    },
    standalone: true,
    fillInMissingData: true,
    colorScale: [
      "#252525",
      "#525252",
      "#737373",
      "#969696",
      "#bdbdbd",
      "#d9d9d9",
      "#f0f0f0",
    ],
    width: 450,
    height: 300,
    padding: 50,
  };

  return {
    __esModule: true,
    ...originalModule,
    Wrapper: {
      ...originalModule.Wrapper,
      getDataFromChildren: jest.fn().mockReturnValue(data),
      getStyle: jest.fn(),
      getCategories: jest.fn(),
      getScale: jest.fn().mockReturnValue({
        domain: jest.fn().mockReturnValue({
          range: jest.fn(),
        }),
      }),
    },
    Helpers: {
      ...originalModule.Helpers,
      modifyProps: jest.fn().mockReturnValue(modifyProps),
    },
  };
});

const childComponents = [
  {
    key: ".0",
    ref: null,
    props: {
      data: [
        {
          x: "2023-11-18T08:10:00.050Z",
          y: 0,
        },
        {
          x: "2023-11-18T08:10:00.050Z",
          y: 2,
        },
        {
          x: "2023-11-18T08:12:00.050Z",
          y: 3,
        },
        {
          x: "2023-11-18T08:13:00.050Z",
          y: 4,
        },
        {
          x: "2023-11-18T08:14:00.050Z",
          y: 7,
        },
        {
          x: "2023-11-18T08:15:00.050Z",
          y: 8,
        },
      ],
      containerComponent: {
        key: null,
        ref: null,
        props: {},
        _owner: null,
        _store: {},
      },
      dataComponent: {
        key: null,
        ref: null,
        props: {},
        _owner: null,
        _store: {},
      },
      groupComponent: {
        key: null,
        ref: null,
        props: {
          circleComponent: {
            type: {},
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: {},
          },
          rectComponent: {
            type: {},
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: {},
          },
          clipPathComponent: {
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: {},
          },
          groupComponent: {
            type: "g",
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: {},
          },
        },
        _owner: null,
        _store: {},
      },
      labelComponent: {
        key: null,
        ref: null,
        props: {
          renderInPortal: true,
        },
        _owner: null,
        _store: {},
      },
      samples: 50,
      sortKey: "x",
      sortOrder: "ascending",
      standalone: true,
    },
    _owner: null,
    _store: {},
  },
];

describe("victory-stack/helpers", () => {
  describe("fillData", () => {
    it("should dedupe data based on `x` and reduce array size from oirigal 6 to 5", () => {
      const props = Helpers.getCalculatedProps({}, childComponents);

      const { datasets } = props;

      const firstDataStack = datasets[0];

      expect(firstDataStack.length).toEqual(5);
    });

    it("should dedupe data based on `x` and only contain one item with Date('2023-11-18T08:10:00.050Z')", () => {
      const props = Helpers.getCalculatedProps({}, childComponents);

      const { datasets } = props;

      const firstDataStack = datasets[0];

      expect(
        firstDataStack.filter(
          (item) =>
            item.x.getTime() === new Date("2023-11-18T08:10:00.050Z").getTime(),
        ).length,
      ).toEqual(1);
    });
  });
});
