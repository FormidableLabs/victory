import clsx from "clsx";
import { Highlight } from "prism-react-renderer";
import React from "react";

type CodeBlockProps = {
  code: string;
  language: string;
  className?: string;
};

const CodeBlock = ({ code, language, className: classes }: CodeBlockProps) => {
  return (
    <Highlight code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={clsx(classes, className)} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })} key={i}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} key={key} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
export default CodeBlock;
