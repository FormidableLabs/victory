---
id: 3
title: Server Side Rendering
category: introduction
type: docs
scope: null
---
# Using Victory in Server Side Rendering Applications

In frameworks such as Next.js 13+, context is fully supported within Client Components, but it cannot be created or consumed directly within Server Components. This is because Server Components have no React state (since they're not interactive), and context is primarily used for rerendering interactive components deep in the tree after some React state has been updated.
Victory uses `createContext` to perform

```use client```;