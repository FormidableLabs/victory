### Overview

The VictoryChart documentation site (currently `http://formidable.com/open-source/victory/docs/victory-pie`) source lives in `/docs`. The `docs/*/docs.js` components are imported into `victory-docs` and deployed from there.

### Development

Run `builder run docs-devs` to start `webpack-dev-server` at [port 3000](http://localhost:3000/). Run `npm test` for the usual linting, which covers the `docs` source.

### Deployment

Submit a pull request to `master`, and once it’s merged, `victory-docs` will need to run `update-project` script and merge into `master`. A new push to `master` in `victory-docs` will trigger a deployemnt.

#### Happy, victorious developing! :trophy:
