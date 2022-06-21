import { range, random } from "lodash";

export const getData = () =>
  range(1, 10).map((i) => ({ x: i, y: random(1, 10) }));

export const getBoxPlotData = () =>
  range(5).map((i) => ({ x: i, y: range(20).map(() => random(1, 100)) }));

export const generateRandomData = (points = 6) =>
  range(1, points + 1).map((i) => ({ x: i, y: i + random(-1, 2) }));

export const getTransitionData = () => {
  const n = random(4, 10);
  return range(n).map((i) => {
    return {
      x: i,
      y: random(2, 10),
    };
  });
};

export const getYFunction = () => {
  const n = random(2, 7);
  return (data: { x: number }) =>
    Math.exp(-n * data.x) * Math.sin(2 * n * Math.PI * data.x);
};

export const getStyles = () => {
  const colors = ["red", "orange", "magenta", "gold", "blue", "purple"];
  return {
    stroke: colors[random(0, 5)],
    strokeWidth: random(1, 5),
  };
};
