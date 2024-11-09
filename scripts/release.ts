/**
 * The following code is adapted from a fork of the `changesets/actions` repository
 * to allow us to generate aggregated changelogs for our monorepo.
 * This code can be removed when changesets supports monorepo aggregations.
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable no-console */

import fs from "fs-extra";
import path from "path";

import unified from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
// @ts-ignore
import mdastToString from "mdast-util-to-string";
import { Octokit } from "octokit";

export const BumpLevels = {
  dep: 0,
  patch: 1,
  minor: 2,
  major: 3,
} as const;

export function getChangelogEntry(changelog: string, version: string) {
  const ast = unified().use(remarkParse).parse(changelog) as any;

  let highestLevel: number = BumpLevels.dep;

  const nodes = ast.children as Array<any>;
  let headingStartInfo:
    | {
        index: number;
        depth: number;
      }
    | undefined;
  let endIndex: number | undefined;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type === "heading") {
      const stringified: string = mdastToString(node);
      const match = stringified.toLowerCase().match(/(major|minor|patch)/);
      if (match !== null) {
        const level = BumpLevels[match[0] as "major" | "minor" | "patch"];
        highestLevel = Math.max(level, highestLevel);
      }
      if (headingStartInfo === undefined && stringified === version) {
        headingStartInfo = {
          index: i,
          depth: node.depth,
        };
        continue;
      }
      if (
        endIndex === undefined &&
        headingStartInfo !== undefined &&
        headingStartInfo.depth === node.depth
      ) {
        endIndex = i;
        break;
      }
    }
  }
  if (headingStartInfo) {
    ast.children = ast.children.slice(headingStartInfo.index + 1, endIndex);
  }
  return {
    content: unified().use(remarkStringify).stringify(ast),
    highestLevel,
  };
}

const createAggregatedRelease = async () => {
  const octokit = new Octokit({ auth: process.env.CHANGESETS_GITHUB_TOKEN });
  const prevRelease = await octokit.rest.repos.getLatestRelease({
    owner: "FormidableLabs",
    repo: "victory",
  });

  const pkgFileName = path.join("packages", "victory", "package.json");
  const packageJson = JSON.parse(await fs.readFile(pkgFileName, "utf8"));

  const changelogFileName = path.join("packages", "victory", "CHANGELOG.md");
  const changelog = await fs.readFile(changelogFileName, "utf8");

  const changelogEntry = getChangelogEntry(changelog, packageJson.version);

  if (!changelogEntry) {
    // we can find a changelog but not the entry for this version
    // if this is true, something has probably gone wrong
    throw new Error(
      `Could not find changelog entry for ${packageJson.name}@${packageJson.version}`,
    );
  }

  const tag_name = `v${packageJson.version}`;
  const prevTag = prevRelease.data.tag_name;

  const link = `Full Changelog: [${prevTag}...${tag_name}](https://github.com/FormidableLabs/victory/compare/${prevTag}...${tag_name})`;
  const body = `## What's Changed\n\n${changelogEntry.content}\n\n${link}`;

  await octokit.rest.repos.createRelease({
    owner: "FormidableLabs",
    repo: "victory",
    tag_name,
    name: tag_name,
    body,
    prerelease: false,
  });
};

(async () => {
  await createAggregatedRelease();
})()
  .then(() => console.log("Release created!"))
  .catch(console.error);
