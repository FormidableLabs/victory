[![Travis Status][trav_img]][trav_site]

Victory Pie
=============

`victory-pie` draws an SVG pie or donut chart with [React](https://github.com/facebook/react) and [D3](https://github.com/mbostock/d3). Styles and data can be customized by passing in your own values as properties to the component. Data changes are animated with [victory-animation](https://github.com/FormidableLabs/victory-animation).

##Examples

The plain component has baked-in sample data, style, angle, and sort defaults, so rendering the pie with no custom properties, like so:

``` javascript
<VictoryPie/>
```

Will look like this:

![basic pie chart](victory-pie-sample.png)

Labels, by default, are placed at the centroid of each pie slice, which can look a little strange sometimes. Apply `padding` and `labelPadding` like so:

``` javascript
<VictoryPie
  labelPadding={180}
  padding={30}/>
```

To move your labels out from the centroid:

![pie chart with labels outside](victory-pie-labels.png)

But really, who wants a pie chart? Specify an `innerRadius` greater than 0 to turn the pie into a donut:

``` javascript
<VictoryPie innerRadius={140}/>
```

Yum:

![basic donut chart](victory-donut-sample.png)

All default styles (`borderColor`, `borderWidth`, `fontColor`, `fontFamily`, `fontSize`, `fontWeight`, `height`,  `innerRadius`, `labelPadding`, `padding`, `sliceColors`, `width`), angles (`startAngle`, `endAngle`, `padAngle`) and sorting (`sort`) can be overridden by specifying your own props:

``` javascript
<VictoryPie
  fontSize={16}
  fontWeight={200}
  innerRadius={80}/>
```

Makes this:

![donut with thicker slices](victory-donut-thick.png)

Similarly,

``` javascript
<VictoryPie
  borderWidth={2}
  fontColor="white"
  innerRadius={140}/>
```
Makes:

![donut with white text](victory-donut-white.png)

Want a half donut? Specify a `startAngle` and `endAngle`:

``` javascript
<VictoryPie
  borderWidth={2}
  endAngle={90}
  fontColor="white"
  innerRadius={140}
  startAngle={-90}/>
```
Voilà:
![half donut](victory-donut-half.png)

Specify a `padAngle` to add space between adjacent slices:

``` javascript
<VictoryPie
  borderWidth={2}
  endAngle={90}
  fontColor="white"
  innerRadius={140}
  padAngle={5}
  startAngle={-90}/>
```
![donut with padding](victory-donut-padding.png)

Custom data (age vs population) and colors:

``` javascript
<VictoryPie
  borderWidth={2}
  data={[
    {x: "<5", y: 6279},
    {x: "5-13", y: 9182},
    {x: "14-17", y: 5511},
    {x: "18-24", y: 7164},
    {x: "25-44", y: 6716},
    {x: "45-64", y: 4263},
    {x: "≥65", y: 7502}
  ]}
  fontColor="white"
  fontWeight={200}
  innerRadius={150}
  sliceColors={[
    "#D85F49",
    "#F66D3B",
    "#D92E1D",
    "#D73C4C",
    "#FFAF59",
    "#E28300",
    "#F6A57F"
  ]}/>
```

Snazzes things up a bit:

![donut with data and custom colors](victory-donut-data.png)

If the data changes, the donut updates seamlessly:

![donut data change animated](victory-donut-animation.gif)

Set the `sort` prop to `"ascending"`, `"descending"`, or your own comparator:

``` javascript
<VictoryPie
  borderWidth={2}
  data={[
    { x: "<5", y: 4577 },
    { x: "5-13", y: 5661 },
    { x: "14-17", y: 3038 },
    { x: "18-24", y: 8151 },
    { x: "25-44", y: 7785 },
    { x: "45-64", y: 1911 },
    { x: "≥65", y: 7665 }
  ]}
  fontColor="white"
  fontWeight={200}
  innerRadius={150}
  sliceColors={[
    "#D85F49",
    "#F66D3B",
    "#D92E1D",
    "#D73C4C",
    "#FFAF59",
    "#E28300",
    "#F6A57F"
  ]}
  sort="descending"/>
```

To organize by slice size:

![donut descending sort](victory-donut-sort.png)

## The API

### Props

All props are *optional*. They can be omitted and the component will
still render.

The following props are supported:

####**borderColor**

*A string.* All color formats, including HEX, RGB/RGBA, and HTML color names are accepted. Examples: `"#ff0000"`, `"rgba(255, 0, 0, 1)"`, `"red"`.

*Default value:* `"white"`

####**borderWidth**

*A number or string.* Numbers are assigned as pixels. Numbers with specified units can be passed in as a string, such as `"2em"`.

*Default value:* `1`

####**data**

*An array of objects.* If the `data` prop is omitted, the pie will render sample data. Objects in the `data` array must be of the form `{ x: <x-val>, y: <y-val> }`, where `<x-val>` is the slice label (string or number), and `<y-val>` is the corresponding number used to calculate arc length as a proportion of the pie's circumference.

*Default value:* `[{ x: "A", y: 1 }, { x: "B", y: 2 }, { x: "C", y: 3 }, { x: "D", y: 1 }, { x: "E", y: 2 }]`

####**endAngle**

*A number.* The overall end angle of the pie in degrees.

*Default value:* `360`

####**fontColor**

*A string.* All color formats, including HEX, RGB/RGBA, and HTML color names are accepted. Examples: `"#ff0000"`, `"rgba(255, 0, 0, 1)"`, `"red"`.

*Default value:* `"black"`

####**fontFamily**

*A string.* Single font names or font stacks are accepted.

*Default value:* `"'Helvetica Neue', Helvetica, Arial, sans-serif"`

####**fontSize**

*A number or string.* Numbers are assigned as pixels. Numbers with specified units can be passed in as a string, such as `"2em"`.

*Default value:* `10`

####**fontWeight**

*A number or string.* All CSS `font-weight` properties (`100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `"normal"`, `"bold"`, `"bolder"`, `"lighter"`, `"initial"`, `"inherit"`) are accepted.

*Default value:* `400`

####**height**

*A number.* A pixel amount used to calculate chart size. The smaller of the two dimension properties, `height` and `width`, will be used to set diameter. Note that any specified `padding` is included in overall chart dimensions, so the diameter of the pie will be smaller if `padding` is greater than 0.

*Default value:* `400`

####**innerRadius**

*A number.* A pixel amount used to calculate the distance between the center of the chart and the inner edge of a donut.

*Default value:*  `0`

####**labelPadding**

*A number.* A pixel amount used to position labels further out from the centroid of a pie slice.

*Default value:*  `0`

####**padAngle**

*A number.* The pad angle of the pie in degrees. Adjacent slices will be separated by the pad angle.

*Default value:* `0`

####**padding**

*A number.* A pixel amount used to add padding around the outer edge of the pie.

*Default value:* `0`

####**sliceColors**

*An array of strings.* If the `data` array is longer than its corresponding `sliceColors` array, slice color assignments will continue by looping through the array.

*Default value:* `["#75C776", "#39B6C5", "#78CCC4", "#62C3A4", "#64A8D1", "#8C95C8", "#3BAF74"]`

####**sort**

*A string or function.* Sort order strings `"ascending"` and `"descending"`are accepted, as are custom comparator functions.

*Default value:* `null`

####**startAngle**

*A number.* The overall start angle of the pie in degrees.

*Default value:* `0`

####**width**

*A number.* A pixel amount used to calculate chart size. The smaller of the two dimension properties, `height` and `width`, will be used to set diameter. Note that any specified `padding` is included in overall chart dimensions, so the diameter of the pie will be smaller if `padding` is greater than 0.

*Default value:* `400`


## Build

Build for production use (NPM, bower, etc).

```
$ npm run build
```

Which is composed of commands to create `dist` UMD bundles (min'ed, non-min'ed)

```
$ npm run build-dist
```

and the ES5 `lib`:

```
$ npm run build-lib
```

Note that `dist/` files are only updated and committed on **tagged releases**.


## Development

All development tasks consist of watching the demo bundle, the test bundle
and launching a browser pointed to the demo page.

Run the `demo` application in a browser window with hot reload:
(More CPU usage, but faster, more specific updates)

```
$ npm run hot       # hot test/app server (OR)
$ npm run open-hot  # hot servers _and a browser window opens!_
```

Run the `demo` application with watched rebuilds, but not hot reload:

```
$ npm run dev       # dev test/app server (OR)
$ npm run open-dev  # dev servers _and a browser window opens!_
```

From there you can see:

* Demo app: [127.0.0.1:3000](http://127.0.0.1:3000/)
* Client tests: [127.0.0.1:3001/test/client/test.html](http://127.0.0.1:3001/test/client/test.html)

## Quality

### In Development

During development, you are expected to be running either:

```
$ npm run dev
$ npm run hot
```

to build the src and test files. With these running, you can run the faster

```
$ npm run check-dev
```

Command. It is comprised of:

```
$ npm run lint
$ npm run test-dev
```

Note that the tests here are not instrumented for code coverage and are thus
more development / debugging friendly.

### Continuous Integration

CI doesn't have source / test file watchers, so has to _build_ the test files
via the commands:

```
$ npm run check     # PhantomJS only
$ npm run check-cov # (OR) PhantomJS w/ coverage
$ npm run check-ci  # (OR) PhantomJS,Firefox + coverage - available on Travis.
```

Which is currently comprised of:

```
$ npm run lint      # AND ...

$ npm run test      # PhantomJS only
$ npm run test-cov  # (OR) PhantomJS w/ coverage
$ npm run test-ci   # (OR) PhantomJS,Firefox + coverage
```

Note that `(test|check)-(cov|ci)` run code coverage and thus the
test code may be harder to debug because it is instrumented.

### Client Tests

The client tests rely on webpack dev server to create and serve the bundle
of the app/test code at: http://127.0.0.1:3001/assets/main.js which is done
with the task `npm run server-test` (part of `npm dev` and `npm hot`).

#### Code Coverage

Code coverage reports are outputted to:

```
coverage/
  client/
    BROWSER_STRING/
      lcov-report/index.html  # Viewable web report.
```

## Releases

Built files in `dist/` should **not** be committeed during development or PRs.
Instead we _only_ build and commit them for published, tagged releases. So
the basic workflow is:

```
# Update version
$ vim package.json # and bump version
$ git add package.json

# Create the `dist/*{.js,.map}` files and publish working project to NPM.
$ npm publish
# ... the project is now _published_ and available to `npm`.

# Commit, tag
$ git add dist/
$ git commit -m "Bump version to vVERS"
$ git tag -a "vVERS" -m "Version VERS"
$ git push
$ git push --tags
# ... the project is now pushed to GitHub and available to `bower`.
```

Side note: `npm publish` runs `npm prepublish` under the hood, which does the
build.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/formidable-react-component-boilerplate.svg
[trav_site]: https://travis-ci.org/FormidableLabs/formidable-react-component-boilerplate

