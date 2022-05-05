/**
 * Wrap `react-static build` to fail on build error.
 */
const build = require("react-static/lib/commands/build").default;

const { log, error } = console; // eslint-disable-line no-undef

// Main.
const main = () => build({
  packageConfig: {}
});

if (require.main === module) {
  main()
    .then(() => {
      log("Build finished.");
    })
    .catch((err) => {
      log("Build failed");
      error(err);
      process.exit(-1);
    });
}
