import range from "lodash/range";
import seedrandom from "seedrandom";

export const getArrayData = (num: number, samples = 10) => {
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

export const getBoxPlotData = (num, seed = "getData") => {
  const baseSeed = seedrandom(seed);
  const rand = () => Math.round(1 + baseSeed.quick() * 5);
  return range(num).map((v) => {
    const min = rand();
    const q1 = min + rand();
    const median = q1 + rand();
    const q3 = median + rand();
    const max = q3 + rand();
    return { x: v + 1, y: v + 1, min, q1, median, q3, max };
  });
};

export const getBoxPlotRepeatData = (num, samples = 10) => {
  const seed = "getRepeatData";
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10;
  return range(num).reduce((memo, curr) => {
    const sampleData = range(samples).map(() => ({
      x: curr + 1,
      y: rand(),
    }));
    return memo.concat(sampleData);
  }, [] as any);
};

export const getCandlestickData = (num, seed = "getData") => {
  const baseSeed = seedrandom(seed);
  return range(num).map((v) => {
    const low = 2 + baseSeed.quick() * 5;
    const open = low + baseSeed.quick() * 5;
    const close = low + baseSeed.quick() * 5;
    const high = Math.max(open, close) + baseSeed.quick() * 5;
    return { x: v + 1, high, low, open, close };
  });
};

export const getCandlestickTimeData = (num, seed = "getTimeData") => {
  const baseSeed = seedrandom(seed);
  const current = 1523389495000;
  return range(num).map((v) => {
    const low = 2 + baseSeed.quick() * 5;
    const open = low + baseSeed.quick() * 5;
    const close = low + baseSeed.quick() * 5;
    const high = Math.max(open, close) + baseSeed.quick() * 5;
    return {
      x: new Date((current / num) * (v + 1)),
      high,
      low,
      open,
      close,
    };
  });
};

export const getData = (num: number, seed = "getData", max = 10) => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * max;
  return range(num).map((v) => ({ x: v + 1, y: rand() }));
};

export const getDataWithBaseline = (
  num: number,
  seed = "getData",
  max = 10,
) => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * max;
  return range(num).map((v) => ({ x: v + 1, y: rand(), y0: rand() }));
};

export const getDescendingSmallData = () => {
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

export const getErrorBarData = (
  num: number,
  symmetric = false,
  seed = "getData",
) => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 3;
  return range(num).map((v) => {
    return {
      x: v + 3,
      y: baseSeed.quick() * 20 + 5,
      errorX: symmetric ? rand() : [rand(), rand()],
      errorY: symmetric ? rand() : [rand(), rand()],
    };
  });
};

export const getFourQuadrantData = (num: number, seed = "getMixedData") => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10 - 5;
  return range(num).map((v) => ({ x: v - Math.round(num / 2), y: rand() }));
};

export const getLogData = (num: number, seed = "getData") => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 100000;
  return range(num).map((v) => ({ x: v + 1, y: rand() }));
};

export const getMixedData = (num: number, seed = "getMixedData") => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10 - 5;
  return range(num).map((v) => ({ x: v + 1, y: rand() }));
};

export const getRandomValues = (num, seed = "random") => {
  const baseSeed = seedrandom(seed);
  const rand = () => Math.round(baseSeed.quick() * 100);
  const result = range(num).map(() => rand());
  return result.sort((a, b) => a - b);
};

export const getStackedData = (num: number, samples, useStrings) => {
  return range(num).map(() => {
    return useStrings ? getStringData(samples) : getData(samples);
  });
};

export const getStringData = (num: number, seed = "getData") => {
  const baseSeed = seedrandom(seed);
  const rand = () => baseSeed.quick() * 10;
  return range(num).map((v) => ({ x: `#${v + 1}`, y: rand() }));
};

export const getTimeData = (num: number, seed = "getData") => {
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

export const getTimeValues = (num) => {
  const current = 1523389495000;
  return range(num).map((v) => {
    return new Date((current / num) * (v + 1));
  });
};

export const getValues = (num, min = 0, step = 1) => {
  return range(num).map((v) => v * step + min);
};
