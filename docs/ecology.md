## Modular

Victory is a small and growing ecosystem of data visualization components written for React.

## Powerful

The modular, componentized nature of React has allowed us to write fully-contained, reusable data visualization elements that are responsible for their own styles and behaviors.

## Effortless

The use of sensible default props makes getting started very easy, without sacrificing flexibility. Victory also leverages React lifecycle methods and DOM diffing to create a lightweight animation wrapper.

## Victorious

When combined, these features result in a set of components that are easy to use, and compose into more complicated visualizations.

```playground
  <VictoryChart>
    <VictoryLine
      y={(x) => Math.sin(1.5 * Math.PI * x)}
    />
    <VictoryLine
      style={{data: {stroke: "#c33b33"}}}
      y={(x) => Math.cos(2 * Math.PI * x)}
    />
  </VictoryChart>
```
