import yaml from "js-yaml";
import { visit } from "unist-util-visit";
import fs from "fs";

import {
  extractExamples,
  buildComponentAst,
  buildEsmImportAst,
  buildPropertyAst,
} from "./mdast";
import { getTypeInfo } from "./typedoc";

export function autoGenerateApiDocs() {
  async function transform(root) {
    const typeInfo = await getTypeInfo();

    visit(root, "yaml", (yamlNode) => {
      const frontmatter = yaml.load(yamlNode.value);
      if (frontmatter?.auto_generated) {
        // debug
        // fs.writeFileSync("./merp_start.json", JSON.stringify(root, null, 2));

        // collect all code examples and remove them from the root
        const examples = extractExamples(root);

        // generate api documentation
        const { component, props } = frontmatter.auto_generated;
        const mdast: any = [];

        // inject esm import for components
        mdast.push(buildEsmImportAst());

        // get the component type info
        const componentType = typeInfo[component];
        if (componentType) {
          mdast.push(...buildComponentAst(componentType));
          mdast.push(...buildPropertyAst(componentType));
        }

        // get the props type info
        const propType = typeInfo[props];
        if (propType?.children) {
          for (const child of propType.children) {
            mdast.push(...buildPropertyAst(child));

            // reinject the code examples
            if (examples[child.name]) {
              mdast.push(examples[child.name]);
            }
          }
        }

        // inject the mdast into the root
        root.children.push(...mdast);

        // debug
        // fs.writeFileSync("./merp-end.json", JSON.stringify(root, null, 2));
      }
    });
  }

  return transform;
}
