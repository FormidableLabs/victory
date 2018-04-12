/*eslint-disable no-magic-numbers*/
import { range, random } from "lodash";
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

const getTransitionData = () => {
  const samples = random(6, 10);
  return range(samples).map((data) => {
    return {
      x: data,
      y: random(3, 10)
    };
  });
};

const getAnimationData = (num) => {
  return range(num).map((data) => {
    return {
      x: data,
      y: random(3, 10)
    };
  });
};

export {
  getData, getMixedData, getTimeData, getLogData, getTransitionData, getAnimationData
};
