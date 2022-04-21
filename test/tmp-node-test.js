/**
 * Temporary Node.js test to exercise ESM issues.
 *
 * TODO: Either remove this or convert it to a real test suite.
 *
 * Usage:
 *
 * ```sh
 * $ node ./test/tmp-node-test.js
 * ```
 */
const React = require("react");
const { renderToString } = require("react-dom/server");
const { victoryInterpolator } = require("../packages/victory-core/lib/victory-animation/util.js");
const { VictoryAnimation } = require("../packages/victory-core");

const main = async () => {
  // Just call the interpolator async
  console.log("\n## Manual victoryInterpolator test");
  const interpolator = await victoryInterpolator("red", "blue");
  console.log("interpolator('red', 'blue')(0.5) -> ", interpolator(0.5));

  // Do an actual Node.js SSR.
  // TODO: Render Victory Animation
  // TODO: Actually force a resolve on the async interpolation stuff.
  console.log("\n## VictoryAnimation test");
  const Component = React.createElement(VictoryAnimation, {
    duration: 1000,
    data: "TODO"
  }, function (tweenedProps, animationInfo) {
    console.log("TODO USE INTERPOLATION", { tweenedProps, animationInfo });
    return React.createElement("div", null, "hello");
  });

  const markup = renderToString(Component);
  console.log(markup);
}

if (require.main === module) {
  main();
}
