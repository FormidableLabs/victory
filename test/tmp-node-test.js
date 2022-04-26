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
const { interpolate } = require("victory-vendor/d3-interpolate");

const {
  victoryInterpolator
} = require("victory-core/lib/victory-animation/util.js");

const React = require("react");
const { renderToString } = require("react-dom/server");
const { VictoryAnimation } = require("victory-core");

const main = async () => {
  // Import vendor code
  console.log("\n## Manual interpolate test");
  const d3Interpolator = interpolate("red", "blue");
  console.log("d3Interpolator('red', 'blue')(0.5) -> ", d3Interpolator(0.5));

  // Just call the interpolator async
  console.log("\n## Manual victoryInterpolator test");
  const interpolator = victoryInterpolator("red", "blue");
  console.log("interpolator('red', 'blue')(0.5) -> ", interpolator(0.5));

  // Do an actual Node.js SSR.
  // TODO: Render Victory Animation
  // TODO: Actually force a resolve on the async interpolation stuff.
  console.log("\n## VictoryAnimation test");
  const Component = React.createElement(
    VictoryAnimation,
    {
      duration: 1000,
      data: "TODO"
    },
    function (tweenedProps, animationInfo) {
      console.log("TODO USE INTERPOLATION", { tweenedProps, animationInfo });
      return React.createElement("div", null, "hello");
    }
  );

  const markup = renderToString(Component);
  console.log(markup);
};

if (require.main === module) {
  main();
}
