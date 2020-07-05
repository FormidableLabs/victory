---
id: 0
title: Getting Started
category: introduction
type: docs
scope: null
---
# Getting Started with Victory

Victory is an opinionated, but fully overridable, ecosystem of composable React components for building interactive data visualizations. The following tutorial explains how to set up a basic chart. For next steps, please see our [FAQs][] and [Gallery][] sections. For more advanced examples, check out [our guides][].

#### Getting Started with Victory Native?

[Check out the native version of this getting started tutorial][]

## Tutorial

In this guide, we’ll show you how to get started with Victory and walk you through the creation and customization of a composed chart. We’ve created a GitHub repository with the completed project, and will link to the corresponding commit where appropriate to help you follow along. If you want, you can [view the completed tutorial here](https://github.com/FormidableLabs/victory-tutorial/blob/master/src/js/client.js).

#### 1. Set up a basic React project

You can do this on your own if you'd like, or you can...

* Clone down [this project we've started for you](https://github.com/FormidableLabs/victory-tutorial) using ```git clone git@github.com:FormidableLabs/victory-tutorial.git```
* `cd victory-tutorial`
* Replace the existing code in the `client.js` file with:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Victory Tutorial</h1>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);
```

* Run `npm install` to install all necessary dependencies.

Once you've completed these steps, you can run the webpack server with the command `npm start`, and the project will render at `localhost:8080`. All modifications will take place in your client.js file.

#### 2. Add Victory

Add Victory to your project with the command `npm install victory`, then import it into your React project. For now, let's import the whole library until we know what chart type we'll be using. The imports at the top of your main Javascript file should now look like this:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';
```

#### 3. Add your data

You can import your data from an external file or API, or create an array of data points as a variable. Here is the data that we'll be using for our chart, which is tracking earnings per fiscal quarter:

```jsx
const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];
```

#### 4. Add your first Victory component

Since we're doing a simple comparison of earnings between quarters, let's use a bar chart to visualize the data. We aren't going to need the whole Victory library, so let's change our import statement to reflect only the components that we need.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar } from 'victory';
```

Components include sensible defaults, so even without data `VictoryBar` will render a series of bars with default data.

```playground
// renders the default component with fallback data
<VictoryBar/>
```

Let's add some data. VictoryBar looks for `x` and `y` values in data points, which our data doesn't have. We can work around this by adding accessor props to our `VictoryBar` component. ([See the commit here](https://github.com/FormidableLabs/victory-tutorial/blob/3a0951d78202e4333fc8ae07a673173732209ee5/src/js/client.js).)

```playground_norender
const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

class App extends React.Component {
  render() {
    return (
      <VictoryBar
        data={data}
        // data accessor for x values
        x="quarter"
        // data accessor for y values
        y="earnings"
      />
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```

#### 5. Add a Chart wrapper

`VictoryChart` is a wrapper component that plots all of its children on the same scale. `VictoryChart` also provides default axes. Import `VictoryChart` like so:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart } from 'victory';
```

Next wrap the `VictoryBar` component in `VictoryChart`. Default axes are automatically configured to match data provided by `VictoryBar`. ([See the commit here](https://github.com/FormidableLabs/victory-tutorial/blob/15063b2f79cff843f668f43ddd46d4bcd7f96acd/src/js/client.js).)

```playground_norender
const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

class App extends React.Component {
  render() {
    return (
      <VictoryChart>
        <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```

#### 6. Customize the axes

Next, let's modify the tick labels on the axes to be a little more descriptive. We can do this by adding and configuring `VictoryAxis` components to our chart, so let's import `VictoryAxis`. Import statements should now look like this:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
```

In the chart below, we've modified the axes to better fit our needs. If you want to retain a vertical axis, remember to add a second axis component with the `dependentAxis` prop set to `true`. We've modified the format of the tick labels on our vertical axis with the `tickFormat` prop, and have included only the tick values that we need on the horizontal axis by passing an array to the `tickValues` prop. We've also added the `domainPadding` prop to our `VictoryChart` component for good measure, to space the bars further from the y-axis ([See the commit here](https://github.com/FormidableLabs/victory-tutorial/blob/c5be2277266d6e78f9402a610decb08e07642de2/src/js/client.js).)

```playground_norender
const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

class App extends React.Component {
  render() {
    return (
      <VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={20}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```

#### 7. Add a theme

Victory charts come with a default grayscale theme so that all components look clean and consistent. But let’s switch it up with the Victory-provided Material theme. We can do that by importing VictoryTheme and adding a theme prop to `VictoryChart`. Themes should always be applied to the outermost wrapper component in a chart.

Import statements should look like this:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis,
        VictoryTheme } from 'victory';
```

And here's the code and rendered component with the new theme ([See the commit here](https://github.com/FormidableLabs/victory-tutorial/tree/fb904143eea6046e6841b4284e044360d4af5cf1/src/js/client.js)):

```playground_norender
const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

class App extends React.Component {
  render() {
    return (
      <VictoryChart
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
        domainPadding={20}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```

#### 8. Stack multiple bar charts

Next, let's add more data. In this example we'll compare three years' worth of quarterly earnings in a stacked bar chart. `VictoryStack` will handle the layout.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis,
        VictoryTheme, VictoryStack } from 'victory';
```

Wrap all four `VictoryBar` components with `VictoryStack`. ([See the commit here](https://github.com/FormidableLabs/victory-tutorial/tree/9bf170061599027e4bd5fcf8128e47adb83c0e98/src/js/client.js).)

```playground_norender
const data2012 = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const data2013 = [
  {quarter: 1, earnings: 15000},
  {quarter: 2, earnings: 12500},
  {quarter: 3, earnings: 19500},
  {quarter: 4, earnings: 13000}
];

const data2014 = [
  {quarter: 1, earnings: 11500},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 20000},
  {quarter: 4, earnings: 15500}
];

const data2015 = [
  {quarter: 1, earnings: 18000},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 15000},
  {quarter: 4, earnings: 12000}
];

class App extends React.Component {
  render() {
    return (
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryStack>
          <VictoryBar
            data={data2012}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2013}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2014}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2015}
            x="quarter"
            y="earnings"
          />
        </VictoryStack>
      </VictoryChart>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```

#### 9. Override theme's color scale

`VictoryStack` can also be used to provide shared styles and props to its children. Let's add a `colorScale` prop to `VictoryStack` to override the default `colorScale` defined in `VictoryTheme.material`. ([See the commit here](https://github.com/FormidableLabs/victory-tutorial/tree/9c77240e45db4e9fde4123ae29304461739a7035/src/js/client.js).)

```playground_norender
const data2012 = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const data2013 = [
  {quarter: 1, earnings: 15000},
  {quarter: 2, earnings: 12500},
  {quarter: 3, earnings: 19500},
  {quarter: 4, earnings: 13000}
];

const data2014 = [
  {quarter: 1, earnings: 11500},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 20000},
  {quarter: 4, earnings: 15500}
];

const data2015 = [
  {quarter: 1, earnings: 18000},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 15000},
  {quarter: 4, earnings: 12000}
];

class App extends React.Component {
  render() {
    return (
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryStack
          colorScale={"warm"}
        >
          <VictoryBar
            data={data2012}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2013}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2014}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2015}
            x="quarter"
            y="earnings"
          />
        </VictoryStack>
      </VictoryChart>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```

## Next Steps

Congratulations! You’ve created your first chart with Victory. Next, check out our [FAQs][] and [Gallery][] for more examples and information. Happy charting.

## Documentation, Contributing, and Source

For more information about Victory and its components, check out the docs - see [VictoryChart](/docs/victory-chart) to get started. Interested in helping out or seeing what's happening under the hood? Victory is maintained at [github.com/FormidableLabs/victory](https://github.com/FormidableLabs/victory), and you can [start contributing here](https://github.com/FormidableLabs/victory/#contributing).

[our guides]: /guides
[Gallery]: /gallery
[FAQs]: /docs/faq
[Check out the native version of this getting started tutorial]: /docs/native
