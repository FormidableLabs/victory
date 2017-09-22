/*eslint no-magic-numbers: ["error", { "ignore": [0, 1, 2, 2.5, 3] }]*/
import { range } from "lodash";

export default {
  circle(x, y, size) {
    const s = Math.floor(size);
    return `
        M ${Math.floor(x)}, ${Math.floor(y)}
        m ${-s}, 0
        a ${s}, ${s} 0 1,0 ${s * 2},0
        a ${s}, ${s} 0 1,0 ${-s * 2},0
    `;
  },

  square(x, y, size) {
    const baseSize = 0.87 * size; // eslint-disable-line no-magic-numbers
    const x0 = Math.floor(x - baseSize);
    const y1 = Math.floor(y + baseSize);
    const distance = Math.abs(x0 - y1);
    return `M ${x0}, ${y1}
            h${distance}
            v-${distance}
            h-${distance}
            z`;
  },

  diamond(x, y, size) {
    const baseSize = 0.87 * size; // eslint-disable-line no-magic-numbers
    const length = Math.sqrt(2 * (baseSize * baseSize));
    const distance = Math.floor(length);
    return `M ${Math.floor(x)}, ${Math.floor(y + length)}
      l ${distance}, -${distance}
      l -${distance}, -${distance}
      l -${distance}, ${distance}
      l ${distance}, ${distance}
      z`;
  },

  triangleDown(x, y, size) {
    const height = size / 2 * Math.sqrt(3);
    const x0 = Math.floor(x - size);
    const x1 = Math.floor(x + size);
    const y0 = Math.floor(y - size);
    const y1 = Math.floor(y + height);
    return `M ${x0}, ${y0}
            L ${x1}, ${y0}
            L ${Math.floor(x)}, ${y1}
            z`;
  },

  triangleUp(x, y, size) {
    const height = size / 2 * Math.sqrt(3);
    const x0 = Math.floor(x - size);
    const x1 = Math.floor(x + size);
    const y0 = Math.floor(y - height);
    const y1 = Math.floor(y + size);
    return `M ${x0}, ${y1}
          L ${x1}, ${y1}
          L ${Math.floor(x)}, ${y0}
          z`;
  },

  plus(x, y, size) {
    const baseSize = 1.1 * size; // eslint-disable-line no-magic-numbers
    const distance = Math.floor(baseSize / 2.5) * 2 || 1;
    return `
        M ${Math.floor(x - baseSize / 2.5)}, ${Math.floor(y + baseSize)}
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
  },

  star(x, y, size) {
    const baseSize = 1.35 * size; // eslint-disable-line no-magic-numbers
    const angle = Math.PI / 5; // eslint-disable-line no-magic-numbers
    const starCoords = range(10).map((index) => { // eslint-disable-line no-magic-numbers
      const length = index % 2 === 0 ? baseSize : baseSize / 2;
      return `${length * Math.sin(angle * (index + 1)) + x},
        ${length * Math.cos(angle * (index + 1)) + y}`;
    });
    return `M ${starCoords.join("L")} z`;
  }
};
