import orderBy from "lodash/orderBy";

import {
  getCommonProps,
  getDocs,
  getFaq,
  getGuides,
  getIntroduction,
} from "@/static-config-helpers/md-data-transforms";

export async function getDocsPageContent(slug?: string) {
  // TODO: the following code was extracted from the old site
  // we need to rebuild this entire heirarchy to be more efficient
  const trueDocs = await getDocs();
  const faq = await getFaq();
  const introduction = await getIntroduction();
  const guides = await getGuides();
  const commonProps = await getCommonProps();

  const commonPropsIntro = commonProps[0];

  const orderById = (items: any) => orderBy(items, ["data.id"], ["asc"]);
  const allSidebarItems = [
    ...introduction,
    ...faq,
    ...guides,
    commonPropsIntro,
    ...trueDocs,
  ];

  const sidebarContent = allSidebarItems.reduce((av, cv, i, arr) => {
    const category = cv.data.category;
    if (category && Array.isArray(av[category])) {
      av[category] = av[category].concat(cv);
    } else {
      av[category] = [].concat(cv);
    }
    if (i === arr.length - 1) {
      Object.keys(av).forEach((k) => (av[k] = orderById(av[k])));
    }

    return av;
  }, {});

  const convertToSidebarArray = (content: any) => {
    const { charts, containers, more } = content;
    return [
      ...introduction,
      ...faq,
      ...guides,
      commonPropsIntro,
      ...charts,
      ...containers,
      ...more,
    ];
  };

  const fullList = convertToSidebarArray(sidebarContent);

  const target = slug || "getting-started";
  const content = fullList.find((d) => {
    return d.data.slug === target;
  });

  // exclude the markdown content from the sidebar list
  const sidebarList = fullList.map((x) => ({
    data: x.data,
  }));

  return { content, sidebarList };
}
