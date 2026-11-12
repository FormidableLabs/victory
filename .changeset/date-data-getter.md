---
"victory-core": patch
---

`DataGetterPropType` (the type of `x`, `y`, `y0` and `sortKey`) accepts accessors that return a `Date`, such as `x={(d) => new Date(d.date)}`. These worked at runtime but failed to type-check (TS2769).
