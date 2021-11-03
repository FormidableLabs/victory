# Victory Native

[![Maintenance Status][maintenance-image]](#maintenance-status)

### Usage

Install victory-native:
```sh
$ npm install victory-native --save
```

Install react-native-svg:
```sh
$ npm install react-native-svg --save
```

Link react-native:
```sh
$ react-native link react-native-svg
```
**`victory-native@^33.0.0` requires `react-native-svg@^9.0.0` and `react-native@~0.60.0`**

**Please see [Peer Dependencies and Version Requirements](#peer-dependencies-and-version-requirements) for requirements for previous versions of `victory-native`**


Import charts from `victory-native`. For example,

```jsx
import React, { Component } from "react";

import { VictoryBar } from "victory-native";

class App extends Component {
  render() {
    return (
      <VictoryBar />
    );
  }
}

export default App;
```

### Peer Dependencies and Version Requirements

**Note:** `victory-native` requires the following peer dependencies:
- `react-native-svg`
- `react`
- `react-native`

**Note:** `react-native-svg` has strict version requirements for both `react` and `react-native`. Please match versions to those required by `react-native-svg`. See the up-to-date requirements on the [react-native-svg Readme][react-native-svg-readme].
We encourage you to use the latest version of `react-native-svg` possible for your project, as `victory-native` issues are frequently solved by `react-native-svg` bugfixes.

- `victory-native@^33.0.0` requires `react-native-svg@^9.0.0` and `react-native@~0.60.0`
* `victory-native@^30.0.0` requires `react-native-svg@6.1.x`  or `react-native-svg@^6.5.0`and above
* `victory-native@^0.16.2` requires `react-native-svg@6.1.x` or `react-native-svg@^6.5.0`
* ~~`victory-native@~0.16.0` requires `react-native-svg@6.0.0`~~ No longer supported
* ~~`victory-native@~0.15.0` requires `react-native-svg@^5.0.0`~~ No longer supported

### Local Development and Demo

If you'd like to contribute to `victory-native`, you can use the local demo app to test your changes on the iOS simulator. The demo app uses [Expo](https://expo.dev/) to streamline this dev experience.

To open the demo app, just fire up the expo app.

```sh
# Install victory and its dependencies
$ git clone https://github.com/FormidableLabs/victory
$ cd victory
$ yarn install
# Open up the React Native demo app
$ cd demo/rn
$ yarn install
$ yarn start
```

Once Expo has fired up, it should open a web browser window where you can find instructions to open the demo application (either on a simulator or a physical device using the Expo Go app).

Changes to the Victory and Victory Native source code will be reflected in the demo app.

### Documentation

See the docs and examples on [the Victory website](https://formidable.com/open-source/victory/docs/native).

## Contributor Covenant Code of Conduct

Please review our [Code of Conduct][code] before contributing.


### Maintenance Status

**Active:** Formidable is actively working on this project, and we expect to continue for work for the foreseeable future. Bug reports, feature requests and pull requests are welcome.


[code]: https://github.com/FormidableLabs/.github/blob/master/CODE_OF_CONDUCT.md
[victory-native-demo]:https://github.com/FormidableLabs/victory-native-demo
[react-native-svg-readme]: https://github.com/react-native-community/react-native-svg#notice
[maintenance-image]: https://img.shields.io/badge/maintenance-active-green.svg

