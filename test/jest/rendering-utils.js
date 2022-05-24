import { render } from "@testing-library/react";
import * as React from "react";

export const renderInSvg = (component) => {
  return render(<svg>{component}</svg>);
};
