/* eslint no-magic-numbers: ["error", { "ignore": [0, 1, 2, 2.5, 3] }]*/

import * as Helpers from "./helpers";

export function circle(x: number, y: number, size: number) {
  return `M ${x}, ${y}
      m ${-size}, 0
      a ${size}, ${size} 0 1,0 ${size * 2},0
      a ${size}, ${size} 0 1,0 ${-size * 2},0`;
}

export function square(x: number, y: number, size: number) {
  const baseSize = 0.87 * size; // eslint-disable-line no-magic-numbers
  const x0 = x - baseSize;
  const y1 = y + baseSize;
  const distance = x + baseSize - x0;
  return `M ${x0}, ${y1}
      h${distance}
      v-${distance}
      h-${distance}
      z`;
}

export function diamond(x: number, y: number, size: number) {
  const baseSize = 0.87 * size; // eslint-disable-line no-magic-numbers
  const length = Math.sqrt(2 * (baseSize * baseSize));
  return `M ${x}, ${y + length}
      l ${length}, -${length}
      l -${length}, -${length}
      l -${length}, ${length}
      l ${length}, ${length}
      z`;
}

export function triangleDown(x: number, y: number, size: number) {
  const height = (size / 2) * Math.sqrt(3);
  const x0 = x - size;
  const x1 = x + size;
  const y0 = y - size;
  const y1 = y + height;
  return `M ${x0}, ${y0}
      L ${x1}, ${y0}
      L ${x}, ${y1}
      z`;
}

export function triangleUp(x: number, y: number, size: number) {
  const height = (size / 2) * Math.sqrt(3);
  const x0 = x - size;
  const x1 = x + size;
  const y0 = y - height;
  const y1 = y + size;
  return `M ${x0}, ${y1}
      L ${x1}, ${y1}
      L ${x}, ${y0}
      z`;
}

export function plus(x: number, y: number, size: number) {
  const baseSize = 1.1 * size; // eslint-disable-line no-magic-numbers
  const distance = baseSize / 1.5; // eslint-disable-line no-magic-numbers
  return `
      M ${x - distance / 2}, ${y + baseSize}
      v-${distance}
      h-${distance}
      v-${distance}
      h${distance}
      v-${distance}
      h${distance}
      v${distance}
      h${distance}
      v${distance}
      h-${distance}
      v${distance}
      z`;
}

export function cross(x: number, y: number, size: number) {
  const baseSize = 0.8 * size; // eslint-disable-line no-magic-numbers
  const distance = baseSize / 1.5; // eslint-disable-line no-magic-numbers
  return `
      M ${x - distance / 2}, ${y + baseSize + distance}
      v-${distance * 2}
      h-${distance}
      v-${distance}
      h${distance}
      v-${distance}
      h${distance}
      v${distance}
      h${distance}
      v${distance}
      h-${distance}
      v${distance * 2}
      z`;
}

export function minus(x: number, y: number, size: number) {
  const baseSize = 1.1 * size; // eslint-disable-line no-magic-numbers
  const lineHeight = baseSize - baseSize * 0.3; // eslint-disable-line no-magic-numbers
  const x0 = x - baseSize;
  const y1 = y + lineHeight / 2;
  const distance = x + baseSize - x0;
  return `M ${x0}, ${y1}
      h${distance}
      v-${lineHeight}
      h-${distance}
      z`;
}

export function star(x: number, y: number, size: number) {
  const baseSize = 1.35 * size; // eslint-disable-line no-magic-numbers
  const angle = Math.PI / 5; // eslint-disable-line no-magic-numbers
  // eslint-disable-next-line no-magic-numbers
  const starCoords = Helpers.range(10).map((index) => {
    const length = index % 2 === 0 ? baseSize : baseSize / 2;
    return `${length * Math.sin(angle * (index + 1)) + x},
        ${length * Math.cos(angle * (index + 1)) + y}`;
  });
  return `M ${starCoords.join("L")} z`;
}
