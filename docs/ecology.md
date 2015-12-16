```playground
<VictoryChart>
  <VictoryLine
    y={(x) => Math.sin(1.5 * Math.PI * x)} />
  <VictoryLine
    style={{data: {stroke: "#c33b33"}}}
    y={(x) => Math.cos(2 * Math.PI * x)} />
</VictoryChart>
```
