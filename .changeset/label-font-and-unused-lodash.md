---
"victory-core": patch
"victory-canvas": patch
"victory-histogram": patch
"victory-scatter": patch
---

Fix `VictoryLabel`'s default `fontFamily`: an invisible soft hyphen inside `'Seravek'` meant that font never matched. Remove the unused `lodash` dependency from `victory-canvas`, `victory-histogram` and `victory-scatter`.
