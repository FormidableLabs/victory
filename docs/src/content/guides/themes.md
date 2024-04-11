---
id: 9
title: Themes
category: guides
---
# Themes

Try out the Victory themes and make your own. Check out the [VictoryTheme API documentation](/docs/victory-theme) more details on themes.

```playground_norender
const result = [...Array(10).keys()]

const scatterData = [...Array(20).keys()].forEach((i) => ({
  x: (i - 10) / 3,
  y: i / 2 - 2 * Math.random() - 4,
}));

const toInteger = (number) => parseInt(number).toString();

const DemoComponent = () => {
  const [theme, setTheme] = React.useState(grayScaletheme);

  const positions = [
    { transform: "translate(0, -15)" },
    { transform: "translate(180, -40)" },
    { transform: "translate(-10, 140)" },
    { transform: "translate(180, 140)" },
  ];
  return (
    <div>
      <div className="mb-12">
        <button className="bg-gray-600 border border-gray-800 text-white uppercase py-6 px-12" onClick={() => setTheme(grayScaletheme)}>
          use grayscale
        </button>
        <button className="bg-blue-600 border border-blue-800 text-white uppercase py-6 px-12 ml-2" onClick={() => setTheme(materialtheme)}>
          use material
        </button>
      </div>
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-labelledby="title desc"
        style={{
          height: "auto",
          width: "100%",
        }}
      >
        <g transform={positions[0].transform}>
          <VictoryPie
            theme={theme}
            standalone={false}
            style={{ labels: { padding: 10 } }}
            height={200}
            width={200}
          />
        </g>
        <g transform={positions[1].transform}>
          <VictoryChart theme={theme} standalone={false} height={250} width={250}>
            <VictoryAxis tickCount={3} tickFormat={toInteger} />
            <VictoryAxis tickCount={4} dependentAxis />
            <VictoryScatter size={2} data={scatterData} />
          </VictoryChart>
        </g>

        <g transform={positions[2].transform}>
          <VictoryChart theme={theme} standalone={false} height={250} width={250}>
            <VictoryAxis tickCount={4} domain={[0, 3]} tickFormat={toInteger} />
            <VictoryAxis tickCount={4} dependentAxis domain={[0, 10]} />
            <VictoryLine y={(data) => data.x * data.x} />
          </VictoryChart>
        </g>

        <g transform={positions[3].transform}>
          <VictoryChart
            standalone={false}
            theme={theme}
            height={250}
            width={250}
            domainPadding={{ x: 40 }}
          >
            <VictoryAxis tickFormat={["A", "B", "C"]} />
            <VictoryAxis tickCount={3} dependentAxis />
            <VictoryStack>
              <VictoryBar
                data={[
                  {
                    x: "A",
                    y: 1,
                  },
                  {
                    x: "B",
                    y: 3,
                  },
                  {
                    x: "C",
                    y: 3,
                  },
                ]}
              />
              <VictoryBar
                data={[
                  {
                    x: "A",
                    y: 2,
                  },
                  {
                    x: "B",
                    y: 1,
                  },
                  {
                    x: "C",
                    y: 3,
                  },
                ]}
              />
              <VictoryBar
                data={[
                  {
                    x: "A",
                    y: 3,
                  },
                  {
                    x: "B",
                    y: 1,
                  },
                  {
                    x: "C",
                    y: 1,
                  },
                ]}
              />
            </VictoryStack>
          </VictoryChart>
        </g>
      </svg>
    </div>
  );
};

const grayScaletheme = (function(){
  const colors = [
    "#252525",
    "#525252",
    "#737373",
    "#969696",
    "#bdbdbd",
    "#d9d9d9",
    "#f0f0f0"
  ];
  const charcoal = "#252525";
  const grey = "#969696";

  // Typography
  const sansSerif = "'Gill Sans', 'Seravek', 'Trebuchet MS', sans-serif";
  const letterSpacing = "normal";
  const fontSize = 14;

  // Layout
  const baseProps = {
    width: 450,
    height: 300,
    padding: 50,
    colorScale: colors
  };

  // Labels
  const baseLabelStyles = {
    fontFamily: sansSerif,
    fontSize,
    letterSpacing,
    padding: 10,
    fill: charcoal,
    stroke: "transparent"
  };

  const centeredLabelStyles = Object.assign({ textAnchor: "middle" }, baseLabelStyles);

  // Strokes
  const strokeLinecap = "round";
  const strokeLinejoin = "round";

  // Put it all together...
  return {
    area: Object.assign(
      {
        style: {
          data: {
            fill: charcoal
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    axis: Object.assign(
      {
        style: {
          axis: {
            fill: "transparent",
            stroke: charcoal,
            strokeWidth: 1,
            strokeLinecap,
            strokeLinejoin
          },
          axisLabel: Object.assign({}, centeredLabelStyles, {
            padding: 25
          }),
          grid: {
            fill: "none",
            stroke: "none",
            pointerEvents: "painted"
          },
          ticks: {
            fill: "transparent",
            size: 1,
            stroke: "transparent"
          },
          tickLabels: baseLabelStyles
        }
      },
      baseProps
    ),
    bar: Object.assign(
      {
        style: {
          data: {
            fill: charcoal,
            padding: 8,
            strokeWidth: 0
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    boxplot: Object.assign(
      {
        style: {
          max: { padding: 8, stroke: charcoal, strokeWidth: 1 },
          maxLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
          median: { padding: 8, stroke: charcoal, strokeWidth: 1 },
          medianLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
          min: { padding: 8, stroke: charcoal, strokeWidth: 1 },
          minLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
          q1: { padding: 8, fill: grey },
          q1Labels: Object.assign({}, baseLabelStyles, { padding: 3 }),
          q3: { padding: 8, fill: grey },
          q3Labels: Object.assign({}, baseLabelStyles, { padding: 3 })
        },
        boxWidth: 20
      },
      baseProps
    ),
    candlestick: Object.assign(
      {
        style: {
          data: {
            stroke: charcoal,
            strokeWidth: 1
          },
          labels: Object.assign({}, baseLabelStyles, { padding: 5 })
        },
        candleColors: {
          positive: "#ffffff",
          negative: charcoal
        }
      },
      baseProps
    ),
    chart: baseProps,
    errorbar: Object.assign(
      {
        borderWidth: 8,
        style: {
          data: {
            fill: "transparent",
            stroke: charcoal,
            strokeWidth: 2
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    group: Object.assign(
      {
        colorScale: colors
      },
      baseProps
    ),
    histogram: Object.assign(
      {
        style: {
          data: {
            fill: grey,
            stroke: charcoal,
            strokeWidth: 2
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    legend: {
      colorScale: colors,
      gutter: 10,
      orientation: "vertical",
      titleOrientation: "top",
      style: {
        data: {
          type: "circle"
        },
        labels: baseLabelStyles,
        title: Object.assign({}, baseLabelStyles, { padding: 5 })
      }
    },
    line: Object.assign(
      {
        style: {
          data: {
            fill: "transparent",
            stroke: charcoal,
            strokeWidth: 2
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    pie: {
      style: {
        data: {
          padding: 10,
          stroke: "transparent",
          strokeWidth: 1
        },
        labels: Object.assign({}, baseLabelStyles, { padding: 20 })
      },
      colorScale: colors,
      width: 400,
      height: 400,
      padding: 50
    },
    scatter: Object.assign(
      {
        style: {
          data: {
            fill: charcoal,
            stroke: "transparent",
            strokeWidth: 0
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    stack: Object.assign(
      {
        colorScale: colors
      },
      baseProps
    ),
    tooltip: {
      style: Object.assign({}, baseLabelStyles, { padding: 0, pointerEvents: "none" }),
      flyoutStyle: {
        stroke: charcoal,
        strokeWidth: 1,
        fill: "#f0f0f0",
        pointerEvents: "none"
      },
      flyoutPadding: 5,
      cornerRadius: 5,
      pointerLength: 10
    },
    voronoi: Object.assign(
      {
        style: {
          data: {
            fill: "transparent",
            stroke: "transparent",
            strokeWidth: 0
          },
          labels: Object.assign({}, baseLabelStyles, { padding: 5, pointerEvents: "none" }),
          flyout: {
            stroke: charcoal,
            strokeWidth: 1,
            fill: "#f0f0f0",
            pointerEvents: "none"
          }
        }
      },
      baseProps
    )
  };
})();

const materialtheme = (function(){
  const yellow200 = "#FFF59D";
  const deepOrange600 = "#F4511E";
  const lime300 = "#DCE775";
  const lightGreen500 = "#8BC34A";
  const teal700 = "#00796B";
  const cyan900 = "#006064";
  const colors = [
    deepOrange600,
    yellow200,
    lime300,
    lightGreen500,
    teal700,
    cyan900
  ];
  const blueGrey50 = "#ECEFF1";
  const blueGrey300 = "#90A4AE";
  const blueGrey700 = "#455A64";
  const grey900 = "#212121";

  // Typography
  const sansSerif = "'Helvetica Neue', 'Helvetica', sans-serif";
  const letterSpacing = "normal";
  const fontSize = 12;

  // Layout
  const padding = 8;
  const baseProps = {
    width: 350,
    height: 350,
    padding: 50
  };

  // * Labels
  const baseLabelStyles = {
    fontFamily: sansSerif,
    fontSize,
    letterSpacing,
    padding,
    fill: blueGrey700,
    stroke: "transparent",
    strokeWidth: 0
  };

  const centeredLabelStyles = Object.assign({ textAnchor: "middle" }, baseLabelStyles);

  // Strokes
  const strokeDasharray = "10, 5";
  const strokeLinecap = "round";
  const strokeLinejoin = "round";

  // Put it all together...
  return {
    area: Object.assign(
      {
        style: {
          data: {
            fill: grey900
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    axis: Object.assign(
      {
        style: {
          axis: {
            fill: "transparent",
            stroke: blueGrey300,
            strokeWidth: 2,
            strokeLinecap,
            strokeLinejoin
          },
          axisLabel: Object.assign({}, centeredLabelStyles, {
            padding,
            stroke: "transparent"
          }),
          grid: {
            fill: "none",
            stroke: blueGrey50,
            strokeDasharray,
            strokeLinecap,
            strokeLinejoin,
            pointerEvents: "painted"
          },
          ticks: {
            fill: "transparent",
            size: 5,
            stroke: blueGrey300,
            strokeWidth: 1,
            strokeLinecap,
            strokeLinejoin
          },
          tickLabels: Object.assign({}, baseLabelStyles, {
            fill: blueGrey700
          })
        }
      },
      baseProps
    ),
    polarDependentAxis: Object.assign({
      style: {
        ticks: {
          fill: "transparent",
          size: 1,
          stroke: "transparent"
        }
      }
    }),
    bar: Object.assign(
      {
        style: {
          data: {
            fill: blueGrey700,
            padding,
            strokeWidth: 0
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    boxplot: Object.assign(
      {
        style: {
          max: { padding, stroke: blueGrey700, strokeWidth: 1 },
          maxLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
          median: { padding, stroke: blueGrey700, strokeWidth: 1 },
          medianLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
          min: { padding, stroke: blueGrey700, strokeWidth: 1 },
          minLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
          q1: { padding, fill: blueGrey700 },
          q1Labels: Object.assign({}, baseLabelStyles, { padding: 3 }),
          q3: { padding, fill: blueGrey700 },
          q3Labels: Object.assign({}, baseLabelStyles, { padding: 3 })
        },
        boxWidth: 20
      },
      baseProps
    ),
    candlestick: Object.assign(
      {
        style: {
          data: {
            stroke: blueGrey700
          },
          labels: Object.assign({}, baseLabelStyles, { padding: 5 })
        },
        candleColors: {
          positive: "#ffffff",
          negative: blueGrey700
        }
      },
      baseProps
    ),
    chart: baseProps,
    errorbar: Object.assign(
      {
        borderWidth: 8,
        style: {
          data: {
            fill: "transparent",
            opacity: 1,
            stroke: blueGrey700,
            strokeWidth: 2
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    group: Object.assign(
      {
        colorScale: colors
      },
      baseProps
    ),
    histogram: Object.assign(
      {
        style: {
          data: {
            fill: blueGrey700,
            stroke: grey900,
            strokeWidth: 2
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    legend: {
      colorScale: colors,
      gutter: 10,
      orientation: "vertical",
      titleOrientation: "top",
      style: {
        data: {
          type: "circle"
        },
        labels: baseLabelStyles,
        title: Object.assign({}, baseLabelStyles, { padding: 5 })
      }
    },
    line: Object.assign(
      {
        style: {
          data: {
            fill: "transparent",
            opacity: 1,
            stroke: blueGrey700,
            strokeWidth: 2
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    pie: Object.assign(
      {
        colorScale: colors,
        style: {
          data: {
            padding,
            stroke: blueGrey50,
            strokeWidth: 1
          },
          labels: Object.assign({}, baseLabelStyles, { padding: 20 })
        }
      },
      baseProps
    ),
    scatter: Object.assign(
      {
        style: {
          data: {
            fill: blueGrey700,
            opacity: 1,
            stroke: "transparent",
            strokeWidth: 0
          },
          labels: baseLabelStyles
        }
      },
      baseProps
    ),
    stack: Object.assign(
      {
        colorScale: colors
      },
      baseProps
    ),
    tooltip: {
      style: Object.assign({}, baseLabelStyles, { padding: 0, pointerEvents: "none" }),
      flyoutStyle: {
        stroke: grey900,
        strokeWidth: 1,
        fill: "#f0f0f0",
        pointerEvents: "none"
      },
      flyoutPadding: 5,
      cornerRadius: 5,
      pointerLength: 10
    },
    voronoi: Object.assign(
      {
        style: {
          data: {
            fill: "transparent",
            stroke: "transparent",
            strokeWidth: 0
          },
          labels: Object.assign({}, baseLabelStyles, { padding: 5, pointerEvents: "none" }),
          flyout: {
            stroke: grey900,
            strokeWidth: 1,
            fill: "#f0f0f0",
            pointerEvents: "none"
          }
        }
      },
      baseProps
    )
  };
})();

render(<DemoComponent />);
```
