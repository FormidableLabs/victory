---
"victory-create-container": patch
"victory-errorbar": patch
---

Fix type errors in published declarations under `skipLibCheck: false`. `createContainer` and `makeCreateContainerFunction` now have explicit return types (TS2344 before), with the same props as before. `ErrorBar`'s props are `ErrorBarProps` instead of `any` (`typeof ErrorBar.default`, TS2339 before). Code that passed `ErrorBar` undeclared props, or wrongly typed ones, compiled only because of this and now fails to type-check.
