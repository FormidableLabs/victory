const FLYOUT_SEQUENCE = ["M", "L", "L", "L", "A", "L", "A", "L", "A", "L", "A", "z"];

const parseSvgPathCommands = (commandStr) => {
  const matches = commandStr.match(
    /[MmLlHhVvCcSsQqTtAaZz]+[^MmLlHhVvCcSsQqTtAaZz]*/g
  );

  return matches.map((match) => {
    const name = match.charAt(0);
    const args = match.substring(1).split(",").map((arg) => {
      return parseFloat(arg, 10);
    });

    return {
      raw: match,
      name,
      args
    };
  });
};

const getPathCommandsFromWrapper = (wrapper) => {
  const commandStr = wrapper.render().find("path").attr("d");
  return parseSvgPathCommands(commandStr);
};

const exhibitsShapeSequence = (wrapper, shapeSequence) => {
  const commands = getPathCommandsFromWrapper(wrapper);
  return commands.every((command, index) => {
    return command.name === shapeSequence[index];
  });
};


const expectations = {

  /**
   * Assert the wrapper renders a flyout shape.
   *
   * @param {ShallowWrapper} wrapper - An enzyme wrapper.
   * @returns {undefined}
   */
  expectIsFlyout(wrapper) {
    expect(exhibitsShapeSequence(wrapper, FLYOUT_SEQUENCE)).to.equal(true);
  }
};

export default expectations;
