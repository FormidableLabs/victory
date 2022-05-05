/**
 * Wrap `react-static build` to fail on build error.
 */
const build = require("react-static/lib/commands/build").default;

const { log } = console; // eslint-disable-line no-undef

// Main.
const main = () => build({
  packageConfig: {}
});

if (require.main === module) {
  main()
    .then(() => {
      log("Build finished.");
    })
    .catch(() => {
      log("Build failed");
      process.exit(-1);
    });
}
