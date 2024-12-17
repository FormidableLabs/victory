import clsx from "clsx";
import { Highlight } from "prism-react-renderer";
import React from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

type CodeBlock = {
  title?: string;
  code: string;
  language: string;
};

type CodeBlockProps = {
  className?: string;
} & (CodeBlock | { blocks: CodeBlock[] });

const CodeBlock = (props: CodeBlockProps) => {
  const { className: classes } = props;
  const [copyStatus, setCopyStatus] = React.useState<string | null>(null);
  const [activeBlockIndex, setActiveBlockIndex] = React.useState(0);

  const code =
    "blocks" in props ? props.blocks[activeBlockIndex].code : props.code;
  const language =
    "blocks" in props
      ? props.blocks[activeBlockIndex].language
      : props.language;

  const handleCopyThemeConfig = () => {
    navigator.clipboard
      .writeText(code)
      // eslint-disable-next-line promise/always-return
      .then(() => {
        setCopyStatus("Copied successfully.");
      })
      .catch(() => {
        setCopyStatus("Failed to copy.");
      });
  };

  const handleBlockChange = (index: number) => {
    setActiveBlockIndex(index);
    setCopyStatus(null);
  };

  return (
    <div className="bg-code-bg rounded-xl">
      {"blocks" in props && (
        <div className="flex pt-2">
          {props.blocks.map(({ title }, index) => (
            <button
              key={index}
              className={clsx(
                "py-1.5 px-5 text-sm font-medium text-grayscale-600",
                activeBlockIndex === index
                  ? "bg-code-bg text-theme-1 border-b border-theme-1"
                  : "bg-grayscale-400 text-grayscale-800 border-grayscale-800 border-y border-l cursor-pointer hover:text-white",
                index === activeBlockIndex - 1 && "rounded-tr-lg border-r",
                index === activeBlockIndex + 1 && "rounded-tl-lg",
              )}
              onClick={() => handleBlockChange(index)}
            >
              {title || "Terminal"}
            </button>
          ))}
          <div
            className={clsx(
              "flex-auto px-5 bg-grayscale-400 border-grayscale-800 border-y border-l flex justify-end items-center",
              "blocks" in props &&
                activeBlockIndex === props.blocks.length - 1 &&
                "rounded-tl",
            )}
          >
            <div className="flex items-center justify-end gap-2">
              {copyStatus && (
                <span className="text-grayscale-200 text-xs italic">
                  {copyStatus}
                </span>
              )}
              <button
                onClick={handleCopyThemeConfig}
                className="bg-transparent text-lg text-grayscale-800 cursor-pointer hover:text-grayscale-200 flex items-center justify-center p-1 rounded-md"
              >
                {copyStatus ? <FiCheck className="text-theme-1" /> : <FiCopy />}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="text-sm">
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
      </div>
    </div>
  );
};

export default CodeBlock;
