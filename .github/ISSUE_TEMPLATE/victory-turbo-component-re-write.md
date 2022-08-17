---
name: Victory Turbo component re-write
about: This is a template for all victory turbo components
title: Victory [component] v37
labels: turbo
assignees: ''

---

## Implementation Notes
- New components should live inside a nested directory (currently v37). These components should not make changes to existing functionality.
- The victory event system will be excluded for now until we have more clarity on how Victory wants to handle events.
- [Add other notes here]

## Checklist
- [ ] Basic data rendering as a standalone component
- [ ] Basic data rendering inside a `VictoryChart`
- [ ] Basic data rendering inside a `VictoryGroup` (if applicable)
- [ ] Basic data rendering inside a `VictoryStack` (if applicable)
- [ ] Styling with existing victory theme and inline styles
- [ ] Transitions
- [ ] Basic events like zoom and tooltips
- [ ] Copy existing tests, excluding events and helper methods
- [ ] Add documentation and tests for any API changes
