import ReactDOM from "react-dom";

const getElement = () => {
  const element = document.createElement("div");
  element.setAttribute("id", "react-app");
  document.body.appendChild(element);
  return element;
};

export const element = getElement();
export const suiteOpts = {
  onCycle() {
    ReactDOM.unmountComponentAtNode(element);
  }
};
