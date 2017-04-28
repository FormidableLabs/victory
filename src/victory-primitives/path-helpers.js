/*eslint no-magic-numbers: ["error", { "ignore": [0, 1, 2, 2.5, 3] }]*/
import { range } from "lodash";

export default {
  circle(x, y, size) {
    const s = Math.round(size);
    return `M ${Math.round(x)}, ${Math.round(y)} m ${-s}, 0
      a ${s}, ${s} 0 1,0 ${s * 2},0
      a ${s}, ${s} 0 1,0 ${-s * 2},0`;
  },

  square(x, y, size) {
    const baseSize = 0.87 * size; // eslint-disable-line no-magic-numbers
    const x0 = Math.round(x - baseSize);
    const x1 = Math.round(x + baseSize);
    const y0 = Math.round(y - baseSize);
    const y1 = Math.round(y + baseSize);
    return `M ${x0}, ${y1}
      L ${x1}, ${y1}
      L ${x1}, ${y0}
      L ${x0}, ${y0}
      z`;
  },

  diamond(x, y, size) {
    const baseSize = 0.87 * size; // eslint-disable-line no-magic-numbers
    const length = Math.sqrt(2 * (baseSize * baseSize));
    return `M ${Math.round(x)}, ${Math.round(y + length)}
      L ${Math.round(x + length)}, ${Math.round(y)}
      L ${Math.round(x)}, ${Math.round(y - length)}
      L ${Math.round(x - length)}, ${Math.round(y)}
      z`;
  },

  triangleDown(x, y, size) {
    const height = (size / 2 * Math.sqrt(3));
    const x0 = Math.round(x - size);
    const x1 = Math.round(x + size);
    const y0 = Math.round(y - size);
    const y1 = Math.round(y + height);
    return `M ${x0}, ${y0}
      L ${x1}, ${y0}
      L ${Math.round(x)}, ${y1}
      z`;
  },

  triangleUp(x, y, size) {
    const height = (size / 2 * Math.sqrt(3));
    const x0 = Math.round(x - size);
    const x1 = Math.round(x + size);
    const y0 = Math.round(y - height);
    const y1 = Math.round(y + size);
    return `M ${x0}, ${y1}
      L ${x1}, ${y1}
      L ${Math.round(x)}, ${y0}
      z`;
  },

  plus(x, y, size) {
    const baseSize = 1.1 * size; // eslint-disable-line no-magic-numbers
    return `M ${Math.round(x - baseSize / 2.5)}, ${Math.round(y + baseSize)}
      L ${Math.round(x + baseSize / 2.5)}, ${Math.round(y + baseSize)}
      L ${Math.round(x + baseSize / 2.5)}, ${Math.round(y + baseSize / 2.5)}
      L ${Math.round(x + baseSize)}, ${Math.round(y + baseSize / 2.5)}
      L ${Math.round(x + baseSize)}, ${Math.round(y - baseSize / 2.5)}
      L ${Math.round(x + baseSize / 2.5)}, ${Math.round(y - baseSize / 2.5)}
      L ${Math.round(x + baseSize / 2.5)}, ${Math.round(y - baseSize)}
      L ${Math.round(x - baseSize / 2.5)}, ${Math.round(y - baseSize)}
      L ${Math.round(x - baseSize / 2.5)}, ${Math.round(y - baseSize / 2.5)}
      L ${Math.round(x - baseSize)}, ${Math.round(y - baseSize / 2.5)}
      L ${Math.round(x - baseSize)}, ${Math.round(y + baseSize / 2.5)}
      L ${Math.round(x - baseSize / 2.5)}, ${Math.round(y + baseSize / 2.5)}
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
