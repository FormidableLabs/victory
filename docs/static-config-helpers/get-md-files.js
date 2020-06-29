/* eslint-disable func-style */
const fs = require("fs");
const klaw = require("klaw");
const path = require("path");
const frontmatter = require("remark-frontmatter");
const matter = require("gray-matter");
const yaml = require("js-yaml");
const remark = require("remark");
const _ = require("lodash");
const select = require("unist-util-select");
const slug = require("remark-slug");

function defaultSort(items) {
  return items;
}

const subHeadingRangeDefaults = {
  start: 1,
  end: 3
};

function setYamlToFile(subHeadingRange = subHeadingRangeDefaults) {
  function transformer(ast, file) {
    const yamlObj = select(ast, "yaml");
    let obj;
    if (yamlObj.length > 0) {
      const { children } = ast;

      obj = yaml.safeLoad(yamlObj[0].value);

      file.data = obj;

      // set file content to be everything minus frontmatter
      Object.defineProperty(file, "content", {
        value: matter(file.contents).content,
        enumerable: true
      });

      // store subheading data for sidebar
      file.data.subHeadings = children
        .filter(
          c =>
            c.type === "heading" &&
            c.depth >= subHeadingRange.start &&
            c.depth <= subHeadingRange.end
        )
        .map(c => ({
          type: c.type,
          value: c.children[0].value,
          depth: c.depth,
          slug: _.kebabCase(c.children[0].value).toLowerCase()
        }));
    }
  }

  return transformer;
}

const renderer = remark()
  .use(frontmatter, ["yaml", "toml"])
  .use(setYamlToFile)
  .use(slug);

/* eslint-disable max-params */
const getMdFiles = async (mdPath, mutations = [], sort = defaultSort) => {
  const items = [];
  return new Promise(resolve => {
    if (fs.existsSync(mdPath)) {
      klaw(mdPath)
        .on("data", item => {
          if (path.extname(item.path) === ".md") {
            const data = fs.readFileSync(item.path, "utf8");
            renderer.process(data, (err, result) => {
              if (err) {
                throw err;
              }
              const mdData = result;
              mutations.forEach(m => {
                m(mdData, item.path);
              });
              items.push(mdData);
            });
          }
        })
        .on("error", e => {
          throw e;
        })
        .on("end", () => {
          resolve(sort(items));
        });
    } else {
      resolve(items);
    }
  });
};

/* eslint-enable max-params */

module.exports = getMdFiles;
