/* global window:false */

import React from "react";
import { range, random } from "lodash";
import {
  Area,
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLine
} from "victory";

import importedTheme from "../../styles/theme";

const GradientPath = props => {
  const toGrayscale = color => {
    const integerColor = parseInt(color.replace("#", ""), 16);
    const r = (integerColor >> 16) & 255; // eslint-disable-line no-bitwise
    const g = (integerColor >> 8) & 255; // eslint-disable-line no-bitwise
    const b = integerColor & 255; // eslint-disable-line no-bitwise
    const gray = parseInt(0.299 * r + 0.587 * g + 0.114 * b, 10);
    return `rgb(${gray}, ${gray}, ${gray})`;
  };

  // eslint-disable-next-line react/prop-types
  const { percent, style = {}, ...rest } = props;

  const gradientId = `gradient-${Math.random()}`;
  const isBrowser =
    typeof window !== "undefined" && window.__STATIC_GENERATOR !== true;
  const loc = isBrowser ? window.location.href : "";
  const areaStyle = Object.assign({}, style, {
    fill: `url(${loc}#${gradientId})`,
    stroke: "none"
  });

  return (
    <g key="area">
      <defs>
        <linearGradient id={gradientId}>
          <stop offset="0%" stopColor={style.fill} />
          <stop offset={`${percent}%`} stopColor={style.fill} />
          <stop offset={`${percent}%`} stopColor={toGrayscale(style.fill)} />
          <stop offset="100%" stopColor={toGrayscale(style.fill)} />
        </linearGradient>
      </defs>
      <path key="area" {...rest} style={areaStyle} />
    </g>
  );
};

// eslint-disable-next-line react/no-multi-comp
export default class App extends React.Component {
  constructor() {
    super();
    this.state = { percent: 62 };
  }

  getStreamData() {
    return range(7).map(i =>
      range(26).map(j => ({
        x: j,
        y: (10 - i) * random(10 - i, 20 - 2 * i),
        _y0: -1 * (10 - i) * random(10 - i, 20 - 2 * i)
      }))
    );
  }

  getStyles() {
    return {
      parent: {
        boxSizing: "border-box",
        display: "block",
        margin: "0 auto",
        padding: 0
      }
    };
  }

  render() {
    const streamData = this.getStreamData();

    const colors = [
      ...importedTheme.color.homeCharts,
      importedTheme.color.red,
      importedTheme.color.accentBrown
    ];

    const styles = this.getStyles();

    return (
      <VictoryChart
        width={450}
        height={350}
        style={{ parent: styles.parent }}
        domain={{
          x: [0, 25],
          y: [-300, 300]
        }}
      >
        <VictoryAxis
          style={{
            axis: { stroke: "none" },
            tickLabels: { fill: "none" },
            grid: { stroke: importedTheme.color.gray }
          }}
          tickValues={[2, 4, 6, 8, 10, 12, 14, 17, 19, 21, 23, 25]}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fontSize: 15, fill: importedTheme.color.nearBlack }
          }}
          crossAxis={false}
        />

        {streamData.map((d, i) => (
          <VictoryArea
            key={i}
            interpolation="monotoneX"
            data={d}
            style={{ data: { fill: colors[i] } }}
            dataComponent={
              <Area
                pathComponent={<GradientPath percent={this.state.percent} />}
              />
            }
          />
        ))}
        <VictoryLine
          style={{
            data: {
              stroke: importedTheme.color.nearBlack,
              strokeWidth: 3
            }
          }}
          data={[
            {
              x: (25 * this.state.percent) / 100,
              y: -300
            },
            {
              x: (25 * this.state.percent) / 100,
              y: 300
            }
          ]}
        />
      </VictoryChart>
    );
  }
}
