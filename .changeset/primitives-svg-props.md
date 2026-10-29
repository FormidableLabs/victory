---
"victory-core": patch
---

Stop the primitives (`Circle`, `Line`, `Path`, `Rect`, `Text`, `TSpan`) from writing Victory props such as `standalone`, `polar`, `theme` and `stringMap` to the DOM. `VictoryChart`, `VictoryGroup` and `VictoryStack` inject these into every child, so a primitive placed directly in a chart triggered React warnings like "Received `false` for a non-boolean attribute `standalone`" (#3118).
