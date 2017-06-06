const defined = (d) => {
  const y = d._y1 !== undefined ? d._y1 : d._y;
  return y !== null && y !== undefined && d._y0 !== null;
};

const getXAccessor = (scale) => {
  return (d) => scale.x(d._x1 !== undefined ? d._x1 : d._x);
};

const getYAccessor = (scale) => {
  return (d) => scale.y(d._y1 !== undefined ? d._y1 : d._y);
};

const getY0Accessor = (scale) => {
  return (d) => scale.y(d._y0);
};

const getAngleAccessor = (scale) => {
  return (d) => {
    const x = scale.x(d._x1 !== undefined ? d._x1 : d._x);
    return -1 * x + Math.PI / 2;
  };
};

export { defined, getXAccessor, getYAccessor, getY0Accessor, getAngleAccessor };
