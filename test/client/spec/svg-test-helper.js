import { property, max, min } from "lodash";

const FLYOUT_SEQUENCE = ["M", "L", "L", "L", "A", "L", "A", "L", "A", "L", "A", "z"];
const RECTANGLE_SEQUENCE = ["M", "L", "L", "L", "L", "z"];

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

const exhibitsShapeSequence = (wrapper, expectedSequence, commands) => {
  return commands.every((command, index) => {
    return command.name === expectedSequence[index];
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
    const commands = getPathCommandsFromWrapper(wrapper);
    expect(exhibitsShapeSequence(wrapper, FLYOUT_SEQUENCE, commands)).to.equal(true);
  },
  expectIsVerticalBar(wrapper, yValue) {
    const commands = getPathCommandsFromWrapper(wrapper);

    expect(exhibitsShapeSequence(wrapper, RECTANGLE_SEQUENCE, commands)).to.equal(true);

    const points = commands.filter((command) => { return command.name !== "z"; });
    const verticalPoints = points.map(property("args.1"));
    const height = max(verticalPoints) - min(verticalPoints);

    expect(height).to.eql(yValue);
  },
  expectIsHorizontalBar(wrapper, yValue) {
    const commands = getPathCommandsFromWrapper(wrapper);

    expect(exhibitsShapeSequence(wrapper, RECTANGLE_SEQUENCE, commands)).to.equal(true);

    const points = commands.filter((command) => { return command.name !== "z"; });
    const horizontalPoints = points.map(property("args.0"));
    const width = max(horizontalPoints) - min(horizontalPoints);

    expect(width).to.eql(yValue);
  }
};

export default expectations;
