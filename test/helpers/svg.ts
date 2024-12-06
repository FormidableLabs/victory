import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import { _internalD3Voronoi as d3Voronoi } from "victory-voronoi/lib/helper-methods";
import without from "lodash/without";
import min from "lodash/min";
import max from "lodash/max";
import property from "lodash/property";

const RECTANGULAR_SEQUENCE = ["M", "A", "L", "A", "L", "A", "L", "A", "z"];
const CIRCULAR_SEQUENCE = ["M", "m", "a", "a"];
const TRIANGULAR_SEQUENCE = ["M", "L", "L", "z"];
const CIRCULAR_SECTOR_SEQUENCE = ["M", "A", "L", "Z"];

export const calculateD3Path = (props, pathType, index = 0) => {
  const { width, height, padding, scale, interpolation, data, domain } = props;
  const scaleType = scale
    ? `scale${scale[0].toUpperCase() + scale.slice(1)}`
    : "scaleLinear";
  const curveType =
    typeof interpolation === "string"
      ? `curve${interpolation[0].toUpperCase() + interpolation.slice(1)}`
      : undefined;
  const curveFunction =
    typeof interpolation === "function" ? interpolation : d3Shape[curveType!];

  const dataDomain = data.reduce(
    (prev, datum) => {
      if (datum.x < prev.x[0]) {
        prev.x[0] = datum.x;
      } else if (datum.x > prev.x[1]) {
        prev.x[1] = datum.x;
      }

      if (datum.y < prev.y[0]) {
        prev.y[0] = datum.y;
      } else if (datum.y > prev.y[1]) {
        prev.y[1] = datum.y;
      }

      return prev;
    },
    { x: [0, 0], y: [0, 0] },
  );

  const range = {
    x: [padding, width - padding],
    y: [height - padding, padding],
  };

  const scaleX = d3Scale[scaleType]()
    .domain((domain && domain.x) || dataDomain.x)
    .range(range.x);
  const scaleY = d3Scale[scaleType]()
    .domain((domain && domain.y) || dataDomain.y)
    .range(range.y);

  switch (pathType) {
    case "line": {
      return d3Shape
        .line()
        .curve(curveFunction)
        .x((d) => scaleX(d.x))
        .y((d) => scaleY(d.y))(data);
    }
    case "area": {
      const modifiedData = props.data.map((datum) => {
        return { x: datum.x, y: datum.y, y1: datum.y, y0: datum.y0 };
      });
      return d3Shape
        .area()
        .curve(curveFunction)
        .x((d) => scaleX(d.x))
        .y1((d) => scaleY(d.y1))
        .y0((d) => scaleY(d.y0))(modifiedData);
    }
    case "voronoi": {
      const minRange = [Math.min(...range.x), Math.min(...range.y)];
      const maxRange = [Math.max(...range.x), Math.max(...range.y)];
      const voronoi = d3Voronoi()
        .x((d) => scaleX(d.x))
        .y((d) => scaleY(d.y))
        .extent([minRange, maxRange]);
      const polygons = voronoi.polygons(data);
      const polygon = without(polygons[index], "data");
      return `M ${polygon.join("L")} Z`;
    }
  }

  return undefined;
};

export const parseSvgPathCommands = (commandStr) => {
  const matches = commandStr.match(
    /[MmLlHhVvCcSsQqTtAaZz]+[^MmLlHhVvCcSsQqTtAaZz]*/g,
  );

  return matches.map((match) => {
    const name = match.charAt(0);
    const args = match
      .substring(1)
      .split(",")
      .map((arg) => {
        return parseFloat(arg);
      });

    return {
      raw: match,
      name,
      args,
    };
  });
};

export const getPathCommandsFromContainer = (container) => {
  const commandStr = container.getAttribute("d");
  return parseSvgPathCommands(commandStr);
};

export const exhibitsShapeSequence = (commandString, shapeSeqeuence) => {
  const commands = parseSvgPathCommands(commandString);
  return commands.every(
    (command, index) => command.name === shapeSeqeuence[index],
  );
};

/**
 * Retrieve the raw svg height of a bar.
 *
 * @param {string} commandString - The "d" attribute of a `path` element.
 * @returns {Number}             - The height of the bar in svg units.
 */
export const getBarHeight = (commandString) => {
  const commands = parseSvgPathCommands(commandString);

  return Math.abs(commands[0].args[1] - commands[2].args[1]);
};

/**
 * Assert the provided element renders a 4-sided shape and return dimensions.
 *
 * @param {HTMLElement} path - An HTML path element.
 * @returns {Object}         - Dimensions of the shape
 */
export const getBarShape = (path) => {
  const commandstring = path.getAttribute("d");
  const commands = parseSvgPathCommands(commandstring);

  const points = commands.filter((command) => {
    return command.name !== "z";
  });
  const verticalPoints: any[] = points.map(property("args.1"));
  const horizontalPoints: any[] = points.map(property("args.0"));
  const height = max(verticalPoints) - min(verticalPoints);
  const width = max(horizontalPoints) - min(horizontalPoints);

  return {
    height,
    width,
  };
};

export const getDistanceFromOrigin = (coord) => {
  return Math.sqrt(Math.pow(coord.x, 2) + Math.pow(coord.y, 2));
};

/**
 * Get the angle between 2 arbitrary SVG coordinates,
 * using 0, 0 as origin
 *
 * @param {{x: number, y: number}} coord1 SVG coordinates for point 1
 * @param {{x: number, y: number}} coord2 SVG coordinates for point 2
 * @return {number} Degrees, 0 - 360
 */
export const getAngleBetweenSVGCoordinates = (coord1, coord2) => {
  const cartesianY1 = coord1.y * -1;
  const cartesianY2 = coord2.y * -1;

  const radians =
    Math.atan2(cartesianY1, coord1.x) - Math.atan2(cartesianY2, coord2.x);
  const theta = radians * (180 / Math.PI);

  return theta < 0 ? 360 + theta : theta;
};

/**
 * Get the initial coordinates of the arc drawn in an SVG pie slice
 *
 * @param {String} sliceCommandString The command attribute of a `path` element
 * @return {{x: number, y: number}}   SVG coordinates
 */
export const getSliceArcStart = (sliceCommandString) => {
  const cmds = parseSvgPathCommands(sliceCommandString);

  return {
    x: cmds[0].args[0],
    y: cmds[0].args[1],
  };
};

/**
 * Get the final coordinates of the arc drawn in an SVG pie slice
 *
 * @param {String} sliceCommandString The command attribute of a `path` element
 * @return {{x: number, y: number}}   SVG coordinates
 */
export const getSliceArcEnd = (sliceCommandString) => {
  const cmds = parseSvgPathCommands(sliceCommandString);

  // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Arcto
  return {
    x: cmds[1].args[5],
    y: cmds[1].args[6],
  };
};

/**
 * Translate SVG coordinates to cartesian system and get clockwise
 * from positive Y axis
 *
 * @param {{x: number, y: number}} coord X & Y values in SVG coordinate system
 * @return {number}                      Degrees from normal Cartesian positive Y axis axis, counter clockwise
 */
export const getSvgCoordinatesAngleFromCartesianYAxis = (coord) => {
  const cartesianY = coord.y * -1; // Y coordinate in SVG system is inverse of normal Cartesian
  const theta = Math.atan2(coord.x, cartesianY) * (180 / Math.PI);

  return theta < 0 ? 360 + theta : theta;
};

/**
 * Determines if a rectangular shape is produced from the provided path command.
 *
 * @param {String} commandString - The command attribute of a `path` element.
 * @returns {Boolean}            - Boolean indicating if the command string produces a rectangular shape.
 */
export const isBar = (commandString) =>
  exhibitsShapeSequence(commandString, RECTANGULAR_SEQUENCE);

/**
 * Determines if a circular shape is produced from the provided path command.
 *
 * @param {String} commandString - The command attribute of a `path` element.
 * @returns {Boolean}            - Boolean indicating if the command string produces a circular shape.
 */
export const isCircle = (commandString) =>
  exhibitsShapeSequence(commandString, CIRCULAR_SEQUENCE);

/**
 * Determines if a triangular shape is produced from the provided path command.
 *
 * @param {String} commandString - The command attribute of a `path` element.
 * @returns {Boolean}            - Boolean indicating if the command string produces a triangular shape.
 */
export const isTriangle = (commandString) =>
  exhibitsShapeSequence(commandString, TRIANGULAR_SEQUENCE);

/**
 * Determines if a circular sector (slice of pie) shape is produced from the provided path command.
 *
 * @param {String} commandString - The command attribute of a `path` element.
 * @returns {Boolean}            - Boolean indicating if the command string produces a circular sector shape.
 */
export const isCircularSector = (commandString) =>
  exhibitsShapeSequence(commandString, CIRCULAR_SECTOR_SEQUENCE);
export const getSvgPointCoordinates = (container) => {
  const commands = getPathCommandsFromContainer(container);
  return commands[0].args;
};

/**
 * Convert the raw svg coordinates to scaled Cartesian coordinates.
 *
 * @param {Array} coords - The x and y coordinates, respectively.
 * @param {Object} svgDimensions - The width, height, and padding of the svg.
 * @param {Number} svgDimensions.width - The width of the svg.
 * @param {Number} svgDimensions.height - The height of the svg.
 * @param {Number} svgDimensions.padding - The space between the edge of the
 *   svg and the chart area.
 * @param {Object} domain - The x and y domains.
 * @param {Array} domain.x - The lower and upper x bounds, respectively.
 * @param {Array} domain.y - The lower and upper y bounds, respectively.
 * @returns {Array} The Cartesian x and y coordinates, respectively.
 */
export const convertSvgCoordinatesToCartesian = (
  coords,
  svgDimensions,
  domain,
) => {
  const { width, height, padding } = svgDimensions;

  const cartesianX = coords[0] - padding;
  const cartesianY = height - coords[1] - padding;

  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const scaledX = (cartesianX / chartWidth) * (domain.x[1] - domain.x[0]);
  const scaledY = (cartesianY / chartHeight) * (domain.y[1] - domain.y[0]);

  const shiftedX = scaledX + domain.x[0];
  const shiftedY = scaledY + domain.y[0];

  return [shiftedX, shiftedY];
};
