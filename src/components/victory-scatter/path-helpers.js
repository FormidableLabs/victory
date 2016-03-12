import range from "lodash/range";

export default {
  circle(x, y, size) {
    return `M ${x}, ${y} m ${-size}, 0
      a ${size}, ${size} 0 1,0 ${size * 2},0
      a ${size}, ${size} 0 1,0 ${-size * 2},0`;
  },

  square(x, y, size) {
    const baseSize = 0.87 * size;
    return `M ${x - baseSize}, ${y + baseSize}
      L ${x + baseSize}, ${y + baseSize}
      L ${x + baseSize}, ${y - baseSize}
      L ${x - baseSize}, ${y - baseSize}
      z`;
  },

  diamond(x, y, size) {
    const baseSize = 0.87 * size;
    const length = Math.sqrt(2 * (baseSize * baseSize));
    return `M ${x}, ${y + length}
      L ${x + length}, ${y}
      L ${x}, ${y - length}
      L ${x - length}, ${y}
      z`;
  },

  triangleDown(x, y, size) {
    const height = (size / 2 * Math.sqrt(3));
    return `M ${x - size}, ${y - size}
      L ${x + size}, ${y - size}
      L ${x}, ${y + height}
      z`;
  },

  triangleUp(x, y, size) {
    const height = (size / 2 * Math.sqrt(3));
    return `M ${x - size}, ${y + size}
      L ${x + size}, ${y + size}
      L ${x}, ${y - height}
      z`;
  },

  plus(x, y, size) {
    const baseSize = 1.1 * size;
    return `M ${x - baseSize / 2.5}, ${y + baseSize}
      L ${x + baseSize / 2.5}, ${y + baseSize}
      L ${x + baseSize / 2.5}, ${y + baseSize / 2.5}
      L ${x + baseSize}, ${y + baseSize / 2.5}
      L ${x + baseSize}, ${y - baseSize / 2.5}
      L ${x + baseSize / 2.5}, ${y - baseSize / 2.5}
      L ${x + baseSize / 2.5}, ${y - baseSize}
      L ${x - baseSize / 2.5}, ${y - baseSize}
      L ${x - baseSize / 2.5}, ${y - baseSize / 2.5}
      L ${x - baseSize}, ${y - baseSize / 2.5}
      L ${x - baseSize}, ${y + baseSize / 2.5}
      L ${x - baseSize / 2.5}, ${y + baseSize / 2.5}
      z`;
  },

  star(x, y, size) {
    const baseSize = 1.35 * size;
    const angle = Math.PI / 5;
    const starCoords = range(10).map((index) => {
      const length = index % 2 === 0 ? baseSize : baseSize / 2;
      return `${length * Math.sin(angle * (index + 1)) + x},
        ${length * Math.cos(angle * (index + 1)) + y}`;
    });
    return `M ${starCoords.join("L")} z`;
  }
};
