import fs from "fs";
import path from "path";

import findCacheDirectory from "find-cache-dir";
import { Application, JSONOutput } from "typedoc";

export type TypeInfo = {
  name: string;

  defaultValue?: string;
  description?: string;
  children?: TypeInfo[];
  required?: boolean;
  type?: string;
};

type TypeDocType =
  | JSONOutput.ReferenceReflection
  | JSONOutput.DeclarationReflection;

const cacheDirectoryName = "victory";
const cacheFileName = "typeInfo.json";
const entryPoints = ["../packages/victory/src/index.ts"];
const tsconfig = "../packages/victory/tsconfig.json";

const SYNTAX = {
  OR: " | ",
};

function getBlockTag(comment: JSONOutput.Comment | undefined, tagName: string) {
  if (comment?.blockTags) {
    return comment.blockTags.find((x) => x.tag === tagName);
  }
}

function getCommentSummary(
  typeInfo: JSONOutput.ReferenceReflection | JSONOutput.DeclarationReflection,
): string {
  return typeInfo?.comment?.summary.map((x) => x.text).join("") || "";
}

function getDefaultValue(typeInfo: TypeDocType) {
  const tag = getBlockTag(typeInfo.comment, "@defaultValue");
  if (tag) {
    return tag.content
      .map((x) => x.text.replace("```ts\n", "").replace("\n```", ""))
      .join("");
  }
}

function getSignature(signature) {
  const fields = (signature.parameters || []).map((x) => {
    return `${x.name}: ${getType(x.type)}`;
  });
  return `(${fields.join(", ")}) => ${getType(signature.type)}`;
}

function getReflectionType(type): string {
  if (type.declaration?.children) {
    const fields = type.declaration.children.map((x) => {
      return `${x.name}: ${getType(x.type)}`;
    });
    return `{ ${fields.join(", ")} }`;
  }

  if (type.declaration?.signatures) {
    return type.declaration.signatures.map(getSignature).join(SYNTAX.OR);
  }

  return "unknown";
}

function getLiteralType(type): string {
  if (type.value === null) {
    return "null";
  }
  if (type.value === undefined) {
    return "undefined";
  }
  return type.value;
}

function getType(type): string {
  switch (type?.type) {
    case "reflection":
      return getReflectionType(type);
    case "array":
      return `${getType(type.elementType)}[]`;
    case "union":
      return type.types.map(getType).join(SYNTAX.OR);
    case "literal":
      return getLiteralType(type);
    case "typeOperator":
      return `${type.operator} ${getType(type.target)}`;
    case "reference":
    case "intrinsic":
      return type.name;
    default:
      return "unknown";
  }
}

function mapTypeInfo(
  typeInfo: JSONOutput.ReferenceReflection | JSONOutput.DeclarationReflection,
) {
  const map: TypeInfo = {
    name: typeInfo.name,
    required: !typeInfo.flags?.isOptional === true,
    description: getCommentSummary(typeInfo),
    defaultValue: getDefaultValue(typeInfo),
    type: getType(typeInfo.type),
  };

  if (typeInfo.children) {
    map.children = typeInfo.children.map(mapTypeInfo);
  }

  return map;
}

async function loadTypeInfo(): Promise<JSONOutput.ProjectReflection> {
  // Load the type info from a file if it exists
  const dir = findCacheDirectory({ name: cacheDirectoryName, create: true });
  const typeInfoPath = path.join(dir!, cacheFileName);

  let typeInfo;

  if (fs.existsSync(typeInfoPath)) {
    typeInfo = JSON.parse(fs.readFileSync(typeInfoPath, "utf8"));
  }

  if (!typeInfo) {
    // Load the types from Victory
    const typedocApp = await Application.bootstrapWithPlugins({
      entryPoints,
      tsconfig,
      logLevel: "Error",
      disableSources: true,
      excludeExternals: true,
      excludeInternal: true,
      excludeReferences: true,
      // excludeNotDocumented: true,
      readme: "none",
    });

    const project = await typedocApp.convert();
    if (!project) {
      throw new Error("Failed to load type information from Victory");
    }

    typeInfo = typedocApp.serializer.projectToObject(project, process.cwd());

    // save typeInfo to a file
    // TODO: we can strip this file down to only what we need
    fs.writeFileSync(typeInfoPath, JSON.stringify(typeInfo, null, 2));
  }

  return typeInfo as JSONOutput.ProjectReflection;
}

export async function getTypeInfo(): Promise<Record<string, TypeInfo>> {
  const typeInfo = await loadTypeInfo();
  if (!typeInfo) {
    return {};
  }

  // apply transformations to the type info
  const map: Record<string, TypeInfo> = {};
  typeInfo.children?.forEach((child) => {
    map[child.name] = mapTypeInfo(child);
  });
  return map;
}
