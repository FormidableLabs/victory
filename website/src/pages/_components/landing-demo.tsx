/* eslint-disable no-magic-numbers */
import React, { useState, useEffect } from "react";

import axios from "axios";
import { last } from "lodash";
import { format, startOfWeek, parse, subDays } from "date-fns";

import {
  VictoryLine,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
  VictoryScatter,
  VictoryVoronoiContainer,
  Point,
} from "victory";

import downloads from "./data/downloads";
import versions from "./data/versions";
import { theme } from "./theme";

const font = (color = theme.color.brown) => ({
  fill: color,
  fontSize: 20,
  fontFamily: "Helvetica",
});

const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const groupDownloadsByWeek = (dates) => {
  const downloadsGroupedByPeriod = {};
  const today = new Date();

  dates.forEach((date) => {
    const start = format(
      startOfWeek(parse(date.day, "yyyy-MM-dd", today)),
      "yyyy-MM-dd",
    );

    downloadsGroupedByPeriod[start] = downloadsGroupedByPeriod[start]
      ? downloadsGroupedByPeriod[start] + date.downloads
      : date.downloads;
  });

  const weeklyDownloads = Object.entries(downloadsGroupedByPeriod).map(
    ([key, value]) => ({
      date: key,
      downloads: value,
    }),
  );
  // remove the last element in the array, as it may not be a full week
  weeklyDownloads.pop();
  return weeklyDownloads;
};

const minorVersions = versions.data.filter((v) => v.version.endsWith("0"));
const latestVersion = versions.data[0].version;
const voronoiBlacklist = minorVersions.map((v) => `ignore-${v.version}`);

const LinkLabel = (props) => {
  const { x, index, version } = props;
  if (Number(index) || !version.label) {
    return null;
  }
  const versionDate = `${version.version}-${version.date}`;
  const hash = versionDate.replace(/[^\w-]+/g, "");
  const linkStyle = font(theme.color.red);
  return (
    <foreignObject x={x - 25} y={5} width={50} height={50}>
      <a
        href={`https://github.com/FormidableLabs/victory/blob/main/CHANGELOG.md#${hash}`}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
      >
        {version.label}
      </a>
    </foreignObject>
  );
};

// eslint-disable-next-line react/no-multi-comp
const VoronoiLabel = (props) => {
  const { datum, x, y, data } = props;
  if (last<any>(data).downloads === datum.downloads) {
    return null;
  }
  const labelStyles = {
    fill: theme.color.white,
    fontSize: 20,
    fontFamily: "Helvetica",
    textAnchor: "middle",
    fontWeight: "bold",
  };
  return (
    <g>
      <Point x={x} y={y} size={6} style={{ fill: "white" }} />
      <VictoryLabel
        {...props}
        style={labelStyles}
        dy={-30}
        backgroundStyle={{ fill: theme.color.deepBrown }}
        backgroundPadding={3}
      />
    </g>
  );
};

const lastDate = last(downloads.data)!.day;
const recentDate = format(subDays(new Date(), 2), "yyyy-MM-dd");
const oldDownloads = groupDownloadsByWeek(downloads.data);

async function fetchData(url) {
  try {
    const result = await axios(url);
    const freshData = result.data;
    const allDownloads = downloads.data.concat(freshData.downloads);
    return groupDownloadsByWeek(allDownloads)
  } catch {
    return oldDownloads;
  }
}

// eslint-disable-next-line react/no-multi-comp
export const LandingDemo = () => {
  const [downloadsPerWeek, setData] = useState(oldDownloads);
  const url = `https://api.npmjs.org/downloads/range/${lastDate}:${recentDate}/victory`;

  useEffect(() => {
    void fetchData(url).then(setData);
  }, [url]);

  return (
    <div className="bg-[#4a1b13] hidden md:block">
      <VictoryChart
        height={250}
        width={1900}
        padding={{ top: 50, bottom: 50, left: 200, right: 200 }}
        style={{
          parent: {
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            paddingTop: "2rem",
            cursor: "crosshair",
          },
        }}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => numberWithCommas(datum.downloads)}
            voronoiBlacklist={voronoiBlacklist}
            labelComponent={<VoronoiLabel data={downloadsPerWeek} />}
          />
        }
      >
        <VictoryLabel
          text="DEC 2015"
          textAnchor="end"
          style={font(theme.color.white)}
          x={190}
          y={190}
        />
        <VictoryLabel
          text="PROJECT START"
          textAnchor="end"
          style={font(theme.color.white)}
          x={190}
          y={215}
        />
        <VictoryLabel
          text="TODAY"
          textAnchor="start"
          style={font(theme.color.white)}
          x={1710}
          y={190}
        />
        <VictoryLabel
          text={`v${latestVersion}`}
          textAnchor="start"
          style={font(theme.color.white)}
          x={1710}
          y={215}
        />
        <VictoryAxis
          tickFormat={() => ""}
          style={{
            axis: { stroke: theme.color.white, strokeWidth: 3 },
          }}
          scale={{ x: "time" }}
        />

        {minorVersions.map((v) => (
          <VictoryLine
            name={`ignore-${v.version}`}
            key={v.version}
            x={() => new Date(v.date)}
            style={{
              data: {
                stroke: theme.color.red,
                strokeWidth: v.label ? 3 : 1,
              },
            }}
            labels={() => v.label}
            labelComponent={<LinkLabel version={v} />}
            groupComponent={<g />}
            samples={2}
          />
        ))}
        <VictoryLine
          data={downloadsPerWeek}
          groupComponent={<g />}
          y="downloads"
          x={(d) => new Date(d.date)}
          style={{
            data: { stroke: theme.color.white, strokeWidth: 4 },
          }}
        />
        <VictoryScatter
          name="ignore-scatter"
          data={[last(downloadsPerWeek)]}
          y="downloads"
          x={(d) => new Date(d.date)}
          size={6}
          style={{
            data: { fill: theme.color.white },
            labels: { verticalAnchor: "start" },
          }}
          labelComponent={
            <VictoryLabel
              dx={15}
              dy={-15}
              lineHeight={1.3}
              style={[
                {
                  fill: theme.color.white,
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Helvetica",
                  textAnchor: "start",
                },
                {
                  fill: theme.color.white,
                  fontSize: 15,
                  fontFamily: "Helvetica",
                  textAnchor: "start",
                },
              ]}
            />
          }
          labels={({ datum }) =>
            `${numberWithCommas(datum.downloads)}\nDOWNLOADS / WEEK`
          }
        />
      </VictoryChart>
    </div>
  );
};
