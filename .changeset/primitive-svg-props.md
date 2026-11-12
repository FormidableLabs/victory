---
"victory-core": minor
---

The primitives `Circle`, `Line`, `Path`, `Rect`, `Text` and `TSpan` accept their element's SVG attributes in TypeScript, such as `<Line x1={25} y1={270} />`, `<Path d="..." />` and `<Circle cx={1} cy={2} r={3} />` (#3122). These worked at runtime but failed to type-check. Where a Victory prop shares a name with an SVG attribute (`origin`, `role`, `style`, `id`, `tabIndex`, `rx`, ...), Victory's type is kept. New exported types: `TSpanProps` (the props of `TSpan`) and `VictoryPrimitiveSvgProps`.
