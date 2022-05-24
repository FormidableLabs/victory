import { render } from "@testing-library/react";

export const renderInSvg = (component) => {
  return render(component, { wrapper: "svg" });
};
