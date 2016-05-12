import $ from "cheerio";

const RECTANGULAR_SEQUENCE = ["M", "L", "L", "L", "L"];
const CIRCULAR_SEQUENCE = ["M", "m", "a", "a"];

const SvgTestHelper = {
  expectIsRectangular(wrapper) {
    expect(exhibitsShapeSequence(wrapper, RECTANGULAR_SEQUENCE)).to.be.true;
  },

  expectIsCircular(wrapper) {
    expect(exhibitsShapeSequence(wrapper, CIRCULAR_SEQUENCE)).to.be.true;
  }
};

function exhibitsShapeSequence(wrapper, shapeSequence) {
  const commands = getPathCommandsFromWrapper(wrapper);
  return commands.every((command, index) => {
    return command.name === shapeSequence[index];
  });
}

function getPathCommandsFromWrapper(wrapper) {
  const commandStr = $(wrapper.html()).attr("d");
  return parseSvgPathCommands(commandStr);
}

function parseSvgPathCommands(commandStr) {
  const matches = commandStr.match(
    /[MmLlHhVvCcSsQqTtAaZz]+[^MmLlHhVvCcSsQqTtAaZz]*/g
  );

  return matches.map(match => {
    const name = match.charAt(0);
    const args = match.substring(1).split(",").map(arg => parseFloat(arg, 10));

    return {
      raw: match,
      name,
      args
    }
  });
}

export default SvgTestHelper;
