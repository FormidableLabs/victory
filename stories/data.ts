import { range } from "lodash";
import seedrandom from "seedrandom";

const getTimeData = (num: number, seed = "getData") => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10;
  const current = 1523389495000;
  return range(num).map((v) => {
    return {
      x: new Date((current / num) * (v + 1)),
      y: rand(),
    };
  });
};

const getData = (num: number, seed = "getData", max = 10) => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * max;
  return range(num).map((v) => ({ x: v + 1, y: rand() }));
};

const getDataWithBaseline = (num: number, seed = "getData", max = 10) => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * max;
  return range(num).map((v) => ({ x: v + 1, y: rand(), y0: rand() }));
};

const getDescendingSmallData = () => {
  return [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 3, y: 0.5 },
    { x: 4, y: 0.2 },
    { x: 5, y: 0.1 },
    { x: 6, y: -0.1 },
    { x: 7, y: -0.2 },
    { x: 8, y: -0.5 },
    { x: 9, y: -1 },
    { x: 10, y: -2 },
  ];
};

const getStringData = (num: number, seed = "getData") => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10;
  return range(num).map((v) => ({ x: `#${v + 1}`, y: rand() }));
};

const getLogData = (num: number, seed = "getData") => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 100000;
  return range(num).map((v) => ({ x: v + 1, y: rand() }));
};

const getMixedData = (num: number, seed = "getMixedData") => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10 - 5;
  return range(num).map((v) => ({ x: v + 1, y: rand() }));
};

const getFourQuadrantData = (num: number, seed = "getMixedData") => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10 - 5;
  return range(num).map((v) => ({ x: v - Math.round(num / 2), y: rand() }));
};

const getArrayData = (num: number, samples = 10) => {
  const seed = "getData";
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10;
  return range(num).map((v) => {
    return {
      x: v + 1,
      y: range(samples).map(() => rand()),
    };
  });
};

const getStackedData = (num: number, samples, useStrings) => {
  return range(num).map(() => {
    return useStrings ? getStringData(samples) : getData(samples);
  });
};

export {
  getData,
  getDataWithBaseline,
  getStringData,
  getMixedData,
  getTimeData,
  getLogData,
  getFourQuadrantData,
  getArrayData,
  getStackedData,
  getDescendingSmallData,
};
