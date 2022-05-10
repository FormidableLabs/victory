/**
 * Test setup for client-side tests.
 *
 * Intended for:
 * - Karma tests: `yarn nps karma`
 * - Browser tests: `http://localhost:3000/test/client/test.html`
 */
/*globals window:false*/
const chai = require("chai");
const sinonChai = require("sinon-chai");
const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter: new Adapter() });
// --------------------------------------------------------------------------
// Chai / Sinon / Mocha configuration.
// --------------------------------------------------------------------------
// Exports
window.expect = chai.expect;

// Plugins
chai.use(sinonChai);

// Mocha (part of static include).
window.mocha.setup({
  ui: "bdd",
  bail: false
});

// --------------------------------------------------------------------------
// Bootstrap
// --------------------------------------------------------------------------
// Optional env var filter for module tests.
const TEST_MODULE = process.env.TEST_MODULE;

// Use webpack to infer and `require` tests automatically.
const testsReq = require.context(".", true, /\.spec.jsx?$/);
testsReq
  .keys()
  // TODO: Expand to WIN friendly with `normalize|relative` etc?
  .filter((m) => (TEST_MODULE ? m.startsWith(`./spec/${TEST_MODULE}/`) : true))
  .map(testsReq);

// Only start mocha in browser.
if (!window.__karma__) {
  window.mocha.run();
}
