---
"victory-core": patch
---

Export the `ComponentEvent` type. Component declarations that use it (such as `componentEvents` on `VictoryArea`) now reference `victory-core` instead of an internal path.
