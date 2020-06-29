import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { render } from "react-dom";
import ReactDOMServer from "react-dom/server";
import { transform } from "babel-standalone";

const PreviewWrapper = styled.div``;

// <Preview> component from component-playground without updating
const Preview = props => {
  let ref = useRef();

  const compileCode = () => {
    const { codeText, context, noRender, scope } = props;
    const generateContextTypes = c =>
      `{ ${Object.keys(c)
        .map(val => `${val}: PropTypes.any.isRequired`)
        .join(", ")} }`;

    if (noRender) {
      return transform(
        `
        ((${Object.keys(scope).join(", ")}, mountNode) => {
          class Comp extends React.Component {
            getChildContext() {
              return ${JSON.stringify(context)};
            }
            render() {
              return (
                ${codeText}
              );
            }
          }
          Comp.childContextTypes = ${generateContextTypes(context)};
          return Comp;
        });
      `,
        { presets: ["es2015", "react", "stage-1"] }
      ).code;
    }
    return transform(
      `
        ((${Object.keys(scope).join(",")}, mountNode) => {
          ${codeText}
        });
      `,
      { presets: ["es2015", "react", "stage-1"] }
    ).code;
  };

  const executeCode = () => {
    const mountNode = ref;
    const { scope, noRender, previewComponent } = props;
    const tempScope = [];

    Object.keys(scope).forEach(s => tempScope.push(scope[s]));
    tempScope.push(mountNode);
    const compiledCode = compileCode();
    if (noRender) {
      /* eslint-disable no-eval, prefer-spread */
      const Comp = React.createElement(
        eval(compiledCode).apply(null, tempScope)
      );
      ReactDOMServer.renderToString(
        React.createElement(previewComponent, {}, Comp)
      );
      render(React.createElement(previewComponent, {}, Comp), mountNode);
    } else {
      eval(compiledCode).apply(null, tempScope);
    }
  };

  useEffect(() => {
    executeCode();
  }, []);

  return (
    <PreviewWrapper
      ref={div => {
        ref = div;
      }}
    />
  );
};

Preview.defaultProps = {
  previewComponent: "div"
};

Preview.propTypes = {
  codeText: PropTypes.string.isRequired,
  context: PropTypes.object,
  noRender: PropTypes.bool,
  previewComponent: PropTypes.node,
  scope: PropTypes.object.isRequired,
  theme: PropTypes.string
};

export default Preview;
