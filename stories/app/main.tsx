import React from "react";
import { createRoot } from "react-dom/client";

import { Gallery } from "./gallery";
import "./stories.css";
import "./gallery.css";

// No StrictMode: Storybook rendered without it, and some components are still
// classes with legacy lifecycles (#2778).
createRoot(document.getElementById("root")!).render(<Gallery />);
