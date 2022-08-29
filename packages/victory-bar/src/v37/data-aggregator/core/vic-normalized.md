# Victory Turbo API

This is a design doc, for formulating + illustrating a working approach for "Victory Turbo" components.
This is a WIP.

# `createVictoryComponent`

Here's how we'd define a component:

```tsx
import { createVictoryComponent } from "./vic-normalized";

export const VictoryLine = createVictoryComponent(
  {
    // Standard React types:
    displayName: "VictoryLine",
    defaultProps: {
      curve: "linear",
      data: [1, 2, 3, 4],
    },
    propTypes: {
      curve: PropTypes.oneOfType([PropTypes.oneOf("linear", "smooth")]),
    },

    // Map and normalize prop names:
    normalizeProps: {
      data: NormalizeProps.data,
      curve: (curve: "linear" | "smooth" | CurveFn) => {
        return typeof curve === "function"
          ? curve
          : curveMethods[curve] || curveMethods.linear;
      },
    },

    // Aggregate props, derived from all nested components:
    aggregateProps: {
      domain: AggregateProps.domain,
      scale: AggregateProps.scale,
      range: AggregateProps.range,
      polar: (allComponents, props, memo) =>
        props.polar || allComponents.some((c) => c.props.polar),
    },
  },
  (props) => {
    // This is where we put the actual component rendering
    
    // All these props are now normalized:
    const { curve, data, domain, scale, range, polar } = props;
    // Implementation details here...
    return <line {...props} />;
  },
);
```

- The standard React config gets copied to the component (eg. `displayName`, `defaultProps`, and `propTypes`)
- The `normalizeProps` will all get computed BEFORE rendering the component, and passed into the component
- The `aggregateProps` will be computed as follows:
  - During render, all children will traversed, and their props will be normalized and "collected"
  - All collected + normalized props will be used to calculate the `aggregateProps`
  - The `aggregateProps` will be passed into the component
  - A caching/memoizing mechanism will be used to ensure multiple components can "share" aggregated results.  Eg. we only calculate `domain` once for all components.
- The component's implementation will receive all props from the raw props, normalized props, and aggregate props, combined. 


Example use-cases (stays the same as current API):
```tsx
<>
  <VictoryLine />
  <VictoryLine curve="smooth" />
  <VictoryLine polar />
  <Victorychart>
    <VictoryLine />
    <VictoryLine />
  </Victorychart>
</>
```
