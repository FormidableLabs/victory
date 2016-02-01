```playground
<VictoryChart>
  <VictoryLine
    y={(data) => Math.sin(1.5 * Math.PI * data.x)} />
  <VictoryLine
    style={{data: {stroke: "#c33b33"}}}
    y={(data) => Math.cos(2 * Math.PI * data.x)} />
</VictoryChart>
```
```playground
<VictoryPie
  startAngle={0}
  endAngle={180}
  padAngle={5}
  innerRadius={100}
  data={[
    {x: "<5", y: 6279},
    {x: "5-13", y: 9182},
    {x: "14-17", y: 5511},
    {x: "18-24", y: 7164},
    {x: "25-44", y: 6716},
    {x: "45-64", y: 4263},
    {x: "≥65", y: 7502}
  ]} />
```
