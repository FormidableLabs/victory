---
"victory-core": patch
---

Fix `TS1540` errors when type-checking the published declarations with TypeScript 7 and `skipLibCheck: false` by using `namespace` instead of the deprecated `module` keyword in the Immutable.js type declarations. Thanks @vinassefranche (#3077).
