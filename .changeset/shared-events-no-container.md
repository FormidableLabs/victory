---
"victory-shared-events": patch
---

Fix `VictorySharedEvents` crashing when rendered with neither `events` nor `container`: it now falls back to `groupComponent`, as it already did with events
