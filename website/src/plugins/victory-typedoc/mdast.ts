import { fromMarkdown } from "mdast-util-from-markdown";
import { visit } from "unist-util-visit";
import { TypeInfo } from "./typedoc";

const importPath = "@site/src/plugins/victory-typedoc/components/api-property";

/**
 * Extracts the examples from the markdown AST and removes them from the tree
 */
export function extractExamples(root: any): Record<string, any> {
  const examples: Record<string, any> = {};
  visit(root, "code", (node, index, parent) => {
    const match = node.meta?.match(/@example\((.*)\)/);
    if (match) {
      examples[match[1]] = node;
      parent.children.splice(index, 1);
    }
  });
  return examples;
}

export function getMarkdown(value: string): any[] {
  return fromMarkdown(value).children;
}

export function buildComponentAst(typeInfo: TypeInfo) {
  const mdast: any[] = [];

  mdast.push({
    type: "heading",
    children: [{ type: "text", value: typeInfo.name }],
    depth: 1,
    data: {
      hProperties: { id: typeInfo.name },
      id: typeInfo.name,
    },
  });

  if (typeInfo.description) {
    mdast.push(...getMarkdown(typeInfo.description));
  }

  return mdast;
}

export function buildEsmImportAst() {
  return {
    type: "mdxjsEsm",
    value: `import { ApiProperty } from "${importPath}";`,
    data: {
      estree: {
        type: "Program",
        body: [
          {
            type: "ImportDeclaration",
            specifiers: [
              {
                type: "ImportSpecifier",
                imported: {
                  type: "Identifier",
                  name: "ApiProperty",
                },
                local: { type: "Identifier", name: "ApiProperty" },
              },
            ],
            source: {
              type: "Literal",
              value: importPath,
              raw: `"${importPath}"`,
            },
          },
        ],
        sourceType: "module",
      },
    },
  };
}

export function buildPropertyAst(child: TypeInfo) {
  const mdast: any[] = [];

  mdast.push({
    type: "heading",
    children: [{ type: "text", value: child.name }],
    depth: 2,
    data: {
      hProperties: { id: child.name },
      id: child.name,
    },
  });

  // TODO: we can do an esm import here with embedded components
  const jsxElement = {
    type: "mdxJsxFlowElement",
    name: "ApiProperty",
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "tsType",
        value: child.type,
      },
    ],
    children: [],
  };

  if (child.required) {
    jsxElement.attributes.push({
      type: "mdxJsxAttribute",
      name: "required",
      value: "true",
    });
  }

  if (child.defaultValue) {
    jsxElement.attributes.push({
      type: "mdxJsxAttribute",
      name: "defaultValue",
      value: child.defaultValue,
    });
  }

  mdast.push(jsxElement);

  if (child.description) {
    mdast.push(...getMarkdown(child.description));
  }

  mdast.push({
    type: "thematicBreak",
  });

  return mdast;
}
