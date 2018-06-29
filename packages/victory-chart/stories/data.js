/*eslint-disable no-magic-numbers*/
import { range } from "lodash";
import seedrandom from "seedrandom";

// const polarData = [
//   { x: 45, y: 2 },
//   { x: 90, y: 3 },
//   { x: 135, y: 5 },
//   { x: 180, y: 4 },
//   { x: 225, y: 7 },
//   { x: 270, y: 2 },
//   { x: 315, y: 4 },
//   { x: 360, y: 7 }
// ];

const getTimeData = (num, seed) => {
  seed = seed || "getData";
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10;
  const current = 1523389495000;
  return range(num).map((v) => {
    return {
      x: new Date((current / (num)) * (v + 1)),
      y: rand()
    };
  });
};

const getData = (num, seed) => {
  seed = seed || "getData";
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10;
  return range(num).map((v) => ({ x: v + 1, y: rand() }));
};

const getLogData = (num, seed) => {
  seed = seed || "getData";
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 100000;
  return range(num).map((v) => ({ x: v + 1, y: rand() }));
};

const getMixedData = (num, seed) => {
  seed = seed || "getMixedData";
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10 - 5;
  return range(num).map((v) => ({ x: v + 1, y: rand() }));
};

const getFourQuadrantData = (num, seed) => {
  seed = seed || "getMixedData";
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10 - 5;
  return range(num).map((v) => ({ x: v - Math.round(num / 2), y: rand() }));
};

const getArrayData = (num, samples, horizontal) => {
  const seed = "getData";
  samples = samples || 10;
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10;
  return range(num).map((v) => {
    const dataArray = range(samples).map(() => rand());
    return {
      x: horizontal ? dataArray : v + 1,
      y: horizontal ? v + 1 : dataArray
    };
  });
};

export {
  getData, getMixedData, getTimeData, getLogData, getFourQuadrantData, getArrayData
};
