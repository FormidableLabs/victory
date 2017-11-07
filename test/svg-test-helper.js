/* eslint-disable no-use-before-define, no-unused-expressions */

/**
 * Collection of helper functions to be used with
 * SVG DOM elements & Enzyme wrappers in tests.
 *
 * This class ASSUMES it will be run in a test environment,
 * meaning it will use `expect` & other test utilities without warning.
 */
const SvgTestHelper = {
  /**
   * Assert the given wrapper renders to an SVG path
   * in the shape of a circular sector.
   *
   * A circular sector is "pizza slice shaped"
   *
   * "Naive" analysis of rendered shape - only works for normal
   * D3 direction sequence for creating a circular section
   *
   * @param  {ShallowWrapper} wrapper Enzyme wrapper
   * @return {boolean} Whether or not it's a circular section
   */
  expectIsCircularSection: (wrapper) => {
    expect(exhibitsCircularSectionDirectionSequence(wrapper),
      "Wrapper has a circular section command sequence").to.be.true;
  },

  /**
   * Assert the given wrapper renders to a path in the shape
   * of an annular section
   *
   * "Naive" analysis of rendered shape - only works for normal
   * D3 direction sequence for creating an annular section
   *
   * @param  {ShallowWrapper} wrapper Enzyme wrapper
   * @return {boolean} Whether or not it's a circular section
   */
  expectIsAnnularSection: (wrapper) => { // eslint-disable-line max-statements
    const commands = getPathCommandsFromSliceWrapper(wrapper);

    expect(commands).to.have.lengthOf(5);
    expect(commands[0].name).to.equal("M");
    expect(commands[1].name).to.equal("A");
    expect(commands[2].name).to.equal("L");
    expect(commands[3].name).to.equal("A");
    expect(commands[4].name).to.equal("Z");

    const firstSweepFlag = commands[1].args[4];
    const secondSweepFlag = commands[3].args[4];
    expect(firstSweepFlag,
      "The 2 arcs are drawn in opposite directions").to.not.eql(secondSweepFlag);

    const startOfOuterArc = {
      x: commands[0].args[0],
      y: commands[0].args[1]
    };
    const endOfOuterArc = {
      x: commands[1].args[5],
      y: commands[1].args[6]
    };

    expect(SvgTestHelper.getDistanceFromOrigin(startOfOuterArc),
      "The outer arc begins and ends the same distance from the origin")
      .to.be.closeTo(SvgTestHelper.getDistanceFromOrigin(endOfOuterArc), 0.001);

    const startOfInnerArc = {
      x: commands[2].args[0],
      y: commands[2].args[1]
    };
    const endOfInnerArc = {
      x: commands[3].args[5],
      y: commands[3].args[6]
    };
    expect(SvgTestHelper.getDistanceFromOrigin(startOfInnerArc),
      "The inner arc begins and ends the same distance from the origin")
      .to.be.closeTo(SvgTestHelper.getDistanceFromOrigin(endOfInnerArc), 0.001);
  },

  getInnerRadiusOfCircularOrAnnularSlice: (wrapper) => {
    if (exhibitsCircularSectionDirectionSequence(wrapper)) {
      return 0;
    }

    const commands = getPathCommandsFromSliceWrapper(wrapper);
    expect(commands[2].name).to.equal("L");
    const startOfInnerArc = {
      x: commands[2].args[0],
      y: commands[2].args[1]
    };

    return SvgTestHelper.getDistanceFromOrigin(startOfInnerArc);
  },

  /**
   * Translate SVG coordinates to cartesian system and get clockwise
   * from positive Y axis
   *
   * @todo Refactor to us `self::getAngleBetweenSVGCoordinates` internally
   * @param {{x: number, y: number}} coord X & Y values in SVG coordinate system
   * @return {number} Degrees from normal Cartesian positive Y axis axis, counter clockwise
   */
  getSvgCoordinatesAngleFromCartesianYAxis: (coord) => {
    const cartesianY = coord.y * -1; // Y coordinate in SVG system is inverse of normal Cartesian
    const theta = Math.atan2(coord.x, cartesianY) * (180 / Math.PI);

    return theta < 0 ? 360 + theta : theta;
  },

  /**
   * Parse SVG path direction into usable data structure
   *
   * @param {string} str SVG path direction ("d" attribute)
   * @return {Object[]} Parsed directions
   */
  parseSvgPathCommands: (str) => {
    // Match on all valid SVG path commands
    const matches = str.match(/[MmLlHhVvCcSsQqTtAaZz]+[^MmLlHhVvCcSsQqTtAaZz]*/g);

    return matches.map((match) => {
      return {
        raw: match,
        name: match.charAt(0),
        args: match.substring(1)
          .split(",")
          .map((arg) => parseFloat(arg, 10))
      };
    });
  },

  /**
   * Get the initial coordinates of the arc drawn in an SVG pie slice
   *
   * @param {ShallowWrapper} sliceWrapper Enzyme ShallowWrapper around a Slice
   * @return {{x: number, y: number}} SVG coordinates
   */
  getSliceArcStart: (sliceWrapper) => {
    const pathDescriptions = sliceWrapper.find("path").prop("d");
    const cmds = SvgTestHelper.parseSvgPathCommands(pathDescriptions);
    expect(cmds[0].name).to.eql("M");

    return {
      x: cmds[0].args[0],
      y: cmds[0].args[1]
    };
  },

  /**
   * Get the final coordinates of the arc drawn in an SVG pie slice
   *
   * @param {ShallowWrapper} sliceWrapper Enzyme ShallowWrapper around a Slice
   * @return {{x: number, y: number}} SVG coordinates
   */
  getSliceArcEnd: (sliceWrapper) => {
    const pathDescriptions = sliceWrapper.find("path").prop("d");
    const cmds = SvgTestHelper.parseSvgPathCommands(pathDescriptions);
    expect(cmds[1].name).to.eql("A");

    // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Arcto
    return {
      x: cmds[1].args[5],
      y: cmds[1].args[6]
    };
  },

  /**
   * Get inner degress of a Slice or similar component rendered
   * by the VictoryPie component
   *
   * Assumes the start & end points of the arc are available in the first
   * 2 SVG commands of the path description
   *
   * @param {ShallowWrapper} slice Enzyme ShallowWrapper around a Slice
   * @return {number} Degrees, 0 to 360
   */
  getSliceInnerDegrees: (slice) => {
    const pathDescriptions = slice.find("path").prop("d");
    const cmds = SvgTestHelper.parseSvgPathCommands(pathDescriptions);
    expect(cmds[0].name).to.eql("M");
    expect(cmds[1].name).to.eql("A");

    const coord1 = {
      x: cmds[0].args[0],
      y: cmds[0].args[1]
    };
    // @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Arcto
    const coord2 = {
      x: cmds[1].args[5],
      y: cmds[1].args[6]
    };

    return SvgTestHelper.getAngleBetweenSVGCoordinates(coord1, coord2);
  },

  /**
   * Get the angle between 2 arbitrary SVG coordinates,
   * using 0, 0 as origin
   *
   * @param {{x: number, y: number}} coord1 SVG coordinates for point 1
   * @param {{x: number, y: number}} coord2 SVG coordinates for point 2
   * @return {number} Degrees, 0 - 360
   */
  getAngleBetweenSVGCoordinates: (coord1, coord2) => {
    const cartesianY1 = coord1.y * -1;
    const cartesianY2 = coord2.y * -1;

    const radians = Math.atan2(cartesianY1, coord1.x) - Math.atan2(cartesianY2, coord2.x);
    const theta = radians * (180 / Math.PI);

    return theta < 0 ? 360 + theta : theta;
  },

  getDistanceFromOrigin: (coord) => {
    return Math.sqrt(Math.pow(coord.x, 2) + Math.pow(coord.y, 2));
  }
};

const getPathCommandsFromSliceWrapper = (wrapper) => {
  const dAttr = /path d="([^"]*)"/.exec(wrapper.html())[1];

  return SvgTestHelper.parseSvgPathCommands(dAttr);
};

const exhibitsCircularSectionDirectionSequence = (wrapper) => {
  const CIRCULAR_SECTION_SIMPLE_DIRECTIONS = ["M", "A", "L", "Z"];

  const commands = getPathCommandsFromSliceWrapper(wrapper);

  return commands.every((cmd, i) => {
    return cmd.name === CIRCULAR_SECTION_SIMPLE_DIRECTIONS[i];
  });
};

export default SvgTestHelper;
