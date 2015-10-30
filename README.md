[![Travis Status][trav_img]][trav_site]

Victory Helpers & Utilities
===========================

```shell
npm install victory-util
```

Usage:

Access all utils at once:

```javascript
import VictoryUtil from "victory-util";

VictoryUtil.log.warn("Uh oh!");
VictoryUtil.style.toTransformString({ rotate: 90 });
```

Or be more selective:

```javascript
import { warn } from "victory-util/log";
import { containsStrings, containsOnlyStrings } from "victory-util/collection";
```

## Development

Please see [DEVELOPMENT](DEVELOPMENT.md)

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/victory-util.svg
[trav_site]: https://travis-ci.org/FormidableLabs/victory-util
