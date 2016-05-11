import $ from "cheerio";

const SvgTestHelper = {
  RECTANGULAR_SEQUENCE: ["M", "L", "L", "L", "L"],

  expectIsRectangular(wrapper) {
    expect(exhibitsRectangularDirectionSequence(wrapper)).to.be.true;
  }
};

function exhibitsRectangularDirectionSequence(wrapper) {
  const commands = getPathCommandsFromWrapper(wrapper);
  return commands.every((command, index) => {
    return command.name === SvgTestHelper.RECTANGULAR_SEQUENCE[index];
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
