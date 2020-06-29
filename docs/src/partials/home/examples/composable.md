```playground
<VictoryChart
  domain={{x: [0.5, 3.5]}}
  // Uncomment the theme!
  // theme={VictoryTheme.material}
>
  <VictoryAxis
    tickValues={[1, 2, 3]}
    tickFormat={["first", "second", "third"]}
  />
  <VictoryStack>
    <VictoryBar
      data={[
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3}
      ]}
    />
    <VictoryBar
      data={[
        {x: 1, y: 2},
        {x: 2, y: 1},
        {x: 3, y: 1}
      ]}
    />
    <VictoryBar
      data={[
        {x: 1, y: 3},
        {x: 2, y: 4},
        {x: 3, y: 2}
      ]}
    />
  </VictoryStack>
</VictoryChart>
```
