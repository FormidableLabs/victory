import _ from "lodash";
import * as d3Array from "d3-array";
import * as d3Scale from "d3-scale";
import * as d3Time from "d3-time";

import styled from "styled-components";
import basketballData from "../../data/basketball-data";
import listeningData from "../../data/listening-data";
import Slider from "../gallery/slider";
const { assign, random, range, round } = _;

const scopeMap = {
  _,
  assign,
  random,
  range,
  round,
  d3Array,
  d3Scale,
  d3Time,
  styled,
  Slider,
  basketballData,
  listeningData,
  sampleData: [
    {
      x: 1,
      y: 2
    },
    {
      x: 2,
      y: 3
    },
    {
      x: 3,
      y: 5
    },
    {
      x: 4,
      y: 4
    },
    {
      x: 5,
      y: 7
    }
  ],
  sampleHistogramData: [
    { x: 0 },
    { x: 1 },
    { x: 1 },
    { x: 1 },
    { x: 1 },
    { x: 2 },
    { x: 2 },
    { x: 3 },
    { x: 4 },
    { x: 7 },
    { x: 7 },
    { x: 10 }
  ],
  sampleHistogramDateData: [
    { x: new Date(2020, 0, 10) },
    { x: new Date(2020, 0, 1) },
    { x: new Date(2020, 0, 1) },
    { x: new Date(2020, 1, 29) },
    { x: new Date(2020, 1, 1) },
    { x: new Date(2020, 2, 1) },
    { x: new Date(2020, 2, 1) },
    { x: new Date(2020, 2, 3) },
    { x: new Date(2020, 3, 20) },
    { x: new Date(2020, 3, 22) },
    { x: new Date(2020, 4, 29) },
    { x: new Date(2020, 4, 1) },
    { x: new Date(2020, 8, 7) },
    { x: new Date(2020, 8, 13) },
    { x: new Date(2020, 9, 21) },
    { x: new Date(2020, 9, 10) },
    { x: new Date(2020, 9, 17) },
    { x: new Date(2020, 9, 19) },
    { x: new Date(2020, 10, 9) },
    { x: new Date(2020, 11, 10) },
    { x: new Date(2020, 11, 20) },
    { x: new Date(2020, 11, 1) },
    { x: new Date(2020, 11, 3) },
    { x: new Date(2020, 11, 21) },
    { x: new Date(2020, 11, 25) }
  ],
  sampleErrorData: [
    {
      x: 1,
      y: 2,
      errorX: 0.1,
      errorY: 0.4
    },
    {
      x: 2,
      y: 3,
      errorX: 0.5,
      errorY: 0.1
    },
    {
      x: 3,
      y: 5,
      errorX: 0.3,
      errorY: 0.2
    },
    {
      x: 4,
      y: 4,
      errorX: 0.1,
      errorY: 0.3
    },
    {
      x: 5,
      y: 7,
      errorX: 0.2,
      errorY: 0.5
    }
  ],
  sampleDataDates: [
    {
      x: new Date(2016, 6, 1),
      open: 5,
      close: 10,
      high: 15,
      low: 0
    },
    {
      x: new Date(2016, 6, 2),
      open: 10,
      close: 15,
      high: 20,
      low: 5
    },
    {
      x: new Date(2016, 6, 3),
      open: 15,
      close: 20,
      high: 22,
      low: 10
    },
    {
      x: new Date(2016, 6, 4),
      open: 20,
      close: 10,
      high: 25,
      low: 7
    },
    {
      x: new Date(2016, 6, 5),
      open: 10,
      close: 8,
      high: 15,
      low: 5
    }
  ],
  sampleDataPolar: [
    {
      x: 45,
      y: 2
    },
    {
      x: 90,
      y: 3
    },
    {
      x: 135,
      y: 5
    },
    {
      x: 180,
      y: 4
    },
    {
      x: 225,
      y: 7
    },
    {
      x: 270,
      y: 2
    },
    {
      x: 315,
      y: 4
    },
    {
      x: 360,
      y: 7
    }
  ]
};

export default scopeMap;
