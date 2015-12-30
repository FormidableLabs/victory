Contributing
============

Thanks for helping out!

## Issues

We love issues! If you find bugs, the absolutely best way you can help (short of creating a PR with a fix and a regression test) is to create an issue with a failing test case e.g. in a branch of your fork. As a lightweight option to that, you can clone http://jsbin.com/nifaci/edit or fork https://jsfiddle.net/9yb90dnL/ to create a reproduction, and add a link to your [issue](https://github.com/FormidableLabs/victory/issues/new).

## Development

Run `npm run dev` to run a webpack dev server with component examples. The dev server runs on `localhost:3000`.

## Checks, Tests

Run `npm run check` before committing.

## Dist

Please do not commit changes to files in `dist`.
These files are only committed when we tag releases.

## Code Style

The JavaScript code style is enforced with `eslint` following the [`defaults/configurations/walmart/es6-react`](https://github.com/walmartlabs/eslint-config-defaults#full-configurations) configuration from [`eslint-config-defaults`](https://github.com/walmartlabs/eslint-config-defaults).

## Component Style

Victory is an ecosystem of components with similar language and methodologies. It should only require one learning curve, and avoid as much component specific domain knowledge as possible. Victory should expose an intuitive api, with sensible defaults that allow a user to render simple visualizations with little start up cost. Though Victory currently relies on d3, Victory components should not be simply React wrappers around d3.

Victory components should:

- Be created from the [FormidableLabs component generator](https://github.com/FormidableLabs/generator-formidable-react-component)
- Be very well documented with [ecology](https://github.com/FormidableLabs/ecology)
- Be named consistently _i.e._ `victory-bar`
- Be React 0.14 compatible
- *NOT* let 3rd party libraries like d3 interact with the DOM
- Have sensible default props / fallback behaviors so that _something_ is rendered even when no props are provided
- Produce sensible results if _only_ data is provided _i.e_ set the domain based on whatever data was provided
- Have attractive default styling
- Take a `style` prop, and intelligently merge provided (and scoped) styles with default styles

```
// default styles
const styles = {
  parent: {
    width: 500,
    height: 300,
    margin: 50
  },
  data: {
    fill: "#756f6a",
    opacity: 1,
    stroke: "transparent",
    strokeWidth: 0
  },
  labels: {
    stroke: "none",
    fill: "black",
    fontFamily: "Helvetica",
    fontSize: 10,
    textAnchor: "middle"
  }
};

// merging styles:
getStyles(props) {
  if (!props.style) {
    return styles;
  }
  const {data, labels, parent} = props.style;
  return {
    parent: _.merge({}, styles.parent, parent),
    labels: _.merge({}, styles.labels, labels),
    data: _.merge({}, styles.data, data)
  };
}

// example style prop
style={{
  parent: {
    border: "1px solid #ccc",
    height: 500,
    margin: 50,
    width: 500
  },
  data: {
    fill: "red",
    opacity: 0.8
  },
  labels: {
    fontSize: 15,
    padding: 20,
    fill: "grey"
  }
}}
```

- Support animating and static visualizations
- Take an `animate` prop as an object that can be passed as props to [victory-animation](https://github.com/FormidableLabs/victory-animation)
- Support rendering svg and g tags via a `standalone` prop (renders svg when true, g when false).
- Not require users to write d3 or have d3 domain knowledge
- Be accessible and usable for junior developers
- Have an intuitive api
