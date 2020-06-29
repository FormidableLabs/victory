/* eslint-disable func-style */
const _ = require("lodash");
const getMdFiles = require("./get-md-files");

// this function takes care of sorting!! :code:
// The only difference between this and allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC })
// is how numbers are handled orderBy places number before letter, prior ordering disregarded numbers and used
// first alphabetical character.
const orderByTitle = items => _.orderBy(items, ["data.title"], ["asc"]);

const orderByIdAndAddThemesEntry = items => {
  // Themes is a one-off guide that is a react component with no associated markdown.
  // This is sort of a hacky way to add it, but lets us simplify the logic we use to create sidebar content
  const themes = {
    data: {
      slug: "themes",
      id: "9",
      title: "Themes",
      category: "guides",
      type: "guides",
      subHeadings: []
    },
    component: "src/pages/themes-template",
    name: "Themes"
  };
  return _.orderBy(items.concat(themes), ["data.id"], ["asc"]);
};

const slugMutation = mdData => {
  const base = mdData.data.slug || mdData.data.title;
  return (mdData.data.slug = _.kebabCase(base)
    .toLowerCase()
    .trim());
};

// for sidebar purposes, guide type and guide category are the same, but we'd rather have
// a consistent shape at the component layer than need an additional check there
const sidebarTypeMutation = mdData => {
  return (mdData.data.type = mdData.data.category);
};

const sidebarTreeMutation = mdData => {
  if (!mdData.data.subHeadings || !mdData.data.subHeadings.length) {
    mdData.data.sidebarTree = [];
    return;
  }

  mdData.data.sidebarTree = mdData.data.subHeadings.reduce((av, cv) => {
    if (cv.depth === 1) {
      return av.concat({ ...cv, category: mdData.data.category });
    }

    if (cv.depth === 2) {
      const lastItem = av.pop();
      return av.concat({
        ...lastItem,
        children: lastItem.children ? [...lastItem.children, cv] : [cv]
      });
    }

    if (cv.depth === 3) {
      const lastItem = av.pop();
      const lastChild = lastItem.children.pop();
      return av.concat({
        ...lastItem,
        children: [
          ...lastItem.children,
          {
            ...lastChild,
            children: lastChild.children ? [...lastChild.children, cv] : [cv]
          }
        ]
      });
    }
    return null;
  }, []);
};

// Had to make the tough call that even though faq is a subroute of docs
// and uses the doc container, it still needs to be handled differently
// bc it's sidebar behavior is sufficiently different f
// it needs to be handled differently
function getDocs(
  mdPath = "./src/content/docs",
  mutations = [slugMutation, sidebarTreeMutation],
  sort = orderByTitle
) {
  return getMdFiles(mdPath, mutations, sort);
}

function getFaq(
  mdPath = "./src/content/faq",
  mutations = [sidebarTreeMutation],
  sort = orderByTitle
) {
  return getMdFiles(mdPath, mutations, sort);
}

function getIntroduction(
  mdPath = "./src/content/introduction",
  mutations = [slugMutation, sidebarTreeMutation],
  sort = orderByTitle
) {
  return getMdFiles(mdPath, mutations, sort);
}

function getGallery(
  mdPath = "./src/content/gallery",
  mutations = [slugMutation],
  sort = orderByTitle
) {
  return getMdFiles(mdPath, mutations, sort);
}

function getGuides(
  mdPath = "./src/content/guides",
  mutations = [slugMutation, sidebarTypeMutation, sidebarTreeMutation],
  sort = orderByIdAndAddThemesEntry
) {
  return getMdFiles(mdPath, mutations, sort);
}

function getCommonProps(
  mdPath = "./src/content/common-props",
  mutations = [slugMutation, sidebarTreeMutation],
  sort = orderByTitle
) {
  return getMdFiles(mdPath, mutations, sort);
}

module.exports = {
  getDocs,
  getFaq,
  getIntroduction,
  getGallery,
  getGuides,
  getCommonProps
};
